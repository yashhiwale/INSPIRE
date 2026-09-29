"use client";

import Link from "next/link";
import { GraduationCap, User, Building2, BriefcaseBusiness, School, RotateCcw } from "lucide-react";
import { useDemo } from "@/lib/demo/store";

function Card({
  href,
  title,
  desc,
  tone,
  icon: Icon,
}: {
  href: string;
  title: string;
  desc: string;
  tone: "indigo" | "emerald" | "violet" | "blue" | "slate";
  icon: any;
}) {
  const toneMap: Record<string, string> = {
    indigo: "border-indigo-200 hover:bg-indigo-50/60",
    emerald: "border-emerald-200 hover:bg-emerald-50/60",
    violet: "border-violet-200 hover:bg-violet-50/60",
    blue: "border-blue-200 hover:bg-blue-50/60",
    slate: "border-slate-200 hover:bg-slate-50",
  };

  return (
    <Link
      href={href}
      className={[
        "block bg-white border rounded-2xl p-5 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        toneMap[tone],
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-base font-extrabold text-slate-900">{title}</div>
          <div className="text-sm text-slate-600 mt-1">{desc}</div>
        </div>
      </div>
    </Link>
  );
}

export default function DemoLaunchpadPage() {
  const { resetDemo } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            SkillBridge MVP
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Demo Launchpad</h1>
          <p className="text-sm text-slate-600 mt-1">
            Use these shortcuts in judging. Demo data is connected across stakeholders via local store.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                const ok = confirm("Reset demo data to default seed?");
                if (ok) resetDemo();
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-sm font-extrabold hover:bg-rose-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Demo Data
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-extrabold hover:bg-slate-800"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            href="/student"
            title="Student Dashboard"
            desc="Roadmap + Skill Passport + Opportunity matching"
            tone="indigo"
            icon={User}
          />
          <Card
            href="/assessment"
            title="Assessment (20D)"
            desc="Explainable domain affinities + preferences"
            tone="slate"
            icon={GraduationCap}
          />
          <Card
            href="/faculty"
            title="Faculty Dashboard"
            desc="Verification queue (Verify/Reject) + alignment snapshot"
            tone="violet"
            icon={School}
          />
          <Card
            href="/employer"
            title="Employer Dashboard"
            desc="Post opportunity → skill extraction → candidate ranking"
            tone="emerald"
            icon={BriefcaseBusiness}
          />
          <Card
            href="/institution"
            title="Institution Dashboard"
            desc="Campus intelligence + derived analytics"
            tone="blue"
            icon={Building2}
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-extrabold text-slate-900">2-Minute Judge Demo Script</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm text-slate-700">
            <li>Open <span className="font-semibold">Assessment</span> → adjust sliders → <span className="font-semibold">Save</span>.</li>
            <li>Open <span className="font-semibold">Student</span> → Generate Roadmap → Add Evidence (Pending).</li>
            <li>Open <span className="font-semibold">Faculty</span> → Verify the pending item.</li>
            <li>Back to <span className="font-semibold">Student</span> → Passport shows Verified.</li>
            <li>Open <span className="font-semibold">Employer</span> → Post JD → Extract Skills → Talent Discovery ranking.</li>
            <li>Open <span className="font-semibold">Institution</span> → Metrics update (verified/pending/opportunities).</li>
          </ol>
        </div>
      </div>
    </div>
  );
}