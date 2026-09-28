export type Roadmap = {
  domain: string;
  requiredSkills: string[];
  learning: { title: string; weeks: number }[];
  projects: { title: string; deliverable: string }[];
  internshipKeywords: string[];
};

const ROADMAPS: Record<string, Roadmap> = {
  "Technology & Computing": {
    domain: "Technology & Computing",
    requiredSkills: ["git", "api", "sql", "typescript", "react"],
    learning: [
      { title: "Git & Collaboration Basics", weeks: 1 },
      { title: "REST APIs + HTTP Fundamentals", weeks: 1 },
      { title: "SQL Foundations + Joins", weeks: 1 },
      { title: "TypeScript Essentials", weeks: 1 },
      { title: "React Components + State + Hooks", weeks: 2 },
    ],
    projects: [
      { title: "Internship Tracker", deliverable: "CRUD app + filters + auth UI (mock)" },
      { title: "Skill Passport Dashboard", deliverable: "Profile + evidence cards + status chips" },
      { title: "Job Skill Extractor", deliverable: "Paste JD → extract skills → match score" },
    ],
    internshipKeywords: ["react", "frontend", "typescript", "rest api", "sql", "intern"],
  },

  "Engineering & Manufacturing": {
    domain: "Engineering & Manufacturing",
    requiredSkills: ["troubleshooting", "organization", "teamwork", "practical_interest"],
    learning: [
      { title: "System Thinking & Root Cause Analysis", weeks: 1 },
      { title: "Safety SOPs + Documentation", weeks: 1 },
      { title: "Basics of Industrial Components", weeks: 2 },
      { title: "Hands-on Mini Labs / Simulations", weeks: 2 },
    ],
    projects: [
      { title: "Maintenance Checklist System", deliverable: "SOP checklist + issue log + reports" },
      { title: "Troubleshooting Guide", deliverable: "Flowcharts + fault trees + examples" },
    ],
    internshipKeywords: ["technician", "maintenance", "production", "quality", "trainee"],
  },

  "Skilled Trades & Vocational": {
    domain: "Skilled Trades & Vocational",
    requiredSkills: ["wiring", "electrical_safety", "troubleshooting"],
    learning: [
      { title: "Electrical Safety & Tools", weeks: 1 },
      { title: "Wiring Standards & Practices", weeks: 2 },
      { title: "Basic Fault Detection", weeks: 2 },
    ],
    projects: [
      { title: "Safety SOP Poster + Checklist", deliverable: "Printable SOP + checklist kit" },
      { title: "Workshop Logbook", deliverable: "Daily tasks + evidence photos (mock links)" },
    ],
    internshipKeywords: ["electrician", "technician", "apprentice", "field"],
  },
};

export function getRoadmap(domain: string): Roadmap {
  return (
    ROADMAPS[domain] || {
      domain,
      requiredSkills: ["git", "communication", "teamwork"],
      learning: [
        { title: "Basics of Communication & Documentation", weeks: 1 },
        { title: "Team Collaboration", weeks: 1 },
        { title: "Foundations of Tools (Git/Drive)", weeks: 1 },
      ],
      projects: [{ title: "Portfolio Starter", deliverable: "Resume + evidence links + 2 mini projects" }],
      internshipKeywords: ["intern", "trainee", "assistant"],
    }
  );
}