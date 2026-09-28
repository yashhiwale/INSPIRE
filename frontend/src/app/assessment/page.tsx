"use client";

import { useMemo, useState } from "react";
import { useDemo } from "@/lib/demo/store";
import { DIMENSIONS, computeDomainAffinities } from "@/lib/mvp/domains";
import Badge from "@/components/common/Badge";
import { ArrowRight, Save } from "lucide-react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function AssessmentPage() {
  const { students, currentStudentId, assessments, saveAssessment } = useDemo();
  const student = students.find((s) => s.id === currentStudentId)!;

  const existing = assessments[currentStudentId];

  const [dims, setDims] = useState<Record<string, number>>(() => {
    const base: Record<string, number> = {};
    DIMENSIONS.forEach((k) => (base[k] = existing?.dimensions?.[k] ?? 50));
    return base;
  });

  const [prefs, setPrefs] = useState(() => ({
    indoorOutdoor: existing?.preferences?.indoorOutdoor ?? 0,
    individualTeam: existing?.preferences?.individualTeam ?? 0,
    theoryPractical: existing?.preferences?.theoryPractical ?? 0,
    stableDynamic: existing?.preferences?.stableDynamic ?? 0,
    employeeEntrepreneur: existing?.preferences?.employeeEntrepreneur ?? 0,
    digitalPhysical: existing?.preferences?.digitalPhysical ?? 0,
  }));

  const ranked = useMemo(() => computeDomainAffinities(dims), [dims]);
  const top3 = ranked.slice(0, 3);

  const save = () => {
    saveAssessment({
      studentId: currentStudentId,
      dimensions: dims,
      preferences: prefs,
      topDomains: ranked.slice(0, 5).map((x) => ({ domain: x.domain, score: x.score, why: x.why })),
      updatedAt: new Date().toISOString(),
    });
    alert("Assessment saved in Demo Store.");
  };

  return (
    <div className="h-screen bg-slate-50 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Assessment (MVP Baseline)</div>
                <h1 className="text-2xl font-extrabold mt-1">20-Dimension Student Profile</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Student: <span className="font-semibold">{student.name}</span> • {student.education} • {student.year}
                </p>
              </div>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-extrabold hover:bg-slate-800"
              >
                <Save className="h-4 w-4" />
                Save Assessment
              </button>
            </div>

            <div className="mt-5 grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="font-extrabold">Dimensions (0–100)</div>
                <p className="text-sm text-slate-600 mt-1">
                  This is a demo-friendly baseline input. In full version these would come from MCQ/aptitude + evidence.
                </p>

                <div className="mt-4 space-y-3">
                  {DIMENSIONS.map((k) => (
                    <div key={k} className="grid grid-cols-[1fr_56px] gap-3 items-center">
                      <div>
                        <div className="text-xs font-extrabold text-slate-700">{k.replace(/_/g, " ")}</div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={dims[k] ?? 50}
                          onChange={(e) =>
                            setDims((d) => ({ ...d, [k]: clamp(parseInt(e.target.value, 10), 0, 100) }))
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 text-right">{dims[k] ?? 50}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="font-extrabold">Work Preferences (Demo)</div>
                  <p className="text-sm text-slate-600 mt-1">
                    Scale: -50 (left) to +50 (right). Helps personalize pathways.
                  </p>

                  {[
                    ["indoorOutdoor", "Indoor ↔ Outdoor"],
                    ["individualTeam", "Individual ↔ Team"],
                    ["theoryPractical", "Theory ↔ Practical"],
                    ["stableDynamic", "Stable ↔ Dynamic"],
                    ["employeeEntrepreneur", "Employee ↔ Entrepreneur"],
                    ["digitalPhysical", "Digital ↔ Physical"],
                  ].map(([key, label]) => (
                    <div key={key} className="mt-4 grid grid-cols-[1fr_56px] gap-3 items-center">
                      <div>
                        <div className="text-xs font-extrabold text-slate-700">{label}</div>
                        <input
                          type="range"
                          min={-50}
                          max={50}
                          value={(prefs as any)[key]}
                          onChange={(e) => setPrefs((p) => ({ ...p, [key]: parseInt(e.target.value, 10) }))}
                          className="w-full"
                        />
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 text-right">{(prefs as any)[key]}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-extrabold">Top Career Domains</div>
                    <Badge tone="blue">Explainable</Badge>
                  </div>

                  <div className="mt-4 space-y-3">
                    {top3.map((d, idx) => (
                      <div key={d.domain} className="bg-white border border-slate-200 rounded-2xl p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="font-extrabold">
                            #{idx + 1} {d.domain}
                          </div>
                          <div className="text-sm font-extrabold text-slate-900">{d.score}%</div>
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                          <span className="font-semibold text-slate-700">Why:</span> {d.why.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-slate-500">
                    Next: Go to Student dashboard → select a domain → Generate Roadmap.
                  </div>

                  <a
                    href="/student"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-indigo-700 hover:text-indigo-800"
                  >
                    Continue to Student Dashboard <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            MVP Note: This assessment is a baseline interface demonstrating the 20D profiling concept.
          </div>
        </div>
      </div>
    </div>
  );
}