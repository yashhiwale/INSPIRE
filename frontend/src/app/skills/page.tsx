"use client";

import { Target, TrendingUp, BookOpen, Code2, AlertCircle, ArrowRight, Briefcase, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock Data for Hackathon
const TARGET_ROLES = ["Full-Stack Developer", "Machine Learning Engineer", "Product Designer"];

const SKILL_GAPS = [
  { skill: "React.js / Next.js", current: 90, required: 85, status: "surpassed" },
  { skill: "Node.js & Express", current: 60, required: 80, status: "gap" },
  { skill: "System Design", current: 30, required: 70, status: "critical" },
  { skill: "Cloud Deployment (AWS)", current: 45, required: 60, status: "gap" },
  { skill: "PostgreSQL / MongoDB", current: 75, required: 75, status: "met" },
];

const LEARNING_PATHS = [
  {
    title: "Advanced Node.js Scaling",
    type: "Course",
    provider: "INSPIRE Academy",
    duration: "4 Weeks",
    targets: "Node.js & Express",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    title: "Build a Distributed Cache",
    type: "Live Project",
    provider: "Industry Partner: TechCorp",
    duration: "2 Weeks",
    targets: "System Design",
    icon: <Code2 className="w-5 h-5" />
  }
];

export default function GapAnalysisPage() {
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Role Selector */}
        <div className="bg-indigo-900 rounded-3xl p-8 md:p-10 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center rounded-full bg-indigo-800/50 border border-indigo-700 px-3 py-1 text-sm text-indigo-200 mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Gap-to-Opportunity Engine
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Skill Gap Analysis</h1>
            <p className="text-indigo-200 max-w-xl">
              Compare your current verified skills against live industry requirements to identify actionable growth areas.
            </p>
          </div>
          
          <div className="w-full md:w-auto bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
            <label className="block text-sm font-medium text-indigo-200 mb-2">Target Industry Role</label>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full md:w-64 bg-white text-slate-900 px-4 py-2.5 rounded-xl outline-none font-medium"
            >
              {TARGET_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Skill Bars */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
              <Target className="w-6 h-6 text-indigo-600" />
              Competency vs. Requirement
            </h2>
            
            <div className="space-y-6">
              {SKILL_GAPS.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700">{item.skill}</span>
                    <span className={item.status === 'critical' ? 'text-rose-600' : 'text-slate-500'}>
                      {item.current}% / {item.required}%
                    </span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    {/* Required Target Marker */}
                    <div 
                      className="absolute top-0 bottom-0 border-r-2 border-slate-400 z-10"
                      style={{ left: `${item.required}%` }}
                    ></div>
                    
                    {/* Current Skill Level */}
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                        item.status === 'critical' ? 'bg-rose-500' :
                        item.status === 'gap' ? 'bg-amber-400' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${item.current}%` }}
                    ></div>
                  </div>
                  
                  {item.status === 'critical' && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> High priority gap identified
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Actionable Paths */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-amber-500" />
                Recommended Action Paths
              </h2>
              
              <div className="space-y-4">
                {LEARNING_PATHS.map((path, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-indigo-200 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          {path.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{path.title}</h3>
                          <p className="text-xs font-medium text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded-md mt-1">
                            Targets: {path.targets}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded-lg">
                        {path.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                      <div className="text-sm text-slate-500">
                        {path.provider} • {path.duration}
                      </div>
                      <button className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1">
                        Start <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Opportunity Match Prompt */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-8 text-white shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Ready for the industry?</h3>
                <p className="text-indigo-100 text-sm max-w-sm">
                  Based on your current verified skills, you have an 82% match for 3 active internships.
                </p>
              </div>
              <Link href="/employer" className="w-12 h-12 bg-white text-indigo-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shrink-0">
                <Briefcase className="w-6 h-6" />
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}