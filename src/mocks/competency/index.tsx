import type {
  Competency6,
  CompQuestion,
  CompScore,
  AiRec,
  DiagHistory,
} from "../../types/competency";

import type {
  ProfCompDef,
  ProfCompDB,
  ProfCompWeakStudent,
} from "../../types/competency";

export const COMP6: Competency6[] = [
  {
    id: "self",
    name: "자기관리",
    shortName: "자기관리",
    color: "#3B82F6",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="7" r="4" />
        <path d="M3 18c0-3.9 3.1-7 7-7s7 3.1 7 7" />
        <path d="M14 4.5A4 4 0 0110 8" />
      </svg>
    ),
    desc: "목표를 세우고 감정을 조절하는 능력",
    tags: ["자기주도적학습", "계획수립·실행", "정서적자기조절", "직업의식"],
  },
  {
    id: "res",
    name: "자원·정보·기술",
    shortName: "자원·정보",
    color: "#10B981",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="14" height="14" rx="3" />
        <path d="M7 8h6M7 11h4M7 14h2" />
      </svg>
    ),
    desc: "자원과 정보를 수집·분석하여 활용하는 능력",
    tags: ["자원 수집·분析·활용", "정보 수집·분析·활용", "기술 수집·분析·활용"],
  },
  {
    id: "comm",
    name: "의사소통",
    shortName: "의사소통",
    color: "#F97316",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 4h14a1 1 0 011 1v7a1 1 0 01-1 1H8l-4 3V5a1 1 0 011-1z" />
      </svg>
    ),
    desc: "다양한 방식으로 생각을 표현·소통하는 능력",
    tags: ["듣기", "토론과 조정", "쓰기", "말하기"],
  },
  {
    id: "rel",
    name: "대인관계",
    shortName: "대인관계",
    color: "#8B5CF6",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="7" cy="7" r="3" />
        <circle cx="13" cy="7" r="3" />
        <path d="M1 17c0-3.3 2.7-6 6-6" />
        <path d="M13 11c3.3 0 6 2.7 6 6" />
        <path d="M9 17c0-2.2.9-4.2 2.5-5.5" />
      </svg>
    ),
    desc: "타인과 관계를 형성하고 협력하는 능력",
    tags: ["정서적 유대", "협력", "중재", "리더십"],
  },
  {
    id: "glob",
    name: "글로벌",
    shortName: "글로벌",
    color: "#EC4899",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="8" />
        <path d="M2 10h16M10 2a13 13 0 010 16M10 2a13 13 0 000 16" />
      </svg>
    ),
    desc: "세계시민으로서 다양성을 이해하는 능력",
    tags: ["유연성과 적극성", "다문화 이해·수용", "글로벌 경제 이해"],
  },
  {
    id: "think",
    name: "종합적사고력",
    shortName: "종합적사고",
    color: "#F59E0B",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="9" r="5" />
        <path d="M8 7.5a2.5 2.5 0 013 2.5" />
        <path d="M10 14v3M8 17h4" />
      </svg>
    ),
    desc: "다각도로 분석하고 창의적으로 해결하는 능력",
    tags: ["평가적 사고력", "대안적 사고력", "추론적 사고력", "분석적 사고력"],
  },
];

