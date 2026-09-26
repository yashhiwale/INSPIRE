"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BrainCircuit, Target, ShieldCheck, Briefcase, GraduationCap, Building2, 
  Users, LineChart, ArrowRight, Mail, MapPin, Send, CheckCircle2, 
  BadgeCheck, Clock, User
} from "lucide-react";

export default function LandingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full font-sans text-slate-900">
      
      {/* 1. HERO SECTION (SaaS Level) */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-50/50 px-4 py-1.5 text-sm font-semibold text-indigo-700 backdrop-blur-md shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 mr-2.5 animate-pulse"></span>
            SIH Project: Intelligent Navigation for Skills & Employment
          </div>
          
          <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.1]">
            Bridging the gap between <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] animate-gradient">
              Potential & Placement
            </span>
          </h1>
          
          <p className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            Unlike conventional portals, INSPIRE is a centralized, skill-first ecosystem. 
            Discover your potential, bridge your skill gaps, and land your dream role with a verified digital passport.
          </p>
          
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/auth/register" 
              className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-900 rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-xl hover:shadow-indigo-500/25 w-full sm:w-auto"
            >
              Start Building Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/#how-it-works" 
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-700 bg-white/60 backdrop-blur-md border border-slate-200 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 w-full sm:w-auto"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES (Glassmorphic Cards) */}
      <section id="features" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Powerful Core Modules</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">A shared intelligence layer solving the disconnect between academia and industry.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <FeatureCard 
              icon={<BrainCircuit className="w-7 h-7 text-indigo-600" />} 
              title="AI/ML Student Profiling" 
              description="A multi-dimensional assessment engine analyzing 20 student dimensions and work preferences to recommend ideal career pathways." 
            />
            <FeatureCard 
              icon={<Target className="w-7 h-7 text-violet-600" />} 
              title="Gap-to-Opportunity Engine" 
              description="Visually compares current skills against live target industry roles, highlighting critical gaps and providing actionable paths." 
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-7 h-7 text-emerald-600" />} 
              title="Verified Skill Passport" 
              description="A tamper-evident digital portfolio showcasing cryptographically verified competencies instead of easily falsified resumes." 
            />
            <FeatureCard 
              icon={<Briefcase className="w-7 h-7 text-blue-600" />} 
              title="Opportunity Matching Engine" 
              description="Leverages NLP to seamlessly match students with relevant internships and jobs based entirely on real, verified skills." 
            />
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (Timeline/Loop Style) */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">The Continuous Loop</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">From academic learning to live industry requirements, a seamless pathway.</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-100 -translate-y-1/2 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
              {[
                { step: "1", title: "Discovery", desc: "AI-driven assessment of 20 dimensions." },
                { step: "2", title: "Gap Analysis", desc: "Compare skills vs target roles." },
                { step: "3", title: "Learning", desc: "Actionable paths & recommendations." },
                { step: "4", title: "Portfolio", desc: "Build a verified digital passport." },
                { step: "5", title: "Placement", desc: "NLP matching for jobs & internships." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold mb-6 shadow-xl shadow-indigo-500/10 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SKILL PASSPORT EXPLANATION */}
      <section id="skill-passport" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 -z-20"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full -z-10 translate-x-1/3 -translate-y-1/4"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">The Verified Skill Passport</h2>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto font-medium">Say goodbye to falsified resumes. A tamper-evident digital record of competencies.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BadgeCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Verified</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Skills cryptographically approved by institutions, ensuring 100% authenticity for employers.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pending</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Proof of skill has been submitted by the student and is currently awaiting official verification.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-slate-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Self-Declared</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Skills claimed by the student but currently lack official external proof or certification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STAKEHOLDERS */}
      <section id="stakeholders" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">A Unified Ecosystem</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StakeholderCard icon={<GraduationCap/>} title="Students" desc="Navigate career paths and verify skills." />
            <StakeholderCard icon={<Users/>} title="Faculty" desc="Monitor progress and verify skills." />
            <StakeholderCard icon={<Building2/>} title="Institutions" desc="Track placement metrics and success." />
            <StakeholderCard icon={<LineChart/>} title="Industry" desc="Access pre-assessed verified talent." />
          </div>
        </div>
      </section>

      {/* 6. REDESIGNED CONTACT SECTION */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Ready to reshape hiring?
            </h2>
            <p className="text-slate-500 text-lg font-medium">Get in touch with the INSPIRE team today.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-2 md:p-4 border border-slate-200/60 shadow-2xl shadow-slate-200/50">
            <div className="grid lg:grid-cols-5 gap-0 items-stretch rounded-3xl overflow-hidden">
              
              {/* Left: Contact Info */}
              <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 p-10 md:p-12 text-white relative">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
                  <p className="text-indigo-100 mb-12 font-medium">Fill up the form and our team will get back to you within 24 hours.</p>

                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-indigo-200">Email Us</p>
                        <p className="text-lg font-bold tracking-tight">hello@inspire.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-indigo-200">Headquarters</p>
                        <p className="text-lg font-bold tracking-tight">Innovation Hub, Pune</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-3 p-10 md:p-12 bg-white">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                    <p className="text-slate-500 font-medium">Thank you for reaching out. We will be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">First Name</label>
                        <input type="text" required placeholder="John" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Last Name</label>
                        <input type="text" required placeholder="Doe" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <input type="email" required placeholder="john@university.edu" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Message</label>
                      <textarea required rows={4} placeholder="How can we help you?" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all resize-none font-medium"></textarea>
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 mt-4 group">
                      Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// PREMIUM COMPONENTS
function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="p-8 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
  );
}

function StakeholderCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 shadow-sm">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}