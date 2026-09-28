"use client";

import { useState } from "react";
import { GraduationCap, Building2, Users, LineChart, ArrowRight, Loader2, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase"; 

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Common Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Dynamic Fields - Student
  const [universityId, setUniversityId] = useState("");
  const [degree, setDegree] = useState("");
  const [studyYear, setStudyYear] = useState("");

  // Dynamic Fields - Employer
  const [companyName, setCompanyName] = useState("");
  const [industryVertical, setIndustryVertical] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  // Dynamic Fields - Faculty
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  // Dynamic Fields - Institution
  const [institutionName, setInstitutionName] = useState("");
  const [institutionCode, setInstitutionCode] = useState("");
  const [officerContact, setOfficerContact] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Preparing rich dynamic meta data based on INSPIRE ecosystem needs
    let metaData: any = { first_name: firstName, last_name: lastName, role: selectedRole };
    
    if (selectedRole === "student") {
      metaData = { ...metaData, university_id: universityId, degree, study_year: studyYear };
    } else if (selectedRole === "employer") {
      metaData = { ...metaData, company_name: companyName, industry_vertical: industryVertical, company_website: companyWebsite };
    } else if (selectedRole === "faculty") {
      metaData = { ...metaData, employee_id: employeeId, department, designation };
    } else if (selectedRole === "institution") {
      metaData = { ...metaData, institution_name: institutionName, institution_code: institutionCode, officer_contact: officerContact };
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: metaData }
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Route to respective dashboards
    if (selectedRole === "student") router.push("/student");
    else if (selectedRole === "employer") router.push("/employer");
    else if (selectedRole === "faculty") router.push("/faculty");
    else if (selectedRole === "institution") router.push("/institution");
    else router.push("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl w-full">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20 mb-6 group hover:scale-105 transition-transform">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Join the INSPIRE Ecosystem</h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            A unified intelligence layer bridging academia and industry. Select your stakeholder role to set up your dedicated workspace.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Role Selection (Left Side - 5 columns) */}
          <div className="lg:col-span-5 bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm">1</span>
              Select Stakeholder Role
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <RoleCard id="student" icon={<GraduationCap className="w-5 h-5"/>} title="Student" desc="Skill gap & career exploration" selected={selectedRole === "student"} onClick={() => setSelectedRole("student")} color="indigo" />
              <RoleCard id="employer" icon={<Building2 className="w-5 h-5"/>} title="Employer" desc="Post jobs & discover talent" selected={selectedRole === "employer"} onClick={() => setSelectedRole("employer")} color="emerald" />
              <RoleCard id="faculty" icon={<Users className="w-5 h-5"/>} title="Faculty" desc="Verify skills & mentorship" selected={selectedRole === "faculty"} onClick={() => setSelectedRole("faculty")} color="violet" />
              <RoleCard id="institution" icon={<LineChart className="w-5 h-5"/>} title="Institution" desc="Placement analytics & tracking" selected={selectedRole === "institution"} onClick={() => setSelectedRole("institution")} color="blue" />
            </div>
          </div>

          {/* Registration Form (Right Side - 7 columns) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-slate-200/50 relative overflow-hidden min-h-[600px]">
             <h2 className="text-xl font-bold mb-8 text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm">2</span>
              {selectedRole ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Onboarding` : "Account Details"}
            </h2>

            {!selectedRole ? (
               <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center px-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4"><ArrowRight className="w-6 h-6 text-slate-400" /></div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Awaiting Role Selection</h3>
                  <p className="text-slate-500 font-medium">Please select a stakeholder role to view the specialized registration fields.</p>
               </div>
            ) : null}

            {errorMsg && <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-sm font-semibold rounded-2xl border border-rose-100 flex items-center gap-2">{errorMsg}</div>}
            
            <form onSubmit={handleRegister} className="space-y-6 relative z-20">
              
              {/* Common Details Section */}
              <div className="space-y-5 pb-6 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider">Primary User Details</h3>
                <div className="grid grid-cols-2 gap-5">
                  <InputGroup label="First Name" type="text" value={firstName} onChange={setFirstName} disabled={loading} placeholder="John" />
                  <InputGroup label="Last Name" type="text" value={lastName} onChange={setLastName} disabled={loading} placeholder="Doe" />
                </div>
                <InputGroup label="Official Email Address" type="email" value={email} onChange={setEmail} disabled={loading} placeholder={selectedRole === 'employer' ? 'hr@company.com' : 'user@university.edu'} />
                <InputGroup label="Password" type="password" value={password} onChange={setPassword} disabled={loading} placeholder="••••••••" minLength={6} />
              </div>

              {/* Dynamic Role-Specific Section */}
              <div className="space-y-5 pt-2">
                <h3 className="text-sm font-extrabold text-indigo-500 uppercase tracking-wider">Professional Information</h3>
                
                <AnimatePresence mode="wait">
                  
                  {/* STUDENT FIELDS */}
                  {selectedRole === "student" && (
                    <motion.div key="student" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                      <InputGroup label="University Enrollment No." type="text" value={universityId} onChange={setUniversityId} disabled={loading} placeholder="e.g. CS2024-8902" />
                      <div className="grid grid-cols-2 gap-5">
                        <SelectGroup label="Degree / Program" value={degree} onChange={setDegree} disabled={loading} options={["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "Other"]} />
                        <SelectGroup label="Current Year" value={studyYear} onChange={setStudyYear} disabled={loading} options={["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"]} />
                      </div>
                    </motion.div>
                  )}

                  {/* EMPLOYER FIELDS */}
                  {selectedRole === "employer" && (
                     <motion.div key="employer" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                       <InputGroup label="Registered Company Name" type="text" value={companyName} onChange={setCompanyName} disabled={loading} placeholder="e.g. InnovateTech India" />
                       <div className="grid grid-cols-2 gap-5">
                         <SelectGroup label="Industry Vertical" value={industryVertical} onChange={setIndustryVertical} disabled={loading} options={["IT & Software", "Healthcare", "Finance", "Manufacturing", "EdTech", "Other"]} />
                         <InputGroup label="Company Website" type="url" value={companyWebsite} onChange={setCompanyWebsite} disabled={loading} placeholder="https://" required={false} />
                       </div>
                    </motion.div>
                  )}

                  {/* FACULTY FIELDS */}
                  {selectedRole === "faculty" && (
                     <motion.div key="faculty" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                       <InputGroup label="Faculty Employee ID" type="text" value={employeeId} onChange={setEmployeeId} disabled={loading} placeholder="e.g. FAC-4091" />
                       <div className="grid grid-cols-2 gap-5">
                          <InputGroup label="Department" type="text" value={department} onChange={setDepartment} disabled={loading} placeholder="e.g. Computer Science" />
                          <SelectGroup label="Designation" value={designation} onChange={setDesignation} disabled={loading} options={["Assistant Professor", "Associate Professor", "Professor", "HOD", "Research Scholar"]} />
                       </div>
                    </motion.div>
                  )}

                  {/* INSTITUTION FIELDS */}
                  {selectedRole === "institution" && (
                     <motion.div key="institution" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                       <InputGroup label="Institution Name" type="text" value={institutionName} onChange={setInstitutionName} disabled={loading} placeholder="e.g. National Institute of Tech" />
                       <div className="grid grid-cols-2 gap-5">
                          <InputGroup label="AICTE / UGC Code" type="text" value={institutionCode} onChange={setInstitutionCode} disabled={loading} placeholder="e.g. UGC-209-MAH" />
                          <InputGroup label="Placement Officer Contact" type="text" value={officerContact} onChange={setOfficerContact} disabled={loading} placeholder="+91" />
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button type="submit" disabled={!selectedRole || loading} className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed group">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm font-medium text-slate-500 relative z-20">
              Already have an account in the ecosystem? <Link href="/auth/login" className="text-indigo-600 font-bold hover:underline">Secure Log in</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// PREMIUM COMPONENTS
function RoleCard({ id, icon, title, desc, selected, onClick, color }: any) {
  const colorMap: any = {
    indigo: "border-indigo-600 bg-indigo-50/50 shadow-indigo-100",
    emerald: "border-emerald-600 bg-emerald-50/50 shadow-emerald-100",
    violet: "border-violet-600 bg-violet-50/50 shadow-violet-100",
    blue: "border-blue-600 bg-blue-50/50 shadow-blue-100"
  };
  
  const textMap: any = {
    indigo: "text-indigo-900", emerald: "text-emerald-900", violet: "text-violet-900", blue: "text-blue-900"
  };

  const iconBgMap: any = {
    indigo: "bg-indigo-600 text-white", emerald: "bg-emerald-600 text-white", violet: "bg-violet-600 text-white", blue: "bg-blue-600 text-white"
  };

  return (
    <div onClick={onClick} className={`cursor-pointer p-4 rounded-[1.5rem] border-2 transition-all duration-300 flex items-center gap-4 ${selected ? `${colorMap[color]} shadow-lg scale-[1.02]` : "border-transparent bg-slate-50 shadow-sm hover:border-slate-200 hover:shadow-md hover:bg-white"}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${selected ? iconBgMap[color] : "bg-white text-slate-400 border border-slate-100 shadow-sm"}`}>
        {icon}
      </div>
      <div>
        <div className={`font-bold text-base ${selected ? textMap[color] : "text-slate-700"}`}>{title}</div>
        <div className="text-xs font-medium text-slate-500">{desc}</div>
      </div>
    </div>
  );
}

function InputGroup({ label, type, value, onChange, disabled, placeholder, required = true, minLength }: any) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-sm font-bold text-slate-700">{label}</label>
      <input 
        type={type} value={value} onChange={e => onChange(e.target.value)} required={required} disabled={disabled} placeholder={placeholder} minLength={minLength}
        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium disabled:opacity-50 text-slate-900 placeholder:text-slate-400" 
      />
    </div>
  );
}

function SelectGroup({ label, value, onChange, disabled, options }: any) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-sm font-bold text-slate-700">{label}</label>
      <select 
        value={value} onChange={e => onChange(e.target.value)} required disabled={disabled}
        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium disabled:opacity-50 text-slate-900 appearance-none"
      >
        <option value="" disabled>Select {label}</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}