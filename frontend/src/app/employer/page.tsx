"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell, { ShellTab } from "@/components/dashboard/DashboardShell";
import Badge from "@/components/common/Badge";
import { useDemo } from "@/lib/demo/store";
import { extractSkills, matchScore } from "@/lib/mvp/matching";
import {
  BriefcaseBusiness,
  UsersRound,
  UserCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function Chip({ text, tone }: { text: string; tone: any }) {
  return (
    <span className="inline-flex items-center">
      <Badge tone={tone}>{text}</Badge>
    </span>
  );
}

const SHORTLIST_KEY = "SkillBridge_employer_shortlist_v1";

export default function EmployerPage() {
  const {
    students,
    assessments,
    passport,
    opportunities,
    addOpportunity,
    selectedOpportunityId,
    setSelectedOpportunity,
    currentStudentId,
  } = useDemo();

  const [activeTab, setActiveTab] = useState("post");

  const [title, setTitle] = useState("Frontend Intern (React)");
  const [desc, setDesc] = useState(
    "React, REST APIs, Git. Bonus: TypeScript and SQL."
  );

  const [shortlisted, setShortlisted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SHORTLIST_KEY);
      if (raw) setShortlisted(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify(shortlisted));
    } catch {}
  }, [shortlisted]);

  const tabs: ShellTab[] = [
    { key: "post", label: "Post Opportunity", icon: BriefcaseBusiness },
    { key: "discover", label: "Talent Discovery", icon: UsersRound },
    { key: "profile", label: "Profile & Settings", icon: UserCircle },
  ];

  const selectedOpp =
    opportunities.find((o) => o.id === selectedOpportunityId) ?? opportunities[0];

  const studentSkillMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    students.forEach((s) => {
      const items = passport.filter((p) => p.studentId === s.id);
      map[s.id] = Array.from(
        new Set(items.flatMap((x) => x.skills || []).map((x) => x.toLowerCase()))
      );
    });
    return map;
  }, [students, passport]);

  const rankedCandidates = useMemo(() => {
    if (!selectedOpp) return [];
    return students
      .map((s) => {
        const skills = studentSkillMap[s.id] || [];
        const m = matchScore(selectedOpp.skills, skills);
        const topDomain = assessments[s.id]?.topDomains?.[0]?.domain;
        const verifiedCount = passport.filter(
          (p) => p.studentId === s.id && p.status === "verified"
        ).length;

        return {
          student: s,
          match: m,
          topDomain,
          verifiedCount,
        };
      })
      .sort((a, b) => b.match.score - a.match.score);
  }, [students, selectedOpp, studentSkillMap, assessments, passport]);

  const extractedPreview = useMemo(() => extractSkills(desc), [desc]);

  const post = () => {
    const skills = extractSkills(desc);
    addOpportunity({
      employer: "Emerald Tech Pvt Ltd",
      title: title.trim() || "New Opportunity",
      description: desc,
      skills: skills.length ? skills : ["git", "communication"],
    });
    setActiveTab("discover");
  };

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]
    );
  };

  return (
    <DashboardShell
      accent="emerald"
      brandSubtitle="Employer Dashboard"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerTitle="Employer"
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Industry Console
            </div>
            <h1 className="text-2xl font-extrabold mt-1">
              Opportunity → Skills → Explainable Matching
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              MVP matching is transparent: skill overlap + missing requirements, with shortlist support for demo.
            </p>
          </div>

          {activeTab === "post" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold">Post an Opportunity</h2>
              <p className="text-sm text-slate-600 mt-1">
                Paste a JD → Extract skills → Publish → Discover candidates.
              </p>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-500 uppercase">
                    Title
                  </div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                  />

                  <div className="mt-4 text-xs font-extrabold text-slate-500 uppercase">
                    Description
                  </div>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="mt-1 w-full min-h-[170px] bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  />

                  <button
                    onClick={post}
                    className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-extrabold hover:bg-emerald-700"
                  >
                    <Sparkles className="h-4 w-4" />
                    Extract Skills & Publish
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold">Extracted Skills (Preview)</div>
                    <Badge tone="emerald">Explainable</Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {extractedPreview.length ? (
                      extractedPreview.map((s) => <Chip key={s} text={s} tone="slate" />)
                    ) : (
                      <div className="text-sm text-slate-600">
                        No skills detected. Try adding “React”, “Git”, “REST API”, “TypeScript”, “SQL”.
                      </div>
                    )}
                  </div>

                  <div className="mt-5 text-xs text-slate-500">
                    This is a lightweight taxonomy-based extractor (MVP).
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "discover" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold">Talent Discovery</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Ranked candidates with “why matched” evidence.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Select Opportunity
                  </div>
                  <select
                    value={selectedOpp?.id}
                    onChange={(e) => setSelectedOpportunity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                  >
                    {opportunities.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.title} — {o.employer}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedOpp ? (
                <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Required Skills
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedOpp.skills.map((s) => (
                      <Chip key={s} text={s} tone="slate" />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-5 space-y-3">
                {rankedCandidates.map((c) => {
                  const isShortlisted = shortlisted.includes(c.student.id);
                  const score = c.match.score;

                  return (
                    <div
                      key={c.student.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="font-extrabold text-slate-900">
                              {c.student.name}
                            </div>
                            {c.student.id === currentStudentId ? (
                              <Badge tone="emerald">Demo selected student</Badge>
                            ) : null}
                            {isShortlisted ? <Badge tone="green">Shortlisted</Badge> : null}
                          </div>

                          <div className="text-sm text-slate-600 mt-1">
                            {c.student.education} • {c.student.year}
                          </div>

                          <div className="mt-3 grid md:grid-cols-2 gap-3">
                            <div className="bg-white border border-slate-200 rounded-2xl p-4">
                              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                                Matched Skills
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {c.match.matched.length ? (
                                  c.match.matched.map((s) => (
                                    <Chip key={s} text={s} tone="green" />
                                  ))
                                ) : (
                                  <span className="text-sm text-slate-600">—</span>
                                )}
                              </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-4">
                              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                                Missing Skills
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {c.match.missing.length ? (
                                  c.match.missing.map((s) => (
                                    <Chip key={s} text={s} tone="red" />
                                  ))
                                ) : (
                                  <Chip text="No gaps" tone="green" />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-slate-500">
                            Top domain:{" "}
                            <span className="font-semibold text-slate-700">
                              {c.topDomain ?? "Not assessed"}
                            </span>{" "}
                            • Verified evidence:{" "}
                            <span className="font-semibold text-slate-700">
                              {c.verifiedCount}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                            Match
                          </div>
                          <div className="text-3xl font-black text-emerald-700">
                            {score}%
                          </div>
                          <div className="mt-2">
                            <Badge
                              tone={
                                score >= 70 ? "green" : score >= 40 ? "yellow" : "red"
                              }
                            >
                              {score >= 70 ? "Strong" : score >= 40 ? "Medium" : "Low"}
                            </Badge>
                          </div>

                          <button
                            onClick={() => toggleShortlist(c.student.id)}
                            className={[
                              "mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold border",
                              isShortlisted
                                ? "bg-white border-rose-200 text-rose-600 hover:bg-rose-50"
                                : "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700",
                            ].join(" ")}
                          >
                            {isShortlisted ? (
                              <>
                                <XCircle className="h-4 w-4" /> Remove
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4" /> Shortlist
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 text-xs text-slate-500">
                MVP note: Shortlist is demo-only (stored in localStorage on this browser).
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl">
              <h2 className="text-xl font-extrabold">Profile & Settings (Demo)</h2>
              <p className="text-sm text-slate-600 mt-1">
                Full version will connect to company profiles + ATS workflows.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                    Company
                  </div>
                  <div className="text-sm font-extrabold mt-1">
                    Emerald Tech Pvt Ltd
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">
                    Vertical
                  </div>
                  <div className="text-sm font-extrabold mt-1">
                    Software / IT
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-slate-500">
                Tip: Use /demo launchpad for faster judging navigation.
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}