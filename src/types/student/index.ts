export interface StudentCourse {
  id: number;
  name: string;
  code: string;
  professor: string;
  schedule: string;
  state: "danger" | "recover" | "normal";
  riskScore: number;
  participation: number;
  participationDelta: number;
  understanding: number;
  understandingDelta: number;
  signals?: string[];
  recover?: { badge: string; desc: string };
  strength?: string;
  weak?: string;
  lastUpdate?: string;
}