"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BrainCircuit, 
  Target, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  Users, 
  LineChart,
  ArrowRight,
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare
} from "lucide-react";

export default function LandingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API POST request will be handled here
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh] text-center px-4"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50"></div>
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50/50 px-3 py-1 text-sm text-indigo-600 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            Intelligent Navigation for Skills, Potential, Industry, Roadmaps & Employment
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Bridging the gap between <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Potential & Placement
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            Unlike conventional portals, INSPIRE is a centralized, skill-first ecosystem. 
            Discover your potential, bridge your skill gaps, and land your dream role with a verified digital passport.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/assessment" 
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:scale-105 w-full sm:w-auto"
            >
              Start AI Profiling
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/employer" 
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all w-full sm:w-auto"
            >
              Industry Access
            </Link>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Continuous Loop</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From academic learning to live industry requirements, INSPIRE creates a seamless pathway for success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center items-start">
            {[
              { step: "1", title: "Discovery", desc: "AI-driven assessment of 20 dimensions." },
              { step: "2", title: "Gap Analysis", desc: "Compare current skills vs target roles." },
              { step: "3", title: "Learning", desc: "Actionable paths and project recommendations." },
              { step: "4", title: "Portfolio", desc: "Build a tamper-evident verified passport." },
              { step: "5", title: "Placement", desc: "NLP-based matching for jobs & internships." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center relative group">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-bold mb-4 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <section id="features" className="py-24 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Core Modules</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A shared intelligence layer solving the disconnect between academia and industry.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={<BrainCircuit className="w-8 h-8 text-indigo-500" />}
              title="AI/ML Student Profiling"
              description="An assessment engine analyzing 20 student dimensions and 6 work preferences to recommend pathways across 15 broad career domains."
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-blue-500" />}
              title="Gap-to-Opportunity Engine"
              description="Compares current skills against target industry roles to identify gaps, recommending highly actionable learning paths and live projects."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
              title="Verified Skill Passport"
              description="A tamper-evident digital portfolio recording skills, certifications, and hackathons with verification tiers: Self-Declared, Pending, and Verified."
            />
            <FeatureCard 
              icon={<Briefcase className="w-8 h-8 text-purple-500" />}
              title="Opportunity Matching Engine"
              description="Leverages NLP to seamlessly match students with relevant internships and full-time roles based entirely on verified skills and market demand."
            />
          </div>
        </div>
      </section>

      {/* 4. STAKEHOLDERS */}
      <section id="stakeholders" className="py-24 bg-white px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Unified Ecosystem</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Dedicated analytics and control panels tailored for every participant in the network.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StakeholderCard icon={<GraduationCap/>} title="Students" desc="Navigate career paths, verify skills, and match with ideal jobs." />
            <StakeholderCard icon={<Users/>} title="Faculty" desc="Monitor progress, verify skills, and guide learning journeys." />
            <StakeholderCard icon={<Building2/>} title="Institutions" desc="Track placement metrics, alumni success, and curriculum alignment." />
            <StakeholderCard icon={<LineChart/>} title="Industry" desc="Access pre-assessed talent with cryptographically verified portfolios." />
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION (Integrated) */}
      <section id="contact" className="py-24 bg-indigo-50/50 px-4 border-t border-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm text-indigo-600 shadow-sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Ready to reshape <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">hiring?</span>
            </h2>
            <p className="text-lg text-slate-600">
              Join the INSPIRE ecosystem. Whether you're a student seeking guidance or an industry leader hunting for verified talent—we're here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Email Us</p>
                      <a href="mailto:hello@inspire-platform.com" className="text-lg font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                        hello@inspire-platform.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Headquarters</p>
                      <p className="text-lg font-semibold text-slate-900">
                        Innovation Hub, Pune<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Box */}
              <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-lg">
                <h4 className="text-lg font-bold mb-2">Need Technical Support?</h4>
                <p className="text-indigo-200 mb-6 text-sm leading-relaxed">
                  If you are facing issues with your Skill Passport verification or AI Assessment profiling, visit our Help Center.
                </p>
                <Link href="#" className="text-white font-semibold flex items-center hover:text-indigo-300 transition-colors">
                  Visit Help Center &rarr;
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
                {isSubmitted ? (
                  <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                    <p className="text-slate-600 max-w-md mx-auto">
                      Thank you for reaching out. Our team will get back to you within 24-48 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-indigo-600 font-semibold hover:text-indigo-700"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-slate-900">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all"
                          placeholder="Yash"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-slate-900">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all"
                          placeholder="Hiwale"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-900">Work or University Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all"
                        placeholder="yash@university.edu"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium text-slate-900">I am a...</label>
                      <select 
                        id="role" 
                        required
                        defaultValue=""
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all text-slate-700"
                      >
                        <option value="" disabled>Select your role in the ecosystem</option>
                        <option value="student">Student / Job Seeker</option>
                        <option value="industry">Industry Professional / Recruiter</option>
                        <option value="institution">University / Institution Admin</option>
                        <option value="faculty">Faculty Member / Educator</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-900">How can we help you?</label>
                      <textarea 
                        id="message" 
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all resize-none"
                        placeholder="Tell us about your requirements or questions..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 group"
                    >
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

// Sub-components
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StakeholderCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  );
}