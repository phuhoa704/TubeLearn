import type { RecoverEntry, StudentEntry } from "../../types/professor";
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


export const STUDENTS_TODAY: StudentEntry[] = [
  { id: 1, name: "김민준", studentId: "2023102045", dept: "컴퓨터공학", signals: ["S01 무학습", "과제 누락 2건"], erdi: 0.82, trend: "↘", sla: "2시간 남음", urgent: true },
  { id: 2, name: "이서연", studentId: "2022085012", dept: "경영학과", signals: ["S02 집중 저하", "퀴즈 미응시"], erdi: 0.79, trend: "→", sla: "4시간 남음", urgent: true },
  { id: 3, name: "박지훈", studentId: "2024011033", dept: "컴퓨터공학", signals: ["S03 과제 누적"], erdi: 0.71, trend: "↘", sla: "오늘 23:59" },
  { id: 4, name: "최수아", studentId: "2023056078", dept: "전자공학", signals: ["S01 무학습 5일"], erdi: 0.68, trend: "→", sla: "오늘 23:59" },
  { id: 5, name: "김도윤", studentId: "2022099003", dept: "수학과", signals: ["퀴즈 오답 반복"], erdi: 0.65, trend: "→", sla: "오늘 18:00" },
  { id: 6, name: "오지은", studentId: "2024044017", dept: "물리학과", signals: ["영상 미시청 누적"], erdi: 0.62, trend: "↗", sla: "오늘 20:00" },
  { id: 7, name: "한승우", studentId: "2023077022", dept: "컴퓨터공학", signals: ["출석 불량", "S02"], erdi: 0.59, trend: "↘", sla: "오늘 23:00" },
  { id: 8, name: "장민서", studentId: "2022011088", dept: "전자공학", signals: ["S03 과제 누락 3건"], erdi: 0.57, trend: "→", sla: "오늘 23:59" },
];

export const STUDENTS_WEEK: StudentEntry[] = [
  { id: 9,  name: "정하은", studentId: "2022031044", dept: "수학과",       signals: ["S02 집중 저하"],        erdi: 0.65, trend: "→", sla: "D-1" },
  { id: 10, name: "윤도현", studentId: "2023088021", dept: "컴퓨터공학", signals: ["출석 불량 2건"],           erdi: 0.61, trend: "↘", sla: "D-2" },
  { id: 11, name: "강지민", studentId: "2024022011", dept: "물리학과",   signals: ["S03 과제 누적", "영상 미시청"], erdi: 0.58, trend: "→", sla: "D-3" },
  { id: 12, name: "남주현", studentId: "2023065044", dept: "경영학과",   signals: ["무학습 공백 3일"],         erdi: 0.55, trend: "→", sla: "D-2" },
  { id: 13, name: "백서아", studentId: "2024088032", dept: "컴퓨터공학", signals: ["퀴즈 응시율 ↓50%"],       erdi: 0.52, trend: "↗", sla: "D-3" },
];

export const STUDENTS_WATCH: StudentEntry[] = [
  { id: 14, name: "임채원", studentId: "2023044055", dept: "컴퓨터공학", signals: ["참여율 경계"],       erdi: 0.45, trend: "→", lastSeen: "어제 14:30" },
  { id: 15, name: "한소희", studentId: "2022077033", dept: "경영학과",   signals: ["퀴즈 정답률 ↓"],    erdi: 0.42, trend: "→", lastSeen: "2일 전" },
  { id: 16, name: "오준서", studentId: "2024033022", dept: "전자공학",   signals: ["출석 경계"],         erdi: 0.39, trend: "↗", lastSeen: "오늘 09:15" },
  { id: 17, name: "권나연", studentId: "2023021066", dept: "수학과",     signals: ["참여율 55% 추세"],   erdi: 0.44, trend: "→", lastSeen: "어제 09:00" },
  { id: 18, name: "신현우", studentId: "2022099077", dept: "물리학과",   signals: ["영상 시청 이상"],    erdi: 0.38, trend: "→", lastSeen: "오늘 11:00" },
];

export const STUDENTS_RECOVER: RecoverEntry[] = [
  { id: 19, name: "김수빈", dept: "컴퓨터공학", badge: "R03", desc: "5/01~5/06 무학습 공백 → 5/07 학습 재개",        erdi_before: 0.74, erdi_after: 0.31, trend: "↗ +43%p" },
  { id: 20, name: "이지원", dept: "수학과",     badge: "R01", desc: "퀴즈 오답 반복 → 보충 영상 후 정답률 회복",       erdi_before: 0.65, erdi_after: 0.28, trend: "↗ +37%p" },
  { id: 21, name: "박서준", dept: "물리학과",   badge: "R02", desc: "과제 누락 3건 → 5/10 일괄 제출 완료",            erdi_before: 0.71, erdi_after: 0.35, trend: "↗ +36%p" },
  { id: 22, name: "정민아", dept: "경영학과",   badge: "R03", desc: "무학습 공백 4일 → 학습 재개 후 참여율 정상화",    erdi_before: 0.68, erdi_after: 0.33, trend: "↗ +35%p" },
  { id: 23, name: "최예린", dept: "전자공학",   badge: "R01", desc: "영상 미시청 누적 → 연속 3일 학습으로 진도율 회복", erdi_before: 0.62, erdi_after: 0.29, trend: "↗ +33%p" },
];

export const SUMMARY_GOOD = [
  "회복률 73% · 지난주 대비 +12%p 개선",
  "SLA 처리 준수율 92% · 목표치 초과 달성",
  "자동 리마인드 발송 32건 · 응답률 67%",
  "Risk 학생 8명 중 5명 회복 전환",
  "BeCome 연계 비교과 신청률 +8%p",
];

export const SUMMARY_WARN = [
  "컴퓨터공학과 1학년 무학습(S01) 평균 2배 누적",
  "선형대수 수강생 참여율 5주 연속 하락",
  "퀴즈 응시율 62% · 목표 80% 미달",
  "과제 미제출 누적 학생 4명 D-day 임박",
];

export const TREND_DATA = [
  { week: "4주", recover: 55, sla: 78 },
  { week: "5주", recover: 60, sla: 81 },
  { week: "6주", recover: 65, sla: 85 },
  { week: "7주", recover: 70, sla: 89 },
  { week: "8주", recover: 73, sla: 92 },
];
