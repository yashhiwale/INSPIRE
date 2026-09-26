"use client";

import { 
  BrainCircuit, 
  Target, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  Award
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, Yash</h1>
            <p className="text-slate-500 mt-1">Here is the latest snapshot of your employability and skill journey.</p>
          </div>
          <Link 
            href="/assessment" 
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <BrainCircuit className="w-4 h-4" />
            Retake AI Profiling
          </Link>
        </div>

        {/* Top Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard 
            title="Employability Score" 
            value="92/100" 
            subtitle="Top 8% in your university"
            icon={<TrendingUp className="w-6 h-6 text-indigo-600" />}
            color="indigo"
          />
          <DashboardCard 
            title="Verified Skills" 
            value="6 Active" 
            subtitle="2 pending verification"
            icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />}
            color="emerald"
          />
          <DashboardCard 
            title="Industry Matches" 
            value="3 Roles" 
            subtitle="Based on your current gaps"
            icon={<Briefcase className="w-6 h-6 text-blue-600" />}
            color="blue"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Activity Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Navigation Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/profile" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col items-start">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Skill Passport</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">View your cryptographically verified competencies.</p>
                <div className="mt-auto flex items-center text-sm font-semibold text-indigo-600">
                  Open Passport <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              <Link href="/skills" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col items-start">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Gap Analysis</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">Compare your skills against industry requirements.</p>
                <div className="mt-auto flex items-center text-sm font-semibold text-indigo-600">
                  View Gap Engine <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </div>

            {/* Recent Activity / Verification Status */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Verification Activity</h2>
              <div className="space-y-6">
                <ActivityRow 
                  title="Node.js Backend Assessment" 
                  status="Pending Review" 
                  time="2 days ago" 
                  type="pending" 
                />
                <ActivityRow 
                  title="Meta Front-End Certificate" 
                  status="Verified Successfully" 
                  time="1 week ago" 
                  type="verified" 
                />
                <ActivityRow 
                  title="Cloud Deployment (AWS)" 
                  status="Proof Submitted" 
                  time="1 week ago" 
                  type="pending" 
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar: Recommended Opportunities */}
          <div className="space-y-8">
            <div className="bg-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-indigo-300" />
                Top Industry Matches
              </h2>
              
              <div className="space-y-4">
                <JobMatchCard 
                  company="TechCorp Solutions" 
                  role="Junior Full-Stack Dev" 
                  match="92%" 
                />
                <JobMatchCard 
                  company="Innovate AI" 
                  role="Machine Learning Intern" 
                  match="85%" 
                />
                <JobMatchCard 
                  company="Global Systems" 
                  role="Backend Engineer" 
                  match="78%" 
                />
              </div>

              <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-semibold border border-white/20">
                View All Opportunities
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// Sub-components
function DashboardCard({ title, value, subtitle, icon, color }: any) {
  const bgColors = {
    indigo: "bg-indigo-50",
    emerald: "bg-emerald-50",
    blue: "bg-blue-50"
  };
  
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className={`w-14 h-14 ${bgColors[color as keyof typeof bgColors]} rounded-2xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-slate-500 mb-1">{title}</div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-xs font-medium text-slate-400 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}

function ActivityRow({ title, status, time, type }: any) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          type === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
        }`}>
          {type === 'verified' ? <ShieldCheck className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{title}</p>
          <p className={`text-xs font-medium mt-0.5 ${
            type === 'verified' ? 'text-emerald-600' : 'text-amber-600'
          }`}>{status}</p>
        </div>
      </div>
      <span className="text-xs font-medium text-slate-400">{time}</span>
    </div>
  );
}

function JobMatchCard({ company, role, match }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-indigo-100 text-sm">{role}</h3>
        <span className="text-xs font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-md">{match}</span>
      </div>
      <p className="text-xs text-indigo-300">{company}</p>
    </div>
  );
}