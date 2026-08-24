import { NextRequest } from "next/server";
import { handleProtectedResource } from "@/lib/twin-mcp-oauth-handlers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = (req: NextRequest) => handleProtectedResource(req);
