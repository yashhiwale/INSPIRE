// src/app/student/page.tsx
"use client";

import { useMemo, useState } from "react";
import DashboardShell, { ShellTab } from "@/components/dashboard/DashboardShell";
import Modal from "@/components/common/Modal";
import Badge from "@/components/common/Badge";
import { useDemo } from "@/lib/demo/store";
import { getRoadmap } from "@/lib/mvp/roadmaps";
import { matchScore } from "@/lib/mvp/matching";
import {
  LayoutDashboard,
  GraduationCap,
  FolderKanban,
  Briefcase,
  UserCircle,
  Sparkles,
  Plus,
  CheckCircle2,
  Circle,
  ArrowRight,
} from "lucide-react";

function statusTone(s: string) {
  if (s === "verified") return "green";
  if (s === "pending") return "yellow";
  if (s === "rejected") return "red";
  return "slate";
}

function Stepper({
  steps,
}: {
  steps: { label: string; done: boolean; hint?: string }[];
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            SkillBridge Journey (MVP)
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 mt-1">
            Potential → Skills → Verification → Opportunities
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            This card helps judges understand the end-to-end flow in 10 seconds.
          </p>
        </div>
        <a
          href="/demo"
          className="shrink-0 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-extrabold hover:bg-slate-800"
        >
          Demo Launchpad
        </a>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((s, idx) => (
          <div
            key={s.label}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Step {idx + 1}
                </div>
                <div className="text-sm font-extrabold text-slate-900 mt-1">
                  {s.label}
                </div>
                {s.hint ? (
                  <div className="text-xs text-slate-600 mt-1">{s.hint}</div>
                ) : null}
              </div>
              <div className="shrink-0">
                {s.done ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <a
          href="/assessment"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-extrabold hover:bg-indigo-700"
        >
          Open Assessment <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/faculty"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-extrabold hover:bg-slate-50"
        >
          Go to Faculty Verification <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function StudentPage() {
  const {
    students,
    currentStudentId,
    setCurrentStudent,
    assessments,
    passport,
    opportunities,
    addPassportItem,
  } = useDemo();

  const student = students.find((s) => s.id === currentStudentId)!;
  const assessment = assessments[currentStudentId];

  const [activeTab, setActiveTab] = useState("overview");
  const [domain, setDomain] = useState(
    assessment?.topDomains?.[0]?.domain ?? "Technology & Computing"
  );

  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addType, setAddType] = useState<"skill" | "project" | "certificate">(
    "skill"
  );
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [link, setLink] = useState("");

  const tabs: ShellTab[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "assessment", label: "Assessment", icon: GraduationCap },
    { key: "passport", label: "Skill Passport", icon: FolderKanban },
    { key: "opportunities", label: "Opportunities", icon: Briefcase },
    { key: "profile", label: "Profile & Settings", icon: UserCircle },
  ];

  const myItems = passport.filter((p) => p.studentId === currentStudentId);

  const mySkillKeys = useMemo(() => {
    const all = myItems.flatMap((x) => x.skills || []);
    return Array.from(new Set(all.map((s) => s.toLowerCase())));
  }, [myItems]);

  const topDomains = assessment?.topDomains ?? [];

  const matchedOpps = useMemo(() => {
    return opportunities
      .map((o) => {
        const m = matchScore(o.skills, mySkillKeys);
        return { ...o, match: m };
      })
      .sort((a, b) => b.match.score - a.match.score);
  }, [opportunities, mySkillKeys]);

  const generateRoadmap = async () => {
    setRoadmapLoading(true);
    setRoadmapOpen(true);

    try {
      const rm = getRoadmap(domain);
      await new Promise((r) => setTimeout(r, 250));
      setRoadmap(rm);
    } finally {
      setRoadmapLoading(false);
    }
  };

  const required = roadmap?.requiredSkills ?? [];
  const gap = required.filter(
    (s: string) => !mySkillKeys.includes(s.toLowerCase())
  );
  const coverage = required.length
    ? Math.round(((required.length - gap.length) / required.length) * 100)
    : 0;

  const stepperSteps = useMemo(() => {
    const assessmentSaved = !!assessment;
    const roadmapReady = !!roadmap; // in-session proof for demo
    const hasEvidence = myItems.length > 0;
    const hasPending = myItems.some((x) => x.status === "pending");
    const hasVerified = myItems.some((x) => x.status === "verified");
    const hasMatches = (matchedOpps?.[0]?.match?.score ?? 0) >= 40;

    return [
      {
        label: "Potential Discovery (Assessment)",
        done: assessmentSaved,
        hint: assessmentSaved ? "Saved profile available" : "Open /assessment and save",
      },
      {
        label: "Career Exploration (Domain)",
        done: !!domain,
        hint: `Selected: ${domain}`,
      },
      {
        label: "Roadmap & Skill Gaps",
        done: roadmapReady,
        hint: roadmapReady ? "Roadmap generated" : "Click Generate Roadmap",
      },
      {
        label: "Skill Passport (Evidence)",
        done: hasEvidence,
        hint: hasEvidence ? `${myItems.length} item(s) added` : "Add skills/projects/certs",
      },
      {
        label: "Verification (Faculty)",
        done: hasVerified || hasPending,
        hint: hasPending ? "Pending in queue" : hasVerified ? "Verified evidence available" : "Send evidence for verification",
      },
      {
        label: "Opportunities (Matching)",
        done: hasMatches,
        hint: hasMatches ? "Matched internships/jobs available" : "Add skills or post opportunity",
      },
      {
        label: "Employability Signals",
        done: hasVerified,
        hint: hasVerified ? "Verified skills strengthen profile" : "Get at least 1 verified item",
      },
      {
        label: "Placement Readiness (Institution View)",
        done: true,
        hint: "Institution dashboard shows aggregated metrics",
      },
    ];
  }, [assessment, roadmap, myItems, domain, matchedOpps]);

  const addItem = () => {
    if (!title.trim()) return;

    addPassportItem({
      studentId: currentStudentId,
      type: addType,
      title: title.trim(),
      skills: skills
        .split(",")
        .map((x) => x.trim().toLowerCase())
        .filter(Boolean),
      link: link.trim() || undefined,
      status: "pending",
    });

    setTitle("");
    setSkills("");
    setLink("");
    setAddOpen(false);
    setActiveTab("passport");
  };

  return (
    <DashboardShell
      accent="indigo"
      brandSubtitle="Student Dashboard"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerTitle="Student"
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  Student
                </div>
                <h1 className="text-2xl font-extrabold mt-1">{student.name}</h1>
                <p className="text-sm text-slate-600 mt-1">
                  {student.education} • {student.year}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Demo Student Switch
                </div>
                <select
                  value={currentStudentId}
                  onChange={(e) => setCurrentStudent(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          {activeTab === "overview" && (
            <>
              <Stepper steps={stepperSteps} />

              <div className="grid lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold">Career Domain</div>
                    <Badge tone="indigo">AI Guidance</Badge>
                  </div>
                  <div className="mt-3">
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                    >
                      {(topDomains.length ? topDomains : [{ domain: "Technology & Computing" }]).map(
                        (d: any) => (
                          <option key={d.domain} value={d.domain}>
                            {d.domain}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      onClick={generateRoadmap}
                      className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-extrabold hover:bg-slate-800"
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate Roadmap
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="font-extrabold">Skill Gap Coverage</div>
                  <p className="text-sm text-slate-600 mt-1">
                    Based on roadmap required skills.
                  </p>
                  <div className="mt-4 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2"
                      style={{ width: `${coverage}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-slate-900">
                    {coverage}% covered
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Missing: {gap.length ? gap.join(", ") : "None (great!)"}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="font-extrabold">Passport Status</div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                        Verified
                      </div>
                      <div className="text-2xl font-black text-slate-900">
                        {myItems.filter((x) => x.status === "verified").length}
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                        Pending
                      </div>
                      <div className="text-2xl font-black text-slate-900">
                        {myItems.filter((x) => x.status === "pending").length}
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                        Total
                      </div>
                      <div className="text-2xl font-black text-slate-900">
                        {myItems.length}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setAddType("skill");
                      setAddOpen(true);
                    }}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-extrabold hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Evidence (Pending)
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "assessment" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold">Assessment Results</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Top domains are explainable via contributing dimensions.
                  </p>
                </div>
                <a
                  href="/assessment"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-extrabold hover:bg-slate-800"
                >
                  Retake / Update
                </a>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-4">
                {(topDomains.length ? topDomains : []).slice(0, 3).map((d: any) => (
                  <div
                    key={d.domain}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
                  >
                    <div className="font-extrabold">{d.domain}</div>
                    <div className="mt-2 text-2xl font-black text-indigo-700">
                      {d.score}%
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">Why:</span>{" "}
                      {d.why?.join(", ")}
                    </div>
                  </div>
                ))}
              </div>

              {!assessment && (
                <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  No saved assessment yet. Open assessment and save once.
                </div>
              )}
            </div>
          )}

          {activeTab === "passport" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold">Verified Skill Passport</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Evidence can be Self-Declared → Pending → Verified/Rejected.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAddType("skill");
                    setAddOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-extrabold hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Evidence
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {myItems.length === 0 ? (
                  <div className="text-sm text-slate-500">
                    No passport entries yet.
                  </div>
                ) : (
                  myItems.map((p) => (
                    <div
                      key={p.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                            {p.type}
                          </div>
                          <div className="font-extrabold text-slate-900">
                            {p.title}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            Skills: {p.skills?.length ? p.skills.join(", ") : "—"}
                          </div>
                          {p.link ? (
                            <a
                              className="text-xs font-extrabold text-indigo-700 hover:text-indigo-800"
                              href={p.link}
                            >
                              Evidence link
                            </a>
                          ) : null}
                        </div>
                        <Badge tone={statusTone(p.status) as any}>{p.status}</Badge>
                      </div>

                      {p.status === "rejected" && p.note ? (
                        <div className="mt-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                          Rejected: {p.note}
                        </div>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "opportunities" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold">Matched Opportunities</h2>
              <p className="text-sm text-slate-600 mt-1">
                Explainable skill-based matching (MVP).
              </p>

              <div className="mt-5 space-y-3">
                {matchedOpps.map((o) => (
                  <div
                    key={o.id}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                          {o.employer}
                        </div>
                        <div className="text-lg font-extrabold">{o.title}</div>
                        <div className="text-sm text-slate-600 mt-1">
                          {o.description}
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          Skills: {o.skills.join(", ")}
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          Matched: {o.match.matched.join(", ") || "—"} • Missing:{" "}
                          {o.match.missing.join(", ") || "—"}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                          Match
                        </div>
                        <div className="text-3xl font-black text-indigo-700">
                          {o.match.score}%
                        </div>
                        <div className="mt-2">
                          <Badge
                            tone={
                              o.match.score >= 70
                                ? "green"
                                : o.match.score >= 40
                                ? "yellow"
                                : "red"
                            }
                          >
                            {o.match.score >= 70
                              ? "Strong"
                              : o.match.score >= 40
                              ? "Medium"
                              : "Low"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl">
              <h2 className="text-xl font-extrabold">Profile & Settings (Demo)</h2>
              <p className="text-sm text-slate-600 mt-1">
                For MVP, identity is demo-based.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                    Name
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">
                    {student.name}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                    Program
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">
                    {student.education}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-slate-500">
                In full version this tab will show full Supabase profile metadata + secure logout.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Roadmap Modal */}
      <Modal
        open={roadmapOpen}
        title="AI Roadmap (MVP)"
        onClose={() => setRoadmapOpen(false)}
        footer={
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">Domain: {domain}</div>
            <button
              onClick={() => setRoadmapOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-extrabold"
            >
              Close
            </button>
          </div>
        }
      >
        {roadmapLoading ? (
          <div className="text-sm text-slate-600">Generating roadmap…</div>
        ) : roadmap ? (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-extrabold text-slate-500 uppercase">
                Required Skills
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-900">
                {roadmap.requiredSkills.join(", ")}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="font-extrabold">Learning Plan</div>
                <div className="mt-3 space-y-2">
                  {roadmap.learning.map((x: any, i: number) => (
                    <div
                      key={i}
                      className="text-sm text-slate-700 flex items-center justify-between gap-3"
                    >
                      <span className="font-semibold">{x.title}</span>
                      <span className="text-xs font-extrabold text-slate-500">
                        {x.weeks}w
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="font-extrabold">Projects</div>
                <div className="mt-3 space-y-3">
                  {roadmap.projects.map((p: any, i: number) => (
                    <div
                      key={i}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3"
                    >
                      <div className="text-sm font-extrabold">{p.title}</div>
                      <div className="text-xs text-slate-600 mt-1">
                        {p.deliverable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Add Evidence Modal */}
      <Modal
        open={addOpen}
        title="Add Passport Evidence"
        onClose={() => setAddOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setAddOpen(false)}
              className="px-4 py-2.5 rounded-xl border bg-white text-sm font-extrabold"
            >
              Cancel
            </button>
            <button
              onClick={addItem}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-extrabold hover:bg-indigo-700"
            >
              Add (Pending Verification)
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <div className="text-xs font-extrabold text-slate-500 uppercase">
              Type
            </div>
            <select
              value={addType}
              onChange={(e) => setAddType(e.target.value as any)}
              className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
            >
              <option value="skill">Skill</option>
              <option value="project">Project</option>
              <option value="certificate">Certificate</option>
            </select>
          </div>

          <div>
            <div className="text-xs font-extrabold text-slate-500 uppercase">
              Title
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              placeholder="e.g., SQL (Intermediate)"
            />
          </div>

          <div>
            <div className="text-xs font-extrabold text-slate-500 uppercase">
              Skills (comma separated)
            </div>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              placeholder="e.g., sql, database, git"
            />
          </div>

          <div>
            <div className="text-xs font-extrabold text-slate-500 uppercase">
              Evidence Link (optional)
            </div>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              placeholder="https://..."
            />
          </div>

          <div className="text-xs text-slate-500">
            Faculty dashboard me ye entry “Pending” queue me aayegi.
          </div>
        </div>
      </Modal>
    </DashboardShell>
  );
}