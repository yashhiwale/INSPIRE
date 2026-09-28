"use client";

import { useMemo, useState } from "react";
import DashboardShell, { ShellTab } from "@/components/dashboard/DashboardShell";
import Badge from "@/components/common/Badge";
import Modal from "@/components/common/Modal";
import { useDemo } from "@/lib/demo/store";
import {
  ClipboardCheck,
  BookOpenCheck,
  UserCircle,
  XCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function statusTone(s: string) {
  if (s === "verified") return "green";
  if (s === "pending") return "yellow";
  if (s === "rejected") return "red";
  return "slate";
}

export default function FacultyPage() {
  const { students, passport, updatePassportStatus, opportunities } = useDemo();
  const [activeTab, setActiveTab] = useState("queue");

  // Reject modal
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  // Verify modal (rubric)
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyId, setVerifyId] = useState<string | null>(null);
  const [rubric, setRubric] = useState({
    linkValid: false,
    matchesClaim: false,
    issuerOrProofVisible: false,
  });

  const tabs: ShellTab[] = [
    { key: "queue", label: "Verification Queue", icon: ClipboardCheck },
    { key: "alignment", label: "Curriculum Alignment", icon: BookOpenCheck },
    { key: "profile", label: "Profile & Settings", icon: UserCircle },
  ];

  const pending = useMemo(() => passport.filter((p) => p.status === "pending"), [passport]);

  const demandedSkills = useMemo(() => {
    const all = opportunities.flatMap((o) => o.skills);
    const count: Record<string, number> = {};
    all.forEach((s) => (count[s] = (count[s] || 0) + 1));
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [opportunities]);

  const openReject = (id: string) => {
    setRejectId(id);
    setRejectNote("");
    setRejectOpen(true);
  };

  const openVerify = (id: string) => {
    setVerifyId(id);
    setRubric({ linkValid: false, matchesClaim: false, issuerOrProofVisible: false });
    setVerifyOpen(true);
  };

  const canVerify = rubric.linkValid && rubric.matchesClaim && rubric.issuerOrProofVisible;

  return (
    <DashboardShell
      accent="violet"
      brandSubtitle="Faculty Dashboard"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerTitle="Faculty"
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Faculty Console
            </div>
            <h1 className="text-2xl font-extrabold mt-1">Verification & Alignment</h1>
            <p className="text-sm text-slate-600 mt-1">
              MVP adds a verification rubric (checkbox-based) to demonstrate a real review process.
            </p>
          </div>

          {activeTab === "queue" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold">Pending Verifications</h2>
                <Badge tone="violet">{pending.length} pending</Badge>
              </div>

              <div className="mt-5 space-y-3">
                {pending.length === 0 ? (
                  <div className="text-sm text-slate-500">No pending items.</div>
                ) : (
                  pending.map((p) => {
                    const st = students.find((s) => s.id === p.studentId);
                    return (
                      <div key={p.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                              {p.type} • {st?.name ?? "Student"}
                            </div>
                            <div className="font-extrabold text-slate-900">{p.title}</div>
                            <div className="mt-1 text-xs text-slate-500">Skills: {p.skills?.join(", ") || "—"}</div>
                            {p.link ? (
                              <a className="text-xs font-extrabold text-violet-700 hover:text-violet-800" href={p.link}>
                                Evidence link
                              </a>
                            ) : (
                              <div className="text-xs text-amber-700 mt-1">
                                Evidence link missing (still can verify for demo, but rubric expects proof).
                              </div>
                            )}
                          </div>

                          <Badge tone={statusTone(p.status) as any}>{p.status}</Badge>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => openVerify(p.id)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-extrabold hover:bg-violet-700"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Verify (Rubric)
                          </button>

                          <button
                            onClick={() => openReject(p.id)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-sm font-extrabold hover:bg-rose-50"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === "alignment" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold">Curriculum Alignment (MVP)</h2>
              <p className="text-sm text-slate-600 mt-1">
                Derived snapshot from employer-posted opportunities (industry skill intelligence).
              </p>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="font-extrabold">Top Demanded Skills</div>
                  <div className="mt-3 space-y-2">
                    {demandedSkills.map(([skill, c]) => (
                      <div key={skill} className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-800">{skill}</span>
                        <span className="text-xs font-extrabold text-slate-500">{c} posts</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="font-extrabold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-violet-600" />
                    Recommended Academic Actions
                  </div>
                  <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-2">
                    <li>Add 1-week Git + collaboration module (2nd year).</li>
                    <li>Make 1 evidence-based mini project mandatory.</li>
                    <li>Introduce verification rubric for certificates & projects.</li>
                    <li>Monthly mock interviews using employer skill checklists.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl">
              <h2 className="text-xl font-extrabold">Profile & Settings (Demo)</h2>
              <p className="text-sm text-slate-600 mt-1">
                In full version this is tied to Supabase faculty profile and audit logs.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">Role</div>
                  <div className="text-sm font-extrabold mt-1">Faculty Reviewer</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">Access</div>
                  <div className="text-sm font-extrabold mt-1">Verification Queue</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VERIFY MODAL (Rubric) */}
      <Modal
        open={verifyOpen}
        title="Verify Evidence (Rubric)"
        onClose={() => setVerifyOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setVerifyOpen(false)}
              className="px-4 py-2.5 rounded-xl border bg-white text-sm font-extrabold"
            >
              Cancel
            </button>
            <button
              disabled={!canVerify}
              onClick={() => {
                if (!verifyId) return;
                updatePassportStatus(verifyId, "verified", { verifiedBy: "Faculty Reviewer" });
                setVerifyOpen(false);
              }}
              className={[
                "px-4 py-2.5 rounded-xl text-sm font-extrabold",
                canVerify ? "bg-violet-600 text-white hover:bg-violet-700" : "bg-slate-200 text-slate-500 cursor-not-allowed",
              ].join(" ")}
            >
              Confirm Verify
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="text-sm text-slate-700">
            Tick all checks to verify (demo-friendly but shows real-world process).
          </div>

          <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={rubric.linkValid}
              onChange={(e) => setRubric((r) => ({ ...r, linkValid: e.target.checked }))}
            />
            <div>
              <div className="text-sm font-extrabold text-slate-900">Evidence link / proof is available</div>
              <div className="text-xs text-slate-600 mt-1">Link opens or proof is present (screenshot/pdf/repo).</div>
            </div>
          </label>

          <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={rubric.matchesClaim}
              onChange={(e) => setRubric((r) => ({ ...r, matchesClaim: e.target.checked }))}
            />
            <div>
              <div className="text-sm font-extrabold text-slate-900">Claimed skill matches evidence</div>
              <div className="text-xs text-slate-600 mt-1">Skills written align with the content.</div>
            </div>
          </label>

          <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={rubric.issuerOrProofVisible}
              onChange={(e) =>
                setRubric((r) => ({ ...r, issuerOrProofVisible: e.target.checked }))
              }
            />
            <div>
              <div className="text-sm font-extrabold text-slate-900">Issuer/date/ownership is visible</div>
              <div className="text-xs text-slate-600 mt-1">Certificate issuer/date OR repo ownership is clear.</div>
            </div>
          </label>

          {!canVerify ? (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
              Complete all checks to enable verification.
            </div>
          ) : null}
        </div>
      </Modal>

      {/* REJECT MODAL */}
      <Modal
        open={rejectOpen}
        title="Reject Evidence"
        onClose={() => setRejectOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setRejectOpen(false)}
              className="px-4 py-2.5 rounded-xl border bg-white text-sm font-extrabold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!rejectId) return;
                updatePassportStatus(rejectId, "rejected", {
                  verifiedBy: "Faculty Reviewer",
                  note: rejectNote || "Insufficient evidence",
                });
                setRejectOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-extrabold hover:bg-rose-700"
            >
              Reject
            </button>
          </div>
        }
      >
        <div>
          <div className="text-sm font-semibold text-slate-700">Reason (optional)</div>
          <textarea
            value={rejectNote}
            onChange={(e) => setRejectNote(e.target.value)}
            className="mt-2 w-full min-h-[110px] bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm"
            placeholder="e.g., Missing proof / mismatch with claimed skills / unclear certificate..."
          />
        </div>
      </Modal>
    </DashboardShell>
  );
}