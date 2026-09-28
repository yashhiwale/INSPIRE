import { DemoState } from "./types";

export const DEMO_STORAGE_KEY = "inspire_demo_v1";

export function seedState(): DemoState {
  const now = new Date().toISOString();

  return {
    students: [
      { id: "s1", name: "Aarav Sharma", education: "B.Tech (CSE)", year: "3rd Year" },
      { id: "s2", name: "Sara Khan", education: "Diploma (Electrical)", year: "Final Year" },
    ],
    currentStudentId: "s1",

    assessments: {
      s1: {
        studentId: "s1",
        dimensions: {
          analytical_thinking: 82,
          numerical_ability: 76,
          scientific_thinking: 70,
          spatial_mechanical: 55,
          problem_solving: 84,
          learning: 78,
          creativity: 62,
          design: 48,
          communication: 58,
          media: 42,
          social_interaction: 52,
          empathy: 46,
          leadership: 54,
          teamwork: 64,
          independence: 60,
          practical_interest: 58,
          technology_adoption: 86,
          organization: 50,
          entrepreneurship: 44,
          outdoor_activity: 30,
        },
        preferences: {
          indoorOutdoor: -25,
          individualTeam: 10,
          theoryPractical: 15,
          stableDynamic: 5,
          employeeEntrepreneur: -10,
          digitalPhysical: 30,
        },
        topDomains: [
          {
            domain: "Technology & Computing",
            score: 88,
            why: ["High analytical thinking", "Strong problem solving", "High technology adoption"],
          },
          {
            domain: "Engineering & Manufacturing",
            score: 67,
            why: ["Good numerical ability", "Problem solving orientation", "Interest in practical learning"],
          },
          {
            domain: "Business & Entrepreneurship",
            score: 52,
            why: ["Balanced communication/teamwork", "Moderate leadership", "Preference for dynamic work"],
          },
        ],
        updatedAt: now,
      },

      s2: {
        studentId: "s2",
        dimensions: {
          analytical_thinking: 58,
          numerical_ability: 60,
          scientific_thinking: 55,
          spatial_mechanical: 84,
          problem_solving: 66,
          learning: 62,
          creativity: 48,
          design: 52,
          communication: 50,
          media: 35,
          social_interaction: 48,
          empathy: 55,
          leadership: 52,
          teamwork: 60,
          independence: 58,
          practical_interest: 82,
          technology_adoption: 62,
          organization: 56,
          entrepreneurship: 42,
          outdoor_activity: 45,
        },
        preferences: {
          indoorOutdoor: 5,
          individualTeam: 0,
          theoryPractical: 35,
          stableDynamic: 0,
          employeeEntrepreneur: -5,
          digitalPhysical: 10,
        },
        topDomains: [
          {
            domain: "Skilled Trades & Vocational",
            score: 86,
            why: ["High spatial/mechanical", "Very strong practical interest", "Hands-on preference"],
          },
          {
            domain: "Engineering & Manufacturing",
            score: 74,
            why: ["Strong mechanical reasoning", "Good problem solving", "Practical learning orientation"],
          },
          {
            domain: "Renewable Energy & Environment",
            score: 55,
            why: ["Practical field orientation", "Stable + team preference", "Interest in systems work"],
          },
        ],
        updatedAt: now,
      },
    },

    passport: [
      {
        id: "p1",
        studentId: "s1",
        type: "skill",
        title: "React (Intermediate)",
        skills: ["react", "javascript", "frontend"],
        status: "verified",
        createdAt: now,
        verifiedAt: now,
        verifiedBy: "Faculty Reviewer",
      },
      {
        id: "p2",
        studentId: "s1",
        type: "skill",
        title: "SQL (Intermediate)",
        skills: ["sql", "database"],
        status: "pending",
        createdAt: now,
      },
      {
        id: "p3",
        studentId: "s1",
        type: "project",
        title: "Campus Event Manager (MERN)",
        skills: ["react", "node", "mongodb", "api", "git"],
        link: "https://github.com/demo/campus-events",
        status: "self",
        createdAt: now,
      },
      {
        id: "p4",
        studentId: "s2",
        type: "skill",
        title: "Basic Electrical Wiring",
        skills: ["wiring", "electrical_safety"],
        status: "verified",
        createdAt: now,
        verifiedAt: now,
        verifiedBy: "Faculty Reviewer",
      },
      {
        id: "p5",
        studentId: "s2",
        type: "certificate",
        title: "Industrial Safety Workshop",
        skills: ["electrical_safety"],
        status: "pending",
        createdAt: now,
      },
    ],

    opportunities: [
      {
        id: "o1",
        employer: "Emerald Tech Pvt Ltd",
        title: "Frontend Intern (React)",
        description: "React, REST APIs, Git, UI basics. Bonus: TypeScript.",
        skills: ["react", "git", "api", "typescript"],
        createdAt: now,
      },
      {
        id: "o2",
        employer: "SmartGrid Systems",
        title: "Electrical Technician Trainee",
        description: "Wiring, safety, basic troubleshooting. Field visits possible.",
        skills: ["wiring", "electrical_safety", "troubleshooting"],
        createdAt: now,
      },
    ],

    selectedOpportunityId: "o1",
  };
}