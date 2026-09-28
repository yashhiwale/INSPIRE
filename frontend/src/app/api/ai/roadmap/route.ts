import { NextResponse } from "next/server";
import { getRoadmap } from "@/lib/mvp/roadmaps";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const domain = String(body?.domain || "Technology & Computing");
  const roadmap = getRoadmap(domain);

  // mimic slight AI latency
  await new Promise((r) => setTimeout(r, 350));

  return NextResponse.json({ ok: true, roadmap });
}