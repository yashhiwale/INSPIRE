"use client";

import { useState } from "react";
import { Users, CheckCircle2, XCircle, Clock, BookOpen, TrendingUp, ShieldCheck, AlertCircle, Award, Mail, Building } from "lucide-react";

export default function FacultyDashboard() {
  const [requests, setRequests] = useState([
    { id: 1, student: "Rahul Sharma", skill: "React.js Advanced", course: "B.Tech CSE - 3rd Year", submittedDate: "2026-09-24", status: "Pending" },
    { id: 2, student: "Priya Verma", skill: "Python Machine Learning", course: "B.Tech AI - Final Year", submittedDate: "2026-09-25", status: "Pending" },
    { id: 3, student: "Amit Kumar", skill: "Cloud Deployment (AWS)", course: "B.Tech IT - 3rd Year", submittedDate: "2026-09-26", status: "Pending" },
  ]);

  const handleVerify = (id: number, status: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-12 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* FACULTY PROFILE BANNER */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-indigo-500/20">
              DR
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Dr. R. K. Sharma</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">Verified Faculty</span>
              </div>
              <p className="text-slate-600 font-medium text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" /> Department of Computer Science & Engineering • Innovation Hub
              </p>
              <p className="text-slate-400 text-xs mt-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> faculty.sharma@inspire.edu | ID: FAC-84920
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto justify-center">
            <div className="bg-indigo-50/60 px-6 py-4 rounded-2xl border border-indigo-100 text-center">
              <div className="text-xs font-bold text-indigo-600 uppercase">Pending Reviews</div>
              <div className="text-2xl font-extrabold text-slate-900">{requests.filter(r => r.status === "Pending").length}</div>
            </div>
            <div className="bg-emerald-50/60 px-6 py-4 rounded-2xl border border-emerald-100 text-center">
              <div className="text-xs font-bold text-emerald-600 uppercase">Batch Avg Score</div>
              <div className="text-2xl font-extrabold text-slate-900">84/100</div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Verification Queue */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Student Skill Verification Queue
              </h2>
              <span className="text-xs font-semibold text-slate-400">Live Cryptographic Signer</span>
            </div>

            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-white hover:shadow-md">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-base">{req.student}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700 font-semibold">{req.course}</span>
                    </div>
                    <p className="text-sm font-medium text-indigo-600">Skill Claim: {req.skill}</p>
                    <p className="text-xs text-slate-400 mt-1">Submitted on {req.submittedDate}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {req.status === "Pending" ? (
                      <>
                        <button 
                          onClick={() => handleVerify(req.id, "Verified")}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Verify
                        </button>
                        <button 
                          onClick={() => handleVerify(req.id, "Rejected")}
                          className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                        req.status === "Verified" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {req.status === "Verified" ? <ShieldCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {req.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/60 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Curriculum Alignment
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>React & Modern Web</span>
                    <span className="text-emerald-600">92% Match</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[92%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>AI & Prompt Engineering</span>
                    <span className="text-indigo-600">85% Match</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-[2rem] p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Batch Health Insights
              </h3>
              <p className="text-indigo-200 text-xs font-medium leading-relaxed mb-4">
                4 students identified with skill gaps. Automated remedial roadmap recommended.
              </p>
              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors">
                Trigger Remedial AI Path
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}