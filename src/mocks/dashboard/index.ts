import type { RecoverEntry, StudentEntry, SummaryItem } from "../../types/professor";
import type { StudentCourse } from "../../types/student";

export const STUDENT_COURSES: StudentCourse[] = [
  {
    id: 1, name: "선형대수", code: "LINALG-2026-1", professor: "박상우 교수", schedule: "화·목 09:00",
    state: "danger", riskScore: 0.62,
    participation: 52, participationDelta: -8,
    understanding: 61, understandingDelta: -6,
    signals: ["S03 과제 누적", "개념 오답"],
  },
  {
    id: 2, name: "미분적분학", code: "CALC-2026-1", professor: "김지원 교수", schedule: "월·수 11:00",
    state: "recover", riskScore: 0.31,
    participation: 78, participationDelta: 12,
    understanding: 73, understandingDelta: 0,
    recover: { badge: "R03", desc: "공백 종료 후 학습 재개" },
  },
  {
    id: 3, name: "데이터구조", code: "DS-2026-1", professor: "정언우 교수", schedule: "화·목 14:00",
    state: "normal", riskScore: 0.18,
    participation: 82, participationDelta: 3,
    understanding: 79, understandingDelta: 0,
    lastUpdate: "5/13 14:30",
  },
  {
    id: 4, name: "대학영어I", code: "ENG-2026-1", professor: "Sara Lee", schedule: "월·수·금 10:00",
    state: "normal", riskScore: 0.21,
    participation: 88, participationDelta: 1,
    understanding: 75, understandingDelta: 0,
    strength: "문법 영역 +5%p",
  },
  {
    id: 5, name: "컴퓨터과학개론", code: "CS-2026-1", professor: "신한별 교수", schedule: "화·목 16:00",
    state: "normal", riskScore: 0.24,
    participation: 76, participationDelta: 0,
    understanding: 71, understandingDelta: 0,
    weak: "알고리즘 약함",
  },
];

export const REC_ITEMS = [
  {
    id: 1, num: "①",
    title: "선형대수 — 고유값 단원 보충 영상",
    duration: "15분", priority: "우선순위 ①", badgeType: "priority" as const,
    desc: "같은 개념 문제에서 2회 오답이 있었어요. 이 영상은 핵심 개념을 8분에 다시 정리해 줍니다.",
    evidence: ["5/09 고유값 개념 문제 1회 오답", "5/11 고유값 개념 문제 2회 오답", "5/12 강의 영상 미시청 (고유값 단원)"],
    primaryBtn: "지금 시작", primaryToast: "선형대수 보충 영상을 시작합니다! 🎬",
    ghostBtn: "나중에", ghostToast: "나중에 목록에 추가했어요!",
  },
  {
    id: 2, num: "②",
    title: "미분적분학 — 다음 퀴즈 대비 연습 문제",
    duration: "30분", priority: "D-2", badgeType: "deadline" as const,
    desc: "다음 퀴즈가 5/15(목)입니다. 같은 단원의 8문제를 풀면 평균 정답률이 +18%p 올라갔던 또래 학생들 패턴이 있어요.",
    evidence: [],
    primaryBtn: "지금 시작", primaryToast: "미분적분학 연습 문제를 시작합니다! 📝",
    ghostBtn: "나중에", ghostToast: "나중에 목록에 추가했어요!",
  },
  {
    id: 3, num: "③",
    title: "학습법 특강 — 자기조절학습 (비교과)",
    duration: "2시간", priority: "BeCome", badgeType: "become" as const,
    desc: "과제 마감 직전 몰림 패턴이 관찰됐어요. 시간 관리·우선순위 설정에 도움될 거에요.",
    evidence: [],
    primaryBtn: "BeCome에서 신청", primaryToast: "BeCome 신청 페이지로 이동합니다! 🎓",
    ghostBtn: "관심 없음", ghostToast: "관심 없음으로 표시했어요.",
  },
];

