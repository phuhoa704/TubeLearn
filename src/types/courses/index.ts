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