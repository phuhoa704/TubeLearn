// ── Message Feature Types ──────────────────────────────────────────────────────

export type ConvType = "course" | "personal" | "group";
export type FilterType = "all" | "course" | "personal" | "group";
export type MsgTab = "messages" | "classmates" | "friends";

export interface Conversation {
  id: string;
  type: ConvType;
  name: string;
  avatar: string;
  course: string;
  online: boolean;
  unread: number;
  lastMsg: string;
  time: string;
  members?: number;
}

export interface ChatMessage {
  sender: "me" | "other";
  name: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  statusType: "on" | "busy" | "off";
  status: string;
  desc: string;
}

export interface Classmate {
  id: string;
  name: string;
  avatar: string;
  course: string;
  online: boolean;
  isFriend: boolean;
}
