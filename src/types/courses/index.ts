/* Student */
export interface CourseActivity {
  type: string;
  name: string;
  date: string;
}

export interface CourseData {
  id: string;
  n: string;
  code: string;
  prof: string;
  type: string;
  credit: number;
  activities: CourseActivity[];
}

export interface ReplyItem {
  author: string;
  date: string;
  txt: string;
}

export interface BoardItem {
  id?: number;
  course: string;
  emoji?: string;
  title: string;
  author: string;
  date: string;
  views: number;
  isNew?: boolean;
  important?: boolean;
  content: string;
  files?: string[];
  replies?: ReplyItem[];
}

/* Prof */
export interface ProfCourseEvent {
  title: string;
  badge: "grade" | "assign" | "quiz" | "class";
  dday: string; // e.g. "D-2", "D-1"
  cls: "red" | "warn" | "ok";
}

export interface ProfAssignedCourse {
  name: string;
  code: string;
  prof: string;
  schedule: string;
  total: number;
  danger: number;
  caution: number;
  normal: number;
  events: ProfCourseEvent[];
}

export interface ProfExtraCourse {
  id: string;
  title: string;
  cat: string; // e.g. "취업·창업", "SW·AI·테크", "기타"
  type: string; // "온라인" | "오프라인" | "블렌디드"
  desc: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  capacity: number;
  applied: number;
  status: "open" | "draft" | "closed";
  applyType: string;
  target: string;
  thumbnail?: string;
  files?: string[];
}
