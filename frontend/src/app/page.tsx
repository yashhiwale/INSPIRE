"use client";

import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  Users,
  LineChart,
  ArrowRight,
  ShieldCheck,
  Target,
  Briefcase,
  ChevronRight,
  PlayCircle,
  LayoutDashboard,
  School,
  BriefcaseBusiness,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
              <Image
                src="/inspire-logo.png"
                alt="SkillBridge"
                width={36}
                height={36}
                className="w-9 h-9 object-cover"
                priority
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              SkillBridge
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/demo"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-800 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Start Demo
            </Link>

            <Link
              href="/auth/login"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block"
            >
              Log in
            </Link>

            <Link
              href="/auth/register"
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-indigo-600 transition-all shadow-sm"
            >
              Join Ecosystem
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Smart India Hackathon Project
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bridging the Gap Between <br className="hidden md:block" />
              <span className="text-indigo-600">Academia and Industry</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Intelligent Navigation for Skills, Potential, Industry, Roadmaps & Employment. A unified platform for skill mapping,
              internships, verification, and placement readiness.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white text-base font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Start Demo <PlayCircle className="w-5 h-5" />
              </Link>

              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white text-base font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#stakeholders"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center"
              >
                Explore Portals
              </Link>
            </div>

            <div className="max-w-2xl mx-auto text-sm text-slate-500">
              Demo Mode Note: Stakeholder dashboards are connected via a local demo store for fast judging (no DB dependency).
            </div>
          </div>
        </section>

        {/* DEMO LAUNCHPAD */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Demo Launchpad</h2>
                <p className="text-slate-500 font-medium mt-2 max-w-2xl">
                  Quick access for judges: Assessment → Student → Faculty Verification → Employer Matching → Institution Analytics.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-extrabold hover:bg-slate-800"
                >
                  Open Demo Hub <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-extrabold hover:bg-slate-50"
                >
                  Open Assessment <GraduationCap className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <DemoCard href="/student" title="Student" desc="Roadmap + Passport" icon={LayoutDashboard} />
              <DemoCard href="/faculty" title="Faculty" desc="Verify/Reject Queue" icon={School} />
              <DemoCard href="/employer" title="Employer" desc="Post JD + Match" icon={BriefcaseBusiness} />
              <DemoCard href="/institution" title="Institution" desc="Analytics + Trends" icon={LineChart} />
              <DemoCard href="/assessment" title="Assessment" desc="20D Profile" icon={GraduationCap} />
            </div>
          </div>
        </section>

        {/* STAKEHOLDERS */}
        <section id="stakeholders" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Dedicated Command Centers</h2>
              <p className="text-slate-500 font-medium">
                Select your role to access specialized tools tailored for your needs within the SkillBridge ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/auth/register?role=student"
                className="block h-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Student Portal</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Discover roadmaps, identify skill gaps, and build your verified digital passport.
                </p>
                <div className="text-indigo-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Access Portal <ChevronRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/auth/register?role=employer"
                className="block h-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Industry Partner</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Post opportunities, match candidates, and shortlist verified profiles.
                </p>
                <div className="text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Access Portal <ChevronRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/auth/register?role=faculty"
                className="block h-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Academician</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Verify student evidence and view curriculum alignment snapshots.
                </p>
                <div className="text-violet-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Access Portal <ChevronRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/auth/register?role=institution"
                className="block h-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Institution Admin</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Monitor employability metrics, trends, and skill demand insights.
                </p>
                <div className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Access Portal <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center sm:text-left">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-4 mx-auto sm:mx-0">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Gap-to-Opportunity</h4>
              <p className="text-sm text-slate-500">
                Convert skill gaps into actionable learning + projects mapped to industry needs.
              </p>
            </div>

            <div className="text-center sm:text-left">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-4 mx-auto sm:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Verified Skill Passport</h4>
              <p className="text-sm text-slate-500">
                Evidence statuses: Pending → Verified/Rejected, supported by faculty review workflow.
              </p>
            </div>

            <div className="text-center sm:text-left">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-4 mx-auto sm:mx-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Explainable Matching</h4>
              <p className="text-sm text-slate-500">
                Match candidates to opportunities with clear “matched vs missing skills”.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md overflow-hidden border border-slate-200 bg-white inline-flex">
              <Image
                src="/inspire-logo.png"
                alt="SkillBridge"
                width={20}
                height={20}
                className="w-5 h-5 object-cover"
              />
            </span>
            <span className="font-bold text-slate-900 tracking-tight">
              SkillBridge
            </span>
          </div>
          <p>© 2024 Built for Smart India Hackathon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function DemoCard({
  href,
  title,
  desc,
  icon: Icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: any;
}) {
  return (
    <Link
      href={href}
      className="block p-4 bg-slate-50 rounded-2xl border border-slate-200 transition-all hover:bg-white hover:shadow-sm group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="w-5 h-5 text-slate-700" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-slate-900">{title}</div>
          <div className="text-xs text-slate-500 mt-1">{desc}</div>
        </div>
      </div>
    </Link>
  );
}