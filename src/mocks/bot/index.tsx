export const BOT_INIT = [
  {
    type: "bot",
    text: "안녕하세요, 김학생님! 👋<br>오늘도 열심히 학습해봐요!",
  },
  {
    type: "reminder",
    title: "📚 학습 리마인더",
    items: [
      {
        icon: "🔴",
        label: "긴급 마감",
        text: "CSS Grid 퀴즈 — 오늘 23:59까지",
      },
      { icon: "🟡", label: "내일 마감", text: "데이터 시각화 과제 #3" },
      {
        icon: "🟢",
        label: "이번 주",
        text: "머신러닝 중간 프로젝트 주제 선정",
      },
    ],
  },
  {
    type: "stat",
    items: [
      { icon: "🔥", value: "14일", label: "학습 스트릭" },
      { icon: "⏱", value: "12.5h", label: "이번 주 학습" },
      { icon: "✅", value: "8/12", label: "과제 완료" },
    ],
  },
  {
    type: "bot",
    text: "마감이 임박한 과제가 있어요! 지금 바로 확인해볼까요? 😊",
  },
];

export const BOT_REMINDERS = [
  {
    type: "urgent",
    badge: "D-day",
    title: "CSS Grid 퀴즈 응시",
    sub: "웹 개발 입문 · 오늘 23:59까지",
    course: "웹 개발 입문",
  },
  {
    type: "warn",
    badge: "D-3",
    title: "HTML/CSS 기초 과제 제출",
    sub: "웹 개발 입문 · 5/17 23:59",
    course: "웹 개발 입문",
  },
  {
    type: "info",
    badge: "D-5",
    title: "Python 기초 퀴즈 응시",
    sub: "Python 기초 · 5/19 23:59",
    course: "Python 기초",
  },
];

export const BOT_FAQ = [
  {
    q: ["과제 제출", "제출 방법", "어떻게 제출"],
    a: "강의실 → 과제 메뉴 → 파일 첨부 → 제출 버튼을 누르면 완료돼요. PDF, DOC, HWP 파일이 가능해요.",
    src: "FAQ · 과제 제출 가이드",
  },
  {
    q: ["수료증", "수료 증명"],
    a: "수료 기준(진도율 80% 이상, 총점 60점 이상)을 충족하면 마이페이지 → 수료증 발급에서 바로 출력할 수 있어요.",
    src: "FAQ · 수료 안내",
  },
  {
    q: ["비밀번호", "로그인 안", "접속 안"],
    a: '로그인 페이지 하단 "비밀번호 찾기"를 클릭하시거나 등록된 이메일로 재설정 링크를 받을 수 있어요.',
    src: "FAQ · 계정 관리",
  },
  {
    q: ["진도율", "진도 안", "영상 봤는데"],
    a: "영상을 끝까지 시청해야 진도율에 반영돼요. 구간 건너뛰기를 하면 반영이 안 될 수 있어요. 새로고침 후 다시 확인해보세요.",
    src: "FAQ · 학습 진도",
  },
  {
    q: ["강의자료", "자료 다운"],
    a: "강의실 → 강의자료 탭에서 PDF/PPT를 다운로드할 수 있어요. 일부 자료는 교수자 설정에 따라 제한될 수 있어요.",
    src: "FAQ · 강의자료",
  },
  {
    q: ["모바일", "핸드폰", "스마트폰"],
    a: "모바일 브라우저에서도 학습 가능해요. Chrome을 권장하며, 일부 기능은 PC에서만 제공돼요.",
    src: "FAQ · 모바일 학습",
  },
  {
    q: ["배속", "속도", "자막"],
    a: "동영상 플레이어 우측 하단 설정 버튼에서 0.5x ~ 2.0x 배속과 자막 on/off를 설정할 수 있어요.",
    src: "FAQ · 동영상 플레이어",
  },
];

export const BOT_COURSES = [
  {
    required: true,
    badge: "마감 D-7",
    name: "개인정보보호 법정교육 2025",
    reason: "관리자 지정 필수 과정 · 1시간",
    icon: "ti-shield-lock",
  },
  {
    required: false,
    badge: "수강 이력 기반",
    name: "Python 데이터 분석 중급",
    reason: "웹 개발 입문 수료 후 추천 · 4.8점 · 127명",
    icon: "ti-brand-python",
  },
  {
    required: false,
    badge: "인기 과정",
    name: "UX/UI 디자인 기초",
    reason: "같은 학과 학습자 82%가 수강 중",
    icon: "ti-palette",
  },
];

export const BOT_QR = [
  {
    name: "학습진도 & 독려",
    val: "학습진도 & 독려",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12V4M6 12V2M10 12V6M14 12V9" />
      </svg>
    ),
  },
  {
    name: "성과 & 피드백",
    val: "성과 & 피드백",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 1l1.8 5.5H15l-4.8 3.5 1.8 5.5L8 12 4 15.5l1.8-5.5L1 6.5h5.2L8 1z" />
      </svg>
    ),
  },
  {
    name: "학습처리현황",
    val: "학습처리현황",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </svg>
    ),
  },
];
