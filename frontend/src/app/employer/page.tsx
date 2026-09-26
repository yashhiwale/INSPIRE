"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  BadgeCheck, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Users,
  Building2
} from "lucide-react";
import Link from "next/link";

// Mock Data for Hackathon Prototype
const CANDIDATES = [
  {
    id: 1,
    name: "Yash Hiwale",
    role: "Full-Stack Developer",
    location: "Pune, Maharashtra",
    matchScore: 92,
    employability: 88,
    skills: [
      { name: "React.js", verified: true },
      { name: "Node.js", verified: true },
      { name: "AWS", verified: false }
    ],
    status: "Actively Looking"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Machine Learning Engineer",
    location: "Bangalore, Karnataka",
    matchScore: 85,
    employability: 91,
    skills: [
      { name: "Python", verified: true },
      { name: "TensorFlow", verified: true },
      { name: "SQL", verified: true }
    ],
    status: "Open to Offers"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Product Designer",
    location: "Remote / Delhi",
    matchScore: 78,
    employability: 82,
    skills: [
      { name: "Figma", verified: true },
      { name: "UI/UX", verified: false },
      { name: "Prototyping", verified: true }
    ],
    status: "Interviewing"
  }
];

export default function EmployerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  // Simple filter logic for the prototype
  const filteredCandidates = CANDIDATES.filter(c => 
    (roleFilter === "All Roles" || c.role.includes(roleFilter)) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Analytics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Users />} label="Total Verified Talent" value="1,248" trend="+12% this week" />
          <StatCard icon={<ShieldCheck />} label="Skills Verified" value="8,942" trend="Cryptographically secured" />
          <StatCard icon={<Building2 />} label="Active Job Posts" value="12" trend="3 needing urgent fulfillment" />
        </div>

        {/* Header & Search/Filter Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              Talent Discovery Engine
            </h1>
            <p className="text-slate-500 mt-1">NLP-powered matching based on verified competencies.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search skills or names..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600/50 outline-none text-sm transition-all"
              />
            </div>
            
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600/50 outline-none text-sm appearance-none cursor-pointer"
              >
                <option value="All Roles">All Roles</option>
                <option value="Developer">Developers</option>
                <option value="Engineer">Engineers</option>
                <option value="Designer">Designers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidate Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
          
          {filteredCandidates.length === 0 && (
            <div className="lg:col-span-2 py-12 text-center text-slate-500">
              No candidates found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Sub-components
function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-slate-500 mb-1">{label}</div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-xs text-emerald-600 font-medium mt-1">{trend}</div>
      </div>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: any }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      
      {/* Card Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-700 rounded-2xl flex items-center justify-center text-xl font-bold shadow-inner">
            {candidate.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1">
              {candidate.name}
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </h3>
            <p className="text-sm font-medium text-indigo-600">{candidate.role}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {candidate.location}
            </p>
          </div>
        </div>
        
        {/* Match Badge */}
        <div className="flex flex-col items-end">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
            <TrendingUp className="w-4 h-4" />
            {candidate.matchScore}% Match
          </div>
          <span className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">For your open role</span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-8 flex-grow">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Assessed Skills</div>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill: any, idx: number) => (
            <span 
              key={idx} 
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border ${
                skill.verified 
                  ? "bg-emerald-50/50 border-emerald-100 text-emerald-700" 
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              {skill.verified && <BadgeCheck className="w-4 h-4 text-emerald-500" />}
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="text-sm font-medium text-slate-500">
          Status: <span className="text-slate-900">{candidate.status}</span>
        </div>
        <Link 
          href="/profile" 
          className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 transition-colors shadow-sm"
        >
          View Passport
        </Link>
      </div>

    </div>
  );
}