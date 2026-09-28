export type EvidenceStatus = "self" | "pending" | "verified" | "rejected";

export type PassportType = "skill" | "project" | "certificate";

export type Student = {
  id: string;
  name: string;
  education: string;
  year: string;
};

export type Assessment = {
  studentId: string;
  dimensions: Record<string, number>; // 0-100
  preferences: {
    indoorOutdoor: number; // -50..+50 (indoor->outdoor)
    individualTeam: number;
    theoryPractical: number;
    stableDynamic: number;
    employeeEntrepreneur: number;
    digitalPhysical: number;
  };
  topDomains: { domain: string; score: number; why: string[] }[];
  updatedAt: string;
};

export type PassportItem = {
  id: string;
  studentId: string;
  type: PassportType;
  title: string;
  skills: string[]; // for matching
  link?: string;
  status: EvidenceStatus;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string; // faculty name
  note?: string; // rejection note
};

export type Opportunity = {
  id: string;
  employer: string;
  title: string;
  description: string;
  skills: string[];
  createdAt: string;
};

export type DemoState = {
  students: Student[];
  currentStudentId: string;

  assessments: Record<string, Assessment | undefined>;
  passport: PassportItem[];
  opportunities: Opportunity[];

  selectedOpportunityId?: string;
};

export type DemoActions = {
  setCurrentStudent(id: string): void;

  saveAssessment(a: Assessment): void;

  addPassportItem(item: Omit<PassportItem, "id" | "createdAt">): void;
  updatePassportStatus(id: string, status: EvidenceStatus, opts?: { verifiedBy?: string; note?: string }): void;

  addOpportunity(op: Omit<Opportunity, "id" | "createdAt">): void;
  setSelectedOpportunity(id?: string): void;

  resetDemo(): void;
};