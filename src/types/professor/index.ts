export interface StudentEntry {
  id: number;
  name: string;
  studentId: string;
  dept: string;
  signals: string[];
  erdi: number;
  trend: "↗" | "→" | "↘";
  sla?: string;
  lastSeen?: string;
  urgent?: boolean;
}

export interface RecoverEntry {
  id: number;
  name: string;
  dept: string;
  badge: string;
  desc: string;
  erdi_before: number;
  erdi_after: number;
  trend: string;
}