export const DASH_STUDENTS: StudentEntry[] = [
  {
    id: "st-1",
    name: "김민준",
    studentId: "2023102045",
    dept: "1학년 · 컴퓨터공학",
    signals: [
      { txt: "S01 무학습 14일", cls: "red" },
      { txt: "S03 과제 누적 3건", cls: "red" },
      { txt: "S04 평가 미응시", cls: "yellow" },
    ],
    erdi: 0.91,
    trend: "↘ 하락",
    trendCls: "down",
    sla: "3h 24m",
    slaCls: "urgent",
    urgent: true,
  },
  {
    id: "st-2",
    name: "이수빈",
    studentId: "2023085012",
    dept: "1학년 · 소프트웨어",
    signals: [
      { txt: "S05 점수 급락", cls: "red" },
      { txt: "S07 자기효능 저하", cls: "blue" },
    ],
    erdi: 0.87,
    trend: "↘↘ 급락",
    trendCls: "fast-down",
    sla: "1h 12m",
    slaCls: "urgent",
    urgent: true,
  },
  {
    id: "st-3",
    name: "박서연",
    studentId: "2022011033",
    dept: "2학년 · 컴퓨터공학",
    signals: [
      { txt: "S03 과제 누적 4건", cls: "red" },
      { txt: "S08 마감 몰림", cls: "yellow" },
    ],
    erdi: 0.82,
    trend: "→ 정체",
    trendCls: "flat",
    sla: "14h 30m",
    slaCls: "warn",
    urgent: false,
  },
  {
    id: "st-4",
    name: "최민준",
    studentId: "2023056078",
    dept: "1학년 · 전자공학",
    signals: [
      { txt: "S02 학기초 적응 부진", cls: "yellow" },
      { txt: "S11 비교과 단절", cls: "gray" },
    ],
    erdi: 0.79,
    trend: "↘",
    trendCls: "down",
    sla: "21h 04m",
    slaCls: "ok",
    urgent: false,
  },
  {
    id: "st-5",
    name: "정유나",
    studentId: "2022099003",
    dept: "2학년 · 데이터사이언스",
    signals: [
      { txt: "S01 무학습 7일", cls: "red" },
      { txt: "S06 토론 미참여", cls: "gray" },
    ],
    erdi: 0.74,
    trend: "→ 정체",
    trendCls: "flat",
    sla: "2d 08h",
    slaCls: "ok",
    urgent: false,
  },
  {
    id: "st-6",
    name: "윤서준",
    studentId: "2023077022",
    dept: "1학년 · 컴퓨터공학",
    signals: [
      { txt: "S04 평가 미응시", cls: "yellow" },
    ],
    erdi: 0.71,
    trend: "↗ 개선",
    trendCls: "up",
    sla: "3d 12h",
    slaCls: "ok",
    urgent: false,
  },
  {
    id: "st-7",
    name: "강민호",
    studentId: "2023044017",
    dept: "1학년 · 정보통신",
    signals: [
      { txt: "S03 과제 누적 2건", cls: "red" },
      { txt: "S09 게시판 미참여", cls: "gray" },
    ],
    erdi: 0.68,
    trend: "↘ 하락",
    trendCls: "down",
    sla: "4d 00h",
    slaCls: "ok",
    urgent: false,
  },
  {
    id: "st-8",
    name: "임채원",
    studentId: "2021011088",
    dept: "3학년 · 소프트웨어",
    signals: [
      { txt: "S02 학기초 적응 부진", cls: "yellow" },
    ],
    erdi: 0.62,
    trend: "→ 정체",
    trendCls: "flat",
    sla: "5d 06h",
    slaCls: "ok",
    urgent: false,
  },
];

export const DASH_RECOVER: RecoverEntry[] = [
  {
    id: "rec-1",
    name: "박지성",
    badge: "R01 재시도·적용",
    badgeCls: "r1",
    desc: "4/14 quiz 실패 → 4/16 동일 문항 정답",
    flow: [
      { col: "#ef4444", txt: "실패" },
      { col: "var(--tx3)", txt: "보충 자료 열람" },
      { col: "#10b981", txt: "정답" },
    ],
  },
  {
    id: "rec-2",
    name: "이하늘",
    badge: "R03 공백 종료",
    badgeCls: "r3",
    desc: "4/4~4/17 무학습 14일 → 4/18 학습 재개",
    flow: [
      { col: "#ef4444", txt: "공백 14일" },
      { col: "#10b981", txt: "재개" },
    ],
  },
  {
    id: "rec-3",
    name: "한지수",
    badge: "R01 재시도·적용",
    badgeCls: "r1",
    desc: "4/15 과제 미제출 → 4/17 보완 제출 완료",
    flow: [
      { col: "#ef4444", txt: "미제출" },
      { col: "#10b981", txt: "보완 제출" },
    ],
  },
  {
    id: "rec-4",
    name: "오민준",
    badge: "R02 패턴 정상화",
    badgeCls: "r1",
    desc: "3주간 불규칙 학습 → 4/18 주 3회 정규 학습 정착",
    flow: [
      { col: "#f59e0b", txt: "불규칙" },
      { col: "#10b981", txt: "정규화" },
    ],
  },
];

export const DASH_GOOD: SummaryItem[] = [
  { title: "회복 사례 5건 (R01·R03·R04)", desc: "박지성 R01 재시도 성공 · 이하늘 R03 공백 종료 외 3건" },
  { title: "처리 마감(SLA) 준수율 92%", desc: "23건 중 21건 기한 내 응대 · 지난주 87% → 92% · 한림대 5학기 출석률 평균 92.3% 정합" },
  { title: "중간고사 응시율 96%", desc: "코호트 평균 91% 대비 우수 · 4명만 미응시" },
  { title: "고유값 단원 평균 정답률 +8%p", desc: "보충 영상 안내 후 동일 단원 재시험 정답률 향상" },
  { title: "학생 만족도 4.3/5", desc: "개입 메시지 받은 학생 12명 중 8명 응답" },
];

export const DASH_WARN: SummaryItem[] = [
  { title: "컴공 1학년 무학습 공백(S01) 신호 누적", desc: "코호트 평균 대비 2배 · 학과 단위 점검 권장", link: "또래 그룹 비교 →" },
  { title: "마감 몰림(S08) 신호 12명 → 18명", desc: "자기절제 학습 보강 비교과 안내 권장" },
  { title: "학사 14일 공백 학생 2명 신규", desc: "박지성, 이하늘 → 지도교수 면담 자동 제안 대기" },
  { title: "수시-학생부교과 전형 위험 학생 누적", desc: "코호트 표본이 작아 변동성이 큼 — 학과 단위 추가 점검 권장", link: "코호트 비교 →" },
];

export const TREND_WEEKS = ["4주차", "5주차", "6주차", "7주차", "8주차", "9주차", "10주차"];
export const TREND_RECOVER = [28, 33, 41, 47, 55, 62, 73];
export const TREND_SLA = [75, 78, 80, 82, 85, 90, 92];
