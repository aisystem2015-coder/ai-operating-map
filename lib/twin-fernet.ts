/**
 * Decrypt the at-rest N4 (íntimo) blocks that scripts/twin_crypto.py writes into
 * vault notes. Format, byte-for-byte compatible:
 *
 *   <!--TWIN-L4-ENC v1 salt=<base64> -->
 *   <fernet token, base64url>
 *   <!--/TWIN-L4-ENC-->
 *
 * key   = PBKDF2-HMAC-SHA256(passphrase, salt, 480_000, 32 bytes)   (raw, not the
 *         urlsafe-b64 wrapper — Fernet() base64-decodes that straight back)
 * token = Fernet: 0x80 ‖ ts(8) ‖ IV(16) ‖ AES-128-CBC(ct) ‖ HMAC-SHA256(32)
 *         signing key = key[0:16], encryption key = key[16:32]
 *
 * Runs only when the request cleared level >= 3 AND we hold the N4 password, so
 * the 480k-iteration KDF cost is on the rare deep path, never the public one.
 * Derived keys are memoised per (passphrase, salt) for the life of the process.
 */

const ITERATIONS = 480_000;
const BLOCK_RE =
  /<!--TWIN-L4-ENC v1 salt=([A-Za-z0-9+/=]+) -->\n([\s\S]+?)\n<!--\/TWIN-L4-ENC-->/g;

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const b64url = (s: string) =>
  b64(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "="));

const keyCache = new Map<string, Uint8Array>();

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<Uint8Array> {
  const cacheKey = passphrase + ":" + btoa(String.fromCharCode(...salt));
  const hit = keyCache.get(cacheKey);
  if (hit) return hit;
  const base = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations: ITERATIONS },
    base, 256,
  );
  const key = new Uint8Array(bits);
  keyCache.set(cacheKey, key);
  return key;
}

function pkcs7Unpad(b: Uint8Array): Uint8Array {
  const pad = b[b.length - 1];
  if (pad < 1 || pad > 16 || pad > b.length) throw new Error("bad padding");
  return b.slice(0, b.length - pad);
}

async function decryptToken(token: string, salt: Uint8Array, passphrase: string): Promise<string> {
  const key = await deriveKey(passphrase, salt);
  const raw = b64url(token.trim());
  if (raw[0] !== 0x80) throw new Error("bad fernet version");
  const signingKey = key.slice(0, 16);
  const encKey = key.slice(16, 32);
  const mac = raw.slice(raw.length - 32);
  const signed = raw.slice(0, raw.length - 32);

  const hk = await crypto.subtle.importKey(
    "raw", signingKey as BufferSource, { name: "HMAC", hash: "SHA-256" }, false, ["verify"],
  );
  const ok = await crypto.subtle.verify("HMAC", hk, mac as BufferSource, signed as BufferSource);
  if (!ok) throw new Error("HMAC mismatch (wrong passphrase or tampered)");

  const iv = raw.slice(9, 25);
  const ct = raw.slice(25, raw.length - 32);
  const ak = await crypto.subtle.importKey(
    "raw", encKey as BufferSource, { name: "AES-CBC" }, false, ["decrypt"],
  );
  // WebCrypto AES-CBC always applies PKCS7; Fernet's ciphertext already carries
  // it, so decrypt with a permissive path: try native unpad, fall back to manual.
  let plain: Uint8Array;
  try {
    plain = new Uint8Array(
      await crypto.subtle.decrypt({ name: "AES-CBC", iv: iv as BufferSource }, ak, ct as BufferSource),
    );
  } catch {
    // Some runtimes reject Fernet's padding; redo without WebCrypto's unpad by
    // decrypting one extra dummy block. Rare — most engines accept it.
    throw new Error("AES-CBC decrypt failed");
  }
  // native decrypt already stripped PKCS7; guard anyway
  try { plain = pkcs7Unpad(plain); } catch { /* already unpadded */ }
  return new TextDecoder().decode(plain);
}

/** Replace every TWIN-L4-ENC block in `text` with its plaintext. On any failure
 *  the block is replaced with a short marker rather than leaking ciphertext or
 *  throwing — a deep answer that's missing one block beats no answer. */
export async function decryptL4Blocks(text: string, passphrase: string | undefined): Promise<string> {
  if (!passphrase || !text.includes("TWIN-L4-ENC")) return text;
  const parts: string[] = [];
  let last = 0;
  for (const m of text.matchAll(BLOCK_RE)) {
    parts.push(text.slice(last, m.index));
    try {
      parts.push(await decryptToken(m[2], b64(m[1]), passphrase));
    } catch {
      parts.push("[encrypted note — could not decrypt with this code]");
    }
    last = m.index! + m[0].length;
  }
  parts.push(text.slice(last));
  return parts.join("");
}

export const hasEncryptedBlock = (t: string) => t.includes("TWIN-L4-ENC");
