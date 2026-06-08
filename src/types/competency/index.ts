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
