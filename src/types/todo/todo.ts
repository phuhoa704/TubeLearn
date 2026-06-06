export type Priority = "high" | "normal" | "low";

export type TaskType = "과제" | "퀴즈" | "강의" | "프로젝트" | "토론" | "발표";

export type FilterKey = "all" | "high" | "today" | "week" | "done";

export interface Task {
  id: number;
  n: string;
  course: string;
  emoji: string;
  type: TaskType;
  date: string;
  priority: Priority;
  done: boolean;
}

export interface TodoStats {
  total: number;
  urgent: number;
  ongoing: number;
  done: number;
}

export interface FilterTab {
  key: FilterKey;
  label: string;
}
