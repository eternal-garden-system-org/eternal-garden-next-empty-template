import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    deployId: process.env.DEPLOY_ID || null,
    timestamp: new Date().toISOString(),
  });
}
