import { NextRequest } from "next/server";
import { handleRegister } from "@/lib/twin-mcp-oauth-handlers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = (req: NextRequest) => handleRegister(req);
