import type {
  Competency6,
  CompQuestion,
  CompScore,
  AiRec,
  DiagHistory,
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
