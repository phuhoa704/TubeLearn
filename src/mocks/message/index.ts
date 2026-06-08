import type { Conversation, ChatMessage, Friend, Classmate } from "../../types/message";

export const INITIAL_CONVERSATIONS: Conversation[] = [
  { id: "c1", type: "course",   name: "김지훈 교수",         avatar: "👨‍🏫", course: "웹 개발 입문",        online: true,  unread: 2, lastMsg: "이번 주 과제 제출 관련해서 공지드립니다. 반드시...", time: "10분 전" },
  { id: "c2", type: "course",   name: "이서연 교수",         avatar: "👩‍🏫", course: "UX/UI 디자인 기초",   online: false, unread: 0, lastMsg: "포트폴리오 제출 기한이 연장되었습니다.",           time: "2시간 전" },
  { id: "c3", type: "personal", name: "박지민",              avatar: "🐱",   course: "웹 개발 입문",        online: true,  unread: 1, lastMsg: "과제 같이 해볼래? 내일 카페에서 만나자!",         time: "30분 전" },
  { id: "c4", type: "personal", name: "최유나",              avatar: "🦊",   course: "UX/UI 디자인 기초",   online: false, unread: 0, lastMsg: "고마워! 내일 봐~",                               time: "어제" },
  { id: "c5", type: "group",    name: "웹 개발 스터디 그룹", avatar: "👥",   course: "웹 개발 입문",        online: true,  unread: 5, lastMsg: "정현우: 다들 과제 어떻게 하고 있어?",            time: "5분 전",   members: 5 },
  { id: "c6", type: "personal", name: "이하늘",              avatar: "🧑‍🎨", course: "UX/UI 디자인 기초",   online: true,  unread: 0, lastMsg: "디자인 포트폴리오 같이 공유하자!",               time: "3일 전" },
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    { sender: "other", name: "김지훈 교수", avatar: "👨‍🏫", text: "안녕하세요! 이번 주 과제 제출 관련해서 중요한 공지가 있습니다.",                              time: "오전 10:10" },
    { sender: "other", name: "김지훈 교수", avatar: "👨‍🏫", text: "HTML/CSS 기초 과제를 이번 금요일 23:59까지 제출해주세요. 반드시 README 파일도 포함해야 합니다.", time: "오전 10:11" },
    { sender: "me",    name: "나",          avatar: "🐶",   text: "네 교수님, 감사합니다! 혹시 GitHub 링크로 제출해도 되나요?",                                    time: "오전 10:20" },
    { sender: "other", name: "김지훈 교수", avatar: "👨‍🏫", text: "네, GitHub 링크와 함께 PDF 파일도 같이 제출해주세요.",                                          time: "오전 10:22" },
  ],
  c3: [
    { sender: "other", name: "박지민", avatar: "🐱", text: "야 오늘 수업 들었어? 새로운 CSS Grid 내용 너무 어렵지 않아?", time: "오후 3:00" },
    { sender: "me",    name: "나",     avatar: "🐶", text: "맞아ㅠㅠ 특히 fr 단위 개념이 헷갈려",                       time: "오후 3:05" },
    { sender: "other", name: "박지민", avatar: "🐱", text: "과제 같이 해볼래? 내일 카페에서 만나자!",                   time: "오후 3:30" },
  ],
  c5: [
    { sender: "other", name: "정현우", avatar: "🧑‍💻", text: "다들 과제 어떻게 하고 있어?",          time: "오후 4:30" },
    { sender: "other", name: "김수빈", avatar: "🐱",   text: "나는 절반 정도 했어!",                 time: "오후 4:32" },
    { sender: "other", name: "이하늘", avatar: "🧑‍🎨", text: "나도 비슷해. CSS Grid 부분이 어렵네", time: "오후 4:33" },
    { sender: "me",    name: "나",     avatar: "🐶",   text: "나도 막혀있어ㅠ 오늘 스터디할까?",    time: "오후 4:35" },
    { sender: "other", name: "정현우", avatar: "🧑‍💻", text: "좋아! 7시에 디스코드 들어올게",        time: "오후 4:36" },
  ],
};

export const FRIENDS: Friend[] = [
  { id: "f1", name: "박지민", avatar: "🐱",   statusType: "on",   status: "온라인",  desc: "웹 개발 입문 같이 듣는 친구" },
  { id: "f2", name: "최유나", avatar: "🦊",   statusType: "busy", status: "수업 중", desc: "디자인 스터디 같이 하자" },
  { id: "f3", name: "김수빈", avatar: "😸",   statusType: "on",   status: "온라인",  desc: "같은 스터디 그룹" },
  { id: "f4", name: "이하늘", avatar: "🧑‍🎨", statusType: "on",   status: "온라인",  desc: "디자인 포트폴리오 공유" },
];

export const INITIAL_CLASSMATES: Classmate[] = [
  { id: "s1", name: "박지민", avatar: "🐱",   course: "웹 개발 입문",          online: true,  isFriend: true  },
  { id: "s2", name: "최유나", avatar: "🦊",   course: "UX/UI 디자인 기초",     online: false, isFriend: true  },
  { id: "s3", name: "정현우", avatar: "🧑‍💻", course: "웹 개발 입문",          online: true,  isFriend: false },
  { id: "s4", name: "김수빈", avatar: "😸",   course: "웹 개발 입문",          online: true,  isFriend: true  },
  { id: "s5", name: "이하늘", avatar: "🧑‍🎨", course: "웹 개발 입문",          online: true,  isFriend: true  },
  { id: "s6", name: "강민재", avatar: "😎",   course: "디지털 마케팅 전략",    online: false, isFriend: false },
  { id: "s7", name: "윤서아", avatar: "👩‍🎓", course: "데이터 분석과 시각화",  online: true,  isFriend: false },
];
