"use client";

import { useMemo, useState } from "react";
import DashboardShell, { ShellTab } from "@/components/dashboard/DashboardShell";
import Badge from "@/components/common/Badge";
import { useDemo } from "@/lib/demo/store";
import { Activity, LayoutDashboard, PieChart, UserCircle } from "lucide-react";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <div className="text-[10px] font-extrabold text-slate-500 uppercase">{label}</div>
      <div className="text-2xl font-black text-blue-700 mt-1">{value}</div>
    </div>
  );
}

function Donut({
  title,
  aLabel,
  aValue,
  bLabel,
  bValue,
}: {
  title: string;
  aLabel: string;
  aValue: number;
  bLabel: string;
  bValue: number;
}) {
  const total = Math.max(1, aValue + bValue);
  const aPct = aValue / total;

  const r = 42;
  const c = 2 * Math.PI * r;
  const aLen = c * aPct;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
          <div className="text-sm text-slate-600 mt-1">Distribution snapshot (MVP).</div>
        </div>
        <Badge tone="blue">Chart</Badge>
      </div>

      <div className="mt-5 flex items-center gap-6">
        <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
          <circle cx="60" cy="60" r={r} stroke="#e2e8f0" strokeWidth="12" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={r}
            stroke="#2563eb"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${aLen} ${c - aLen}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="62" textAnchor="middle" className="fill-slate-900" style={{ fontSize: 16, fontWeight: 900 }}>
            {Math.round(aPct * 100)}%
          </text>
          <text x="60" y="78" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 10, fontWeight: 800 }}>
            {aLabel}
          </text>
        </svg>

        <div className="flex-1 space-y-2">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="text-sm font-extrabold text-slate-900">{aLabel}</div>
            <div className="text-sm font-black text-blue-700">{aValue}</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="text-sm font-extrabold text-slate-900">{bLabel}</div>
            <div className="text-sm font-black text-slate-700">{bValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniBarChart({
  title,
  subtitle,
  items,
  color = "#2563eb",
}: {
  title: string;
  subtitle: string;
  items: { label: string; value: number }[];
  color?: string;
}) {
  const max = Math.max(1, ...items.map((x) => x.value));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
          <div className="text-sm text-slate-600 mt-1">{subtitle}</div>
        </div>
        <Badge tone="blue">Chart</Badge>
      </div>

      <div className="mt-5 space-y-3">
        {items.length ? (
          items.map((x) => {
            const pct = Math.round((x.value / max) * 100);
            return (
              <div key={x.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-800">{x.label}</div>
                  <div className="text-xs font-extrabold text-slate-500">{x.value}</div>
                </div>
                <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-2" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-slate-500">No data available yet.</div>
        )}
      </div>
    </div>
  );
}

export default function InstitutionPage() {
  const { students, passport, opportunities, assessments } = useDemo();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs: ShellTab[] = [
    { key: "overview", label: "Command Center", icon: LayoutDashboard },
    { key: "analytics", label: "Placement Analytics", icon: PieChart },
    { key: "profile", label: "Profile & Settings", icon: UserCircle },
  ];

  const counts = useMemo(() => {
    const verified = passport.filter((p) => p.status === "verified").length;
    const pending = passport.filter((p) => p.status === "pending").length;
    const rejected = passport.filter((p) => p.status === "rejected").length;
    const self = passport.filter((p) => p.status === "self").length;

    const assessed = Object.values(assessments).filter(Boolean).length;
    const activeOpp = opportunities.length;

    // Simple demo “employability” indicator
    const employability = students.length
      ? Math.round(((verified + assessed) / (students.length * 4)) * 100)
      : 0;

    return {
      verified,
      pending,
      rejected,
      self,
      assessed,
      activeOpp,
      employability: Math.min(92, Math.max(40, employability)),
    };
  }, [passport, assessments, opportunities.length, students.length]);

  const topSkills = useMemo(() => {
    const all = opportunities.flatMap((o) => o.skills);
    const count: Record<string, number> = {};
    all.forEach((s) => (count[s] = (count[s] || 0) + 1));
    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value]) => ({ label, value }));
  }, [opportunities]);

  const topDomains = useMemo(() => {
    const count: Record<string, number> = {};
    Object.values(assessments).forEach((a) => {
      const d = a?.topDomains?.[0]?.domain;
      if (!d) return;
      count[d] = (count[d] || 0) + 1;
    });
    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value]) => ({ label, value }));
  }, [assessments]);

  return (
    <DashboardShell
      accent="blue"
      brandSubtitle="Institution Dashboard"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerTitle="Institution"
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Institution Console
            </div>
            <h1 className="text-2xl font-extrabold mt-1">Campus Intelligence (MVP)</h1>
            <p className="text-sm text-slate-600 mt-1">
              Analytics are derived from the connected demo ecosystem (verification + assessments + employer demand).
            </p>
          </div>

          {activeTab === "overview" && (
            <>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-lg font-extrabold">Institution</div>
                  <div className="text-sm text-slate-600 mt-1">
                    AICTE Code: <span className="font-semibold">Pending (Demo)</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-center">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                    Batch Employability
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-1">
                    {counts.employability}
                    <span className="text-xl text-slate-400 font-bold">%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Campus Intelligence
                  </h2>
                  <Badge tone="blue">Live Demo</Badge>
                </div>

                <div className="mt-5 grid sm:grid-cols-4 gap-3">
                  <Stat label="Students" value={String(students.length)} />
                  <Stat label="Verified Evidence" value={String(counts.verified)} />
                  <Stat label="Pending Verifications" value={String(counts.pending)} />
                  <Stat label="Active Opportunities" value={String(counts.activeOpp)} />
                </div>
              </div>

              <Donut
                title="Evidence Status Health"
                aLabel="Verified"
                aValue={counts.verified}
                bLabel="Pending + Other"
                bValue={counts.pending + counts.rejected + counts.self}
              />
            </>
          )}

          {activeTab === "analytics" && (
            <div className="grid lg:grid-cols-2 gap-4">
              <MiniBarChart
                title="Top Demanded Skills"
                subtitle="Aggregated from employer opportunities (MVP skill intelligence)."
                items={topSkills}
                color="#2563eb"
              />
              <MiniBarChart
                title="Top Student Domains"
                subtitle="Based on saved assessments (dominant domain per student)."
                items={topDomains}
                color="#0ea5e9"
              />
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl">
              <h2 className="text-xl font-extrabold">Profile & Settings (Demo)</h2>
              <p className="text-sm text-slate-600 mt-1">
                Full version will connect institutional officers + campus codes + placement dashboards.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                    Institution
                  </div>
                  <div className="text-sm font-extrabold mt-1">INSPIRE Demo Campus</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                    Code
                  </div>
                  <div className="text-sm font-extrabold mt-1">Pending</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}