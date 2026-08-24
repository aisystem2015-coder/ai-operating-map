import { NextRequest } from "next/server";
import { handleToken } from "@/lib/twin-mcp-oauth-handlers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = (req: NextRequest) => handleToken(req);
