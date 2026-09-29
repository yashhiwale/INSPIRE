"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Role = "student" | "employer" | "faculty" | "institution";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("student");

  // common
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // student
  const [universityId, setUniversityId] = useState("");
  const [degree, setDegree] = useState("B.Tech");
  const [studyYear, setStudyYear] = useState("1st Year");

  // employer
  const [companyName, setCompanyName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [industryVertical, setIndustryVertical] = useState("Software / IT");

  // faculty
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  // institution
  const [institutionCode, setInstitutionCode] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [officerContact, setOfficerContact] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const roleTitle = useMemo(() => {
    switch (role) {
      case "student":
        return "Student Registration";
      case "employer":
        return "Employer Registration";
      case "faculty":
        return "Faculty Registration";
      case "institution":
        return "Institution Registration";
      default:
        return "Registration";
    }
  }, [role]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      // If Supabase env is not set, this may throw at runtime; we catch and provide demo fallback.
      const meta: Record<string, any> = {
        role,
        first_name: firstName,
        last_name: lastName,

        university_id: role === "student" ? universityId : null,
        degree: role === "student" ? degree : null,
        study_year: role === "student" ? studyYear : null,

        company_name: role === "employer" ? companyName : null,
        employee_id: role === "employer" ? employeeId : null,
        industry_vertical: role === "employer" ? industryVertical : null,

        department: role === "faculty" ? department : null,
        designation: role === "faculty" ? designation : null,

        institution_code: role === "institution" ? institutionCode : null,
        institution_name: role === "institution" ? institutionName : null,
        officer_contact: role === "institution" ? officerContact : null,
      };

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: meta },
      });

      if (error) throw error;

      // For MVP: send user to demo hub (you can later route role-based)
      router.push("/demo");
    } catch (e: any) {
      // Demo fallback (so deployments don’t block judging)
      console.error(e);
      setErr(
        e?.message ||
          "Registration failed. If Supabase is not configured, use /demo directly for MVP."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <Link
            href="/demo"
            className="text-sm font-extrabold text-indigo-700 hover:text-indigo-800"
          >
            Skip to Demo →
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Smart India Hackathon • MVP
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {roleTitle}
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              This page is optional for MVP demo. If Supabase isn’t configured on deployment, open{" "}
              <span className="font-semibold">/demo</span>.
            </p>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            {err ? (
              <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                {err}
              </div>
            ) : null}

            {/* Role */}
            <div>
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="mt-2 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="employer">Employer</option>
                <option value="faculty">Faculty</option>
                <option value="institution">Institution</option>
              </select>
            </div>

            {/* Common fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First Name" value={firstName} setValue={setFirstName} disabled={loading} />
              <Field label="Last Name" value={lastName} setValue={setLastName} disabled={loading} />
              <Field label="Email" type="email" value={email} setValue={setEmail} disabled={loading} />
              <Field label="Password" type="password" value={password} setValue={setPassword} disabled={loading} />
            </div>

            {/* Role-specific */}
            {role === "student" && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                <div className="text-sm font-extrabold text-slate-900">Student Details</div>
                <Field
                  label="University Enrollment No."
                  value={universityId}
                  setValue={setUniversityId}
                  disabled={loading}
                  placeholder="e.g. CS2024-8902"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Degree / Program"
                    value={degree}
                    setValue={setDegree}
                    disabled={loading}
                    options={["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "Other"]}
                  />
                  <SelectField
                    label="Study Year"
                    value={studyYear}
                    setValue={setStudyYear}
                    disabled={loading}
                    options={["1st Year", "2nd Year", "3rd Year", "Final Year"]}
                  />
                </div>
              </div>
            )}

            {role === "employer" && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                <div className="text-sm font-extrabold text-slate-900">Employer Details</div>
                <Field label="Company Name" value={companyName} setValue={setCompanyName} disabled={loading} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Employee ID" value={employeeId} setValue={setEmployeeId} disabled={loading} />
                  <SelectField
                    label="Industry Vertical"
                    value={industryVertical}
                    setValue={setIndustryVertical}
                    disabled={loading}
                    options={[
                      "Software / IT",
                      "Manufacturing",
                      "Healthcare",
                      "Finance",
                      "EdTech",
                      "Government",
                      "Other",
                    ]}
                  />
                </div>
              </div>
            )}

            {role === "faculty" && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                <div className="text-sm font-extrabold text-slate-900">Faculty Details</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Department" value={department} setValue={setDepartment} disabled={loading} />
                  <Field label="Designation" value={designation} setValue={setDesignation} disabled={loading} />
                </div>
              </div>
            )}

            {role === "institution" && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                <div className="text-sm font-extrabold text-slate-900">Institution Details</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Institution Code (AICTE)" value={institutionCode} setValue={setInstitutionCode} disabled={loading} />
                  <Field label="Officer Contact" value={officerContact} setValue={setOfficerContact} disabled={loading} placeholder="Email / Phone" />
                </div>
                <Field label="Institution Name" value={institutionName} setValue={setInstitutionName} disabled={loading} />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Link
                href="/auth/login"
                className="text-sm font-extrabold text-slate-600 hover:text-slate-900"
              >
                Already registered? Log in →
              </Link>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-extrabold hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-500"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                Create Account
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-xs text-slate-500 text-center">
          MVP Tip: If auth is not required for judging, use <span className="font-semibold">/demo</span> directly.
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  setValue,
  disabled,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="mt-2 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold placeholder:text-slate-400"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  setValue,
  disabled,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  disabled?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className="mt-2 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}