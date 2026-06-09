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

/* Prof */
export interface ProfStudentRiskCard {
  lbl: string;
  val: string;
  cls: string; // 'red', 'warn', 'normal', etc.
}

export interface ProfStudentStat {
  lbl: string;
  val: string;
  sub: string;
}

export interface ProfStudentProgress {
  name: string;
  pct: number;
  color: string;
}

export interface ProfStudentHistory {
  icon: "msg" | "call" | "auto" | string;
  title: string;
  meta: string;
}

export interface ProfStudentDetail {
  name: string;
  av: string; // Avatar initial
  id: string; // Student ID
  dept: string; // Department & Grade
  risk: number; // Risk value (e.g. 0.89)
  riskCards: ProfStudentRiskCard[];
  tags: string[];
  stats: ProfStudentStat[];
  progress: ProfStudentProgress[];
  history: ProfStudentHistory[];
}

export interface ProfCourseStudent {
  name: string;
  av: string;
  id: string;
  status: "danger" | "caution" | "normal";
  risk: number;
  join: number; // Participation rate %
  assign: string; // Assignments (e.g., '1/4')
  score: number;
  last: string; // Last active
}

export interface ProfCourseStatus {
  name: string;
  code: string;
  prof: string;
  total: number;
  danger: number;
  caution: number;
  normal: number;
  participationRate: number; // e.g. 74
  students: ProfCourseStudent[];
}

export interface StudentSignal {
  txt: string;
  cls: string;
}

export interface StudentEntry {
  id: string;
  name: string;
  studentId: string;
  dept: string;
  signals: StudentSignal[];
  erdi: number;
  trend: string;
  trendCls?: string;
  sla: string;
  slaCls?: string;
  lastSeen?: string;
  urgent?: boolean;
}

export interface FlowItem {
  col: string;
  txt: string;
}

export interface RecoverEntry {
  id: string;
  name: string;
  dept?: string;
  badge: string;
  badgeCls: string;
  desc: string;
  flow: FlowItem[];
}

export interface SummaryItem {
  title: string;
  desc: string;
  link?: string;
}

