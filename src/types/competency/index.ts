export type CompState = "intro" | "test" | "result";

export interface Competency6 {
  id: string;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  color: string;
  desc: string;
  tags: string[];
}
export interface CompQuestion {
  id: number;
  compId: string;
  compName: string;
  text: string;
}

export type ScoreLevel = "High" | "Mid" | "Low";

export interface CompScore {
  compId: string;
  name: string;
  score: number;
  prev: number;
  avg: number;
  level: ScoreLevel;
  desc: string;
  subItems: { label: string; score: number }[];
}

export interface AiRec {
  compId: string;
  compName: string;
  title: string;
  type: string;
  seats: string;
}

export interface DiagHistory {
  date: string;
  type: string;
  score: number;
  rank: string;
  status: string;
}

export interface ProfCompDef {
  key: string;
  lbl: string;
  col: string;
}

export interface ProfTrendSeries {
  lbl: string;
  data: number[];
  col: string;
}

export interface ProfTrendData {
  labels: string[];
  series: ProfTrendSeries[];
}

export interface ProfCompStdData {
  scores: number[];
  prev: number[];
  target: number;
  trend: {
    month: ProfTrendData;
    week: ProfTrendData;
  };
  weakByComp: {
    compIdx: number;
    count: number;
    pct: number;
  }[];
}

export interface ProfCompDB {
  kcesa: ProfCompStdData;
  lms: ProfCompStdData;
}

export interface ProfCompWeakStudent {
  name: string;
  dept: string;
  course: string;
  kcesa: number[];
  lms: number[];
  risk: "danger" | "caution";
}

