"use client";

import { useState } from "react";
import { GraduationCap, Building2, Users, LineChart, BrainCircuit, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "student") router.push("/student");
    else if (selectedRole === "employer") router.push("/employer");
    else router.push("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      
      <div className="max-w-5xl w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">Create your account</h1>
          <p className="text-slate-500 text-lg font-medium">Join the skill-first ecosystem. Select your role to get started.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Role Selection */}
          <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-xl font-bold mb-6 text-slate-900 tracking-tight">1. Select your Role</h2>
            <div className="grid grid-cols-2 gap-4">
              <RoleCard id="student" icon={<GraduationCap />} title="Student" selected={selectedRole === "student"} onClick={() => setSelectedRole("student")} />
              <RoleCard id="employer" icon={<Building2 />} title="Employer" selected={selectedRole === "employer"} onClick={() => setSelectedRole("employer")} />
              <RoleCard id="faculty" icon={<Users />} title="Faculty" selected={selectedRole === "faculty"} onClick={() => setSelectedRole("faculty")} />
              <RoleCard id="institution" icon={<LineChart />} title="Institution" selected={selectedRole === "institution"} onClick={() => setSelectedRole("institution")} />
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/50 flex flex-col justify-center transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-slate-900 tracking-tight">
              {selectedRole ? `2. Register as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : "2. Account details"}
            </h2>
            
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">First Name</label>
                  <input type="text" required disabled={!selectedRole} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium disabled:opacity-50" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Last Name</label>
                  <input type="text" required disabled={!selectedRole} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium disabled:opacity-50" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Email Address</label>
                <input type="email" required disabled={!selectedRole} placeholder={selectedRole === 'employer' ? 'hr@company.com' : 'student@university.edu'} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium disabled:opacity-50" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <input type="password" required disabled={!selectedRole} placeholder="••••••••" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium disabled:opacity-50" />
              </div>
              
              <button type="submit" disabled={!selectedRole} className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed group">
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              Already have an account? <Link href="/auth/login" className="text-indigo-600 font-bold hover:underline">Log in here</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, selected, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-3 ${selected ? "border-indigo-600 bg-indigo-50/50 shadow-md scale-105" : "border-transparent bg-white shadow-sm hover:border-indigo-200 hover:shadow-md"}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${selected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-50 text-slate-400"}`}>{icon}</div>
      <span className={`font-bold text-sm ${selected ? "text-indigo-900" : "text-slate-600"}`}>{title}</span>
    </div>
  );
}