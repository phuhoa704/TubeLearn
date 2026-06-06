export type NoticeFilter = "all" | "unread" | "important";

export interface NoticeReply {
  author: string;
  date: string;
  txt: string;
}

export interface Notice {
  id: number;
  course: string;
  emoji: string;
  title: string;
  author: string;
  date: string;
  views: number;
  isNew?: boolean;
  important?: boolean;
  content: string;
  files?: string[];
  replies?: NoticeReply[];
}

export interface NoticeWriteForm {
  title: string;
  content: string;
  important: boolean;
  files: string[];
}

export interface FilterTab {
  key: NoticeFilter;
  label: string;
}
