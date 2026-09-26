// Type Definitions for robust TypeScript support
export interface StudentProfile {
  id: string;
  name: string;
  domain: string;
  university: string;
  location: string;
  employabilityScore: number;
}

export interface Skill {
  id: number;
  name: string;
  status: "verified" | "pending" | "self-declared";
  issuer: string | null;
}

export interface GapAnalysis {
  skill: string;
  current: number;
  required: number;
  status: "met" | "gap" | "critical" | "surpassed";
}

// Simulated Network Latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// 1. STUDENT & PROFILE ENDPOINTS
// ==========================================

export async function getStudentProfile(userId: string = "1"): Promise<StudentProfile> {
  await delay(800); // Simulate network request
  return {
    id: userId,
    name: "Yash Hiwale",
    domain: "Full-Stack & AI Development",
    university: "Innovation Hub, Pune",
    location: "Pune, Maharashtra",
    employabilityScore: 92,
  };
}

export async function getSkillPassport(userId: string = "1"): Promise<Skill[]> {
  await delay(1000);
  return [
    { id: 1, name: "React.js / Next.js", status: "verified", issuer: "Meta Front-End Certificate" },
    { id: 2, name: "Machine Learning (Python)", status: "verified", issuer: "SIH Hackathon" },
    { id: 3, name: "Node.js Backend", status: "pending", issuer: "University Project Evaluation" },
    { id: 4, name: "Tailwind CSS", status: "self-declared", issuer: null },
    { id: 5, name: "Cloud Deployment (AWS)", status: "pending", issuer: "AWS Cloud Practitioner Exam" },
  ];
}

// ==========================================
// 2. ASSESSMENT & ML ENGINE ENDPOINTS
// ==========================================

export async function submitAssessment(answers: Record<string, string>): Promise<{ success: boolean; pathways: string[] }> {
  await delay(2500); // Simulating heavy ML processing time
  return {
    success: true,
    pathways: ["Full-Stack Developer", "Machine Learning Engineer", "Cloud Architect"]
  };
}

export async function getGapAnalysis(role: string): Promise<GapAnalysis[]> {
  await delay(1200);
  // In a real app, this would dynamically calculate based on the requested 'role'
  return [
    { skill: "React.js / Next.js", current: 90, required: 85, status: "surpassed" },
    { skill: "Node.js & Express", current: 60, required: 80, status: "gap" },
    { skill: "System Design", current: 30, required: 70, status: "critical" },
    { skill: "Cloud Deployment (AWS)", current: 45, required: 60, status: "gap" },
    { skill: "PostgreSQL / MongoDB", current: 75, required: 75, status: "met" },
  ];
}

// ==========================================
// 3. EMPLOYER & DISCOVERY ENDPOINTS
// ==========================================

export async function searchCandidates(query: string, roleFilter: string) {
  await delay(1500);
  // Mocking the NLP Talent Discovery Engine
  return [
    {
      id: "1",
      name: "Yash Hiwale",
      role: "Full-Stack Developer",
      location: "Pune, Maharashtra",
      matchScore: 92,
      status: "Actively Looking",
      skills: [
        { name: "React.js", verified: true },
        { name: "Node.js", verified: true }
      ]
    },
    {
      id: "2",
      name: "Priya Sharma",
      role: "Machine Learning Engineer",
      location: "Bangalore, Karnataka",
      matchScore: 85,
      status: "Open to Offers",
      skills: [
        { name: "Python", verified: true },
        { name: "TensorFlow", verified: true }
      ]
    }
  ];
}

// ==========================================
// 4. PLATFORM UTILITIES
// ==========================================

export async function submitContactForm(data: any): Promise<{ success: boolean; message: string }> {
  await delay(1000);
  console.log("Form submitted to mock backend:", data);
  return { success: true, message: "Message received successfully." };
}