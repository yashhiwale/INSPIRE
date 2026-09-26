"use client";

import { LineChart, Building2, Users, Award, TrendingUp, CheckCircle, BarChart3, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function InstitutionDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-12 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* INSTITUTION ADMIN PROFILE BANNER */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-blue-500/20">
              IU
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Innovation Hub University</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Institution
                </span>
              </div>
              <p className="text-slate-600 font-medium text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Central Placement & Academic Command Center • Pune, India
              </p>
              <p className="text-slate-400 text-xs mt-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> placement.cell@innovationhub.edu | Code: SIH-INST-904
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto justify-center">
            <div className="bg-blue-50/60 px-6 py-4 rounded-2xl border border-blue-100 text-center">
              <div className="text-xs font-bold text-blue-600 uppercase">Total Students</div>
              <div className="text-2xl font-extrabold text-slate-900">4,280</div>
            </div>
            <div className="bg-emerald-50/60 px-6 py-4 rounded-2xl border border-emerald-100 text-center">
              <div className="text-xs font-bold text-emerald-600 uppercase">Placement Ready</div>
              <div className="text-2xl font-extrabold text-slate-900">89%</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users className="w-6 h-6 text-indigo-600" />} title="Verified Passports" value="3,840" desc="Tamper-evident profiles active" />
          <StatCard icon={<Building2 className="w-6 h-6 text-emerald-600" />} title="Partner Employers" value="142" desc="Active companies hiring from hub" />
          <StatCard icon={<Award className="w-6 h-6 text-purple-600" />} title="Avg Employability" value="86/100" desc="+4.2% from previous semester" />
          <StatCard icon={<TrendingUp className="w-6 h-6 text-blue-600" />} title="Placement Rate" value="94.5%" desc="Target: 95% for current batch" />
        </div>

        {/* Main Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Department Readiness */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Department-wise Placement Readiness
            </h2>

            <div className="space-y-5">
              {[
                { dept: "Computer Science & Engineering", students: "1,200", ready: "96%", status: "Excellent" },
                { dept: "Artificial Intelligence & Data Science", students: "850", ready: "92%", status: "On Track" },
                { dept: "Information Technology", students: "950", ready: "88%", status: "Good" },
                { dept: "Electronics & Communication", students: "1,280", ready: "79%", status: "Needs Support" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.dept}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Enrolled Students: {item.students}</p>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900">{item.ready} Ready</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === "Excellent" ? "bg-emerald-100 text-emerald-800" :
                        item.status === "On Track" ? "bg-indigo-100 text-indigo-800" :
                        item.status === "Good" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                      }`}>{item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/60 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Top Recruiting Partners
              </h3>
              <div className="space-y-3">
                {["Google India", "Microsoft", "Amazon Web Services", "TCS Digital", "Accenture"].map((company, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                    <span>{company}</span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Active Hiring</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-[2rem] p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                SIH Compliance Status
              </h3>
              <p className="text-indigo-200 text-xs font-medium leading-relaxed mb-4">
                All institutional student skill passports comply with cryptographic verification guidelines. Zero fraudulent certificates detected.
              </p>
              <div className="text-xs font-semibold bg-white/10 px-3 py-2 rounded-xl text-center border border-white/10">
                Secured via INSPIRE Intelligence Layer
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, title, value, desc }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200/60 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 shadow-sm">{icon}</div>
      <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</div>
      <div className="font-bold text-sm text-slate-700 mt-0.5">{title}</div>
      <div className="text-xs text-slate-400 font-medium mt-1">{desc}</div>
    </div>
  );
}