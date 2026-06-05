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