export const COMP_QUESTIONS: CompQuestion[] = [
  {
    id: 1,
    compId: "self",
    compName: "자기관리",
    text: "나는 목표를 세우고 그 목표를 달성하기 위한 구체적인 계획을 수립하여 실천한다.",
  },
  {
    id: 2,
    compId: "self",
    compName: "자기관리",
    text: "어려운 상황에서도 포기하지 않고 지속적으로 노력하여 목표를 달성한다.",
  },
  {
    id: 3,
    compId: "self",
    compName: "자기관리",
    text: "나는 나의 감정과 스트레스를 효과적으로 관리하며 학업에 집중한다.",
  },
  {
    id: 4,
    compId: "res",
    compName: "자원·정보·기술",
    text: "나는 필요한 정보를 다양한 경로에서 효과적으로 수집하고 분석하여 활용한다.",
  },
  {
    id: 5,
    compId: "res",
    compName: "자원·정보·기술",
    text: "나는 다양한 디지털 기술 도구를 익혀 학습과 과제에 활용한다.",
  },
  {
    id: 6,
    compId: "res",
    compName: "자원·정보·기술",
    text: "시간, 예산 등 주어진 자원을 효율적으로 계획하고 관리할 수 있다.",
  },
  {
    id: 7,
    compId: "comm",
    compName: "의사소통",
    text: "나는 상대방의 말을 주의 깊게 듣고 핵심 내용을 정확히 파악한다.",
  },
  {
    id: 8,
    compId: "comm",
    compName: "의사소통",
    text: "나의 생각과 의견을 글로 논리적이고 명확하게 표현할 수 있다.",
  },
  {
    id: 9,
    compId: "comm",
    compName: "의사소통",
    text: "여러 사람 앞에서 자신 있게 발표하고 설득력 있게 말할 수 있다.",
  },
  {
    id: 10,
    compId: "rel",
    compName: "대인관계",
    text: "나는 주변 사람들과 신뢰감 있는 관계를 형성하고 유지한다.",
  },
  {
    id: 11,
    compId: "rel",
    compName: "대인관계",
    text: "팀 프로젝트에서 역할을 분담하고 구성원과 효과적으로 협력한다.",
  },
  {
    id: 12,
    compId: "rel",
    compName: "대인관계",
    text: "갈등 상황에서 중립적 입장에서 의견을 조율하고 해결책을 찾는다.",
  },
  {
    id: 13,
    compId: "glob",
    compName: "글로벌",
    text: "다른 나라의 문화와 가치관에 대해 개방적인 태도로 이해하고 수용한다.",
  },
  {
    id: 14,
    compId: "glob",
    compName: "글로벌",
    text: "외국어를 활용하여 기본적인 의사소통이 가능하다.",
  },
  {
    id: 15,
    compId: "glob",
    compName: "글로벌",
    text: "글로벌 경제 변화와 국제 사회 동향에 관심을 갖고 이해한다.",
  },
  {
    id: 16,
    compId: "think",
    compName: "종합적사고력",
    text: "나는 복잡한 문제를 여러 관점에서 체계적으로 분석하고 평가한다.",
  },
  {
    id: 17,
    compId: "think",
    compName: "종합적사고력",
    text: "기존의 방법에 얽매이지 않고 창의적인 대안을 제시할 수 있다.",
  },
  {
    id: 18,
    compId: "think",
    compName: "종합적사고력",
    text: "주어진 정보에 대해 논리적 근거를 바탕으로 추론하고 판단한다.",
  },
];

export const INITIAL_SCORES: CompScore[] = [
  {
    compId: "self",
    name: "자기관리",
    score: 78,
    prev: 73,
    avg: 72,
    level: "Mid",
    desc: "자율적인 목표 수립 능력이 양호하며, 계획 수립·실행력을 더 강화하면 좋겠습니다.",
    subItems: [
      { label: "자기주도학습", score: 82 },
      { label: "계획수립·실행", score: 75 },
      { label: "정서적조절", score: 78 },
      { label: "직업의식", score: 77 },
    ],
  },
  {
    compId: "res",
    name: "자원·정보·기술",
    score: 85,
    prev: 80,
    avg: 68,
    level: "High",
    desc: "자원·정보 수집 및 기술 활용 능력이 매우 우수합니다. 동기 평균을 크게 앞서고 있습니다.",
    subItems: [
      { label: "자원 활용", score: 88 },
      { label: "정보 활용", score: 86 },
      { label: "기술 활용", score: 81 },
    ],
  },
  {
    compId: "comm",
    name: "의사소통",
    score: 72,
    prev: 68,
    avg: 70,
    level: "Mid",
    desc: "소통 능력이 평균 수준이나, 쓰기·토론 영역을 집중 훈련하면 더 성장할 수 있습니다.",
    subItems: [
      { label: "듣기", score: 78 },
      { label: "토론·조정", score: 70 },
      { label: "쓰기", score: 68 },
      { label: "말하기", score: 70 },
    ],
  },
  {
    compId: "rel",
    name: "대인관계",
    score: 68,
    prev: 62,
    avg: 65,
    level: "Mid",
    desc: "팀워크와 협업 능력이 양호하며, 갈등 중재와 리더십 역량을 더 키워나가면 좋겠습니다.",
    subItems: [
      { label: "정서적유대", score: 72 },
      { label: "협력", score: 70 },
      { label: "중재", score: 62 },
      { label: "리더십", score: 65 },
    ],
  },
  {
    compId: "glob",
    name: "글로벌",
    score: 62,
    prev: 55,
    avg: 58,
    level: "Low",
    desc: "외국어 활용 및 글로벌 지식이 상대적으로 부족합니다. 관련 교과 수강 또는 해외 체험을 권장합니다.",
    subItems: [
      { label: "유연성·적극성", score: 66 },
      { label: "다문화이해", score: 64 },
      { label: "글로벌지식", score: 56 },
    ],
  },
  {
    compId: "think",
    name: "종합적사고력",
    score: 80,
    prev: 76,
    avg: 74,
    level: "High",
    desc: "다각도 분석 및 창의적 문제 해결 능력이 뛰어납니다. 동기 평균보다 높은 수준을 유지하세요.",
    subItems: [
      { label: "평가적사고", score: 82 },
      { label: "대안적사고", score: 80 },
      { label: "추론적사고", score: 78 },
      { label: "분析적사고", score: 80 },
    ],
  },
];

export const AI_RECS: AiRec[] = [
  {
    compId: "glob",
    compName: "글로벌 역량 보완",
    title: "글로벌 비즈니스 영어 이메일",
    type: "온라인",
    seats: "정원 150명 · 선착순",
  },
  {
    compId: "rel",
    compName: "대인관계 역량 보완",
    title: "비즈니스 프레젠테이션 스피치",
    type: "오프라인",
    seats: "정원 30명 · 선착순",
  },
  {
    compId: "self",
    compName: "자기관리 역량 심화",
    title: "스타트업 성공 창업 전략 실무",
    type: "온라인",
    seats: "정원 100명 · 선착순",
  },
];

export const DIAG_HISTORY: DiagHistory[] = [
  {
    date: "2026.03.02",
    type: "신입생 진단",
    score: 68,
    rank: "상위 34%",
    status: "진단 완료",
  },
  {
    date: "2026.06.01",
    type: "1학기 종합 진단",
    score: 79,
    rank: "상위 23%",
    status: "진단 완료",
  },
];

export const GUIDE_CARDS = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="14" height="14" rx="3" />
        <path d="M7 10l2.5 2.5L13 8" />
      </svg>
    ),
    title: "5점 척도 평가",
    desc: "각 문항에 1~5점으로 응답합니다",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l2.5 2.5" />
      </svg>
    ),
    title: "약 15분 소요",
    desc: "총 18문항, 중간 저장 가능합니다",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="2" width="12" height="16" rx="2" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </svg>
    ),
    title: "개인정보 보호",
    desc: "결과는 본인에게만 공개됩니다",
  },
];

/* Prof */
export const PROF_KCESA: ProfCompDef[] = [
  { key: "global", lbl: "글로벌역량", col: "#6366f1" },
  { key: "comm", lbl: "의사소통", col: "#f59e0b" },
  { key: "think", lbl: "종합적사고", col: "#10b981" },
  { key: "create", lbl: "창의융합", col: "#3b82f6" },
  { key: "resource", lbl: "자원활용", col: "#ef4444" },
  { key: "relation", lbl: "대인관계", col: "#8b5cf6" },
];

export const PROF_LMS_COMP: ProfCompDef[] = [
  { key: "engage", lbl: "강의참여도", col: "#06b6d4" },
  { key: "assign", lbl: "과제수행력", col: "#84cc16" },
  { key: "self", lbl: "자기주도학습", col: "#f97316" },
  { key: "collab", lbl: "협업능력", col: "#ec4899" },
];

export const PROF_COMP_DB: ProfCompDB = {
  kcesa: {
    scores: [62, 58, 71, 65, 54, 68],
    prev: [55, 52, 64, 58, 48, 61],
    target: 70,
    trend: {
      month: {
        labels: ["3월", "4월", "5월 초", "5월 중"],
        series: [
          { lbl: "글로벌역량", data: [48, 53, 58, 62], col: "#6366f1" },
          { lbl: "의사소통", data: [44, 49, 54, 58], col: "#f59e0b" },
          { lbl: "종합적사고", data: [56, 61, 67, 71], col: "#10b981" },
          { lbl: "창의융합", data: [50, 55, 61, 65], col: "#3b82f6" },
          { lbl: "자원활용", data: [40, 45, 50, 54], col: "#ef4444" },
          { lbl: "대인관계", data: [54, 59, 64, 68], col: "#8b5cf6" },
        ],
      },
      week: {
        labels: ["5/1", "5/5", "5/8", "5/12", "5/14"],
        series: [
          { lbl: "글로벌역량", data: [57, 59, 60, 61, 62], col: "#6366f1" },
          { lbl: "의사소통", data: [54, 55, 56, 57, 58], col: "#f59e0b" },
          { lbl: "종합적사고", data: [67, 68, 69, 70, 71], col: "#10b981" },
          { lbl: "창의융합", data: [62, 63, 64, 64, 65], col: "#3b82f6" },
          { lbl: "자원활용", data: [50, 51, 52, 53, 54], col: "#ef4444" },
          { lbl: "대인관계", data: [64, 65, 66, 67, 68], col: "#8b5cf6" },
        ],
      },
    },
    weakByComp: [
      { compIdx: 0, count: 18, pct: 20 },
      { compIdx: 1, count: 24, pct: 27 },
      { compIdx: 2, count: 9, pct: 10 },
      { compIdx: 3, count: 15, pct: 17 },
      { compIdx: 4, count: 31, pct: 35 },
      { compIdx: 5, count: 11, pct: 12 },
    ],
  },
  lms: {
    scores: [74, 68, 61, 72],
    prev: [68, 61, 54, 65],
    target: 75,
    trend: {
      month: {
        labels: ["3월", "4월", "5월 초", "5월 중"],
        series: [
          { lbl: "강의참여도", data: [63, 67, 71, 74], col: "#06b6d4" },
          { lbl: "과제수행력", data: [55, 59, 64, 68], col: "#84cc16" },
          { lbl: "자기주도학습", data: [48, 53, 57, 61], col: "#f97316" },
          { lbl: "협업능력", data: [60, 64, 68, 72], col: "#ec4899" },
        ],
      },
      week: {
        labels: ["5/1", "5/5", "5/8", "5/12", "5/14"],
        series: [
          { lbl: "강의참여도", data: [71, 72, 73, 73, 74], col: "#06b6d4" },
          { lbl: "과제수행력", data: [65, 66, 67, 67, 68], col: "#84cc16" },
          { lbl: "자기주도학습", data: [58, 59, 60, 60, 61], col: "#f97316" },
          { lbl: "협업능력", data: [69, 70, 71, 71, 72], col: "#ec4899" },
        ],
      },
    },
    weakByComp: [
      { compIdx: 0, count: 8, pct: 9 },
      { compIdx: 1, count: 19, pct: 21 },
      { compIdx: 2, count: 27, pct: 30 },
      { compIdx: 3, count: 10, pct: 11 },
    ],
  },
};

export const PROF_COMP_WEAK_STUDENTS: ProfCompWeakStudent[] = [
  {
    name: "김민준",
    dept: "컴퓨터공학과",
    course: "웹 개발 입문",
    kcesa: [38, 42, 61, 55, 34, 59],
    lms: [52, 44, 38, 61],
    risk: "danger",
  },
  {
    name: "이수빈",
    dept: "소프트웨어학과",
    course: "데이터 분석과 시각화",
    kcesa: [44, 48, 65, 50, 51, 62],
    lms: [61, 55, 42, 58],
    risk: "danger",
  },
  {
    name: "박서연",
    dept: "컴퓨터공학과",
    course: "Python 기초부터 실전까지",
    kcesa: [51, 45, 54, 61, 52, 64],
    lms: [68, 60, 49, 55],
    risk: "caution",
  },
  {
    name: "최민준",
    dept: "전자공학과",
    course: "웹 개발 입문",
    kcesa: [55, 52, 68, 62, 48, 70],
    lms: [70, 53, 51, 62],
    risk: "caution",
  },
  {
    name: "정유나",
    dept: "데이터사이언스학과",
    course: "데이터 분석과 시각화",
    kcesa: [60, 54, 70, 49, 55, 47],
    lms: [72, 61, 54, 45],
    risk: "caution",
  },
  {
    name: "윤서준",
    dept: "컴퓨터공학과",
    course: "Python 기초부터 실전까지",
    kcesa: [41, 61, 69, 63, 57, 66],
    lms: [65, 58, 51, 60],
    risk: "caution",
  },
  {
    name: "강민호",
    dept: "정보통신학과",
    course: "웹 개발 입문",
    kcesa: [58, 49, 67, 60, 53, 65],
    lms: [69, 48, 55, 63],
    risk: "caution",
  },
];

export const COMP_MSG_TEMPLATES = {
  encourage: (student: ProfCompWeakStudent, weakLabels: string[]) =>
    `안녕하세요, ${student.name} 학생. 담당 교수입니다. 이번 학기 수업에 성실히 참여해 주셔서 감사합니다. 최근 분석된 학습 진단 결과에 따르면, 몇몇 역량(예: ${weakLabels.join(", ")}) 부분에서 조금 더 보완이 필요해 보입니다. 함께 노력하면 더 좋은 결과를 얻을 수 있을 것입니다. 필요한 부분이나 궁금한 점이 있다면 언제든 편하게 말씀해 주세요. 응원합니다!`,
  guide: (student: ProfCompWeakStudent, weakLabels: string[]) =>
    `안녕하세요, ${student.name} 학생. 담당 교수입니다. 우리 강좌의 역량 진단 결과를 토대로 학생이 강점을 더 키우고 취약한 역량(${weakLabels.join(", ")})을 향상시킬 수 있는 관련 비교과 프로그램이나 보충 학습 자료를 추천합니다. LMS 내의 추천 메뉴를 확인해 보시고, 역량 향상을 위해 한 걸음 더 나아가 보시길 권장합니다.`,
  consult: (student: ProfCompWeakStudent, weakLabels: string[]) =>
    `안녕하세요, ${student.name} 학생. 담당 교수입니다. 최근 학습 분석 및 역량 진단 결과(취약 역량: ${weakLabels.join(", ")})와 관련하여, 앞으로의 학습 방향에 대해 이야기를 나누고자 면담을 요청합니다. 편한 일정을 확인하신 후, 메신저나 이메일로 회신해 주시기 바랍니다.`,
  custom: () => "",
};
