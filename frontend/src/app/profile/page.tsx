"use client";

import { BadgeCheck, Clock, User, ShieldCheck, Award, Briefcase, GraduationCap, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

// Mock Data for the Hackathon Demo
const STUDENT_PROFILE = {
  name: "Yash Hiwale",
  domain: "Full-Stack & AI Development",
  university: "Innovation Hub, Pune",
  matchScore: 92,
};

const SKILLS_DATA = [
  { id: 1, name: "React.js / Next.js", status: "verified", issuer: "Meta Front-End Certificate" },
  { id: 2, name: "Machine Learning (Python)", status: "verified", issuer: "SIH 2023 Hackathon" },
  { id: 3, name: "Node.js Backend", status: "pending", issuer: "University Project Evaluation" },
  { id: 4, name: "Tailwind CSS", status: "self-declared", issuer: null },
  { id: 5, name: "Cloud Deployment (AWS)", status: "pending", issuer: "AWS Cloud Practitioner Exam" },
  { id: 6, name: "UI/UX Prototyping", status: "self-declared", issuer: null },
];

export default function SkillPassport() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center text-white text-3xl font-bold">
              {STUDENT_PROFILE.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-slate-900">{STUDENT_PROFILE.name}</h1>
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-lg text-indigo-600 font-medium mb-2">{STUDENT_PROFILE.domain}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> {STUDENT_PROFILE.university}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-center min-w-[150px]">
            <div className="text-sm font-semibold text-indigo-600 mb-1">Employability Score</div>
            <div className="text-4xl font-extrabold text-slate-900">{STUDENT_PROFILE.matchScore}<span className="text-lg text-slate-500">/100</span></div>
          </div>
        </div>

        {/* Skill Passport Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" />
                Verified Skill Passport
              </h2>
              <p className="text-slate-500 mt-1">Tamper-evident digital record of your competencies.</p>
            </div>
            <Link 
              href="/skills"
              className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Briefcase className="w-4 h-4" />
              Find Opportunities
            </Link>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium">
            <span className="flex items-center gap-2 text-emerald-700"><BadgeCheck className="w-4 h-4 text-emerald-500"/> Verified</span>
            <span className="flex items-center gap-2 text-amber-700"><Clock className="w-4 h-4 text-amber-500"/> Pending Verification</span>
            <span className="flex items-center gap-2 text-slate-600"><User className="w-4 h-4 text-slate-400"/> Self-Declared</span>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {SKILLS_DATA.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-component for individual skill rendering
function SkillCard({ skill }: { skill: any }) {
  const isVerified = skill.status === "verified";
  const isPending = skill.status === "pending";
  
  return (
    <div className={`p-5 rounded-2xl border transition-all hover:shadow-md ${
      isVerified ? "bg-emerald-50/30 border-emerald-100" :
      isPending ? "bg-amber-50/30 border-amber-100" :
      "bg-slate-50/50 border-slate-100"
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-900 text-lg">{skill.name}</h3>
        {isVerified && <BadgeCheck className="w-6 h-6 text-emerald-500 shrink-0" />}
        {isPending && <Clock className="w-6 h-6 text-amber-500 shrink-0" />}
        {!isVerified && !isPending && <User className="w-6 h-6 text-slate-400 shrink-0" />}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm">
          {isVerified ? (
            <span className="text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Verified by {skill.issuer}
            </span>
          ) : isPending ? (
            <span className="text-amber-600 font-medium flex items-center gap-1">
              Waiting on {skill.issuer}
            </span>
          ) : (
            <span className="text-slate-500 font-medium">No official proof provided</span>
          )}
        </div>
        
        {isVerified && (
          <button className="text-indigo-600 hover:text-indigo-800 transition-colors" title="View cryptographic proof">
            <LinkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}