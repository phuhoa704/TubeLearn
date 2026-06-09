import type { CourseData, BoardItem, ProfExtraCourse, ProfAssignedCourse } from "../../types/courses";
/* Student */
export const ALL_COURSES: Record<string, CourseData[]> = {
  "2026-1": [
    {
      id: "CS201", n: "데이터 구조와 알고리즘", code: "CS201", prof: "김철수", type: "교과", credit: 3,
      activities: [
        { type: "과제", name: "트리 자료구조 구현 과제", date: "2026-05-12" },
        { type: "퀴즈", name: "스택/큐 개념 퀴즈", date: "2026-05-09" },
      ],
    },
    {
      id: "AI101", n: "머신러닝 기초", code: "AI101", prof: "이영희", type: "교과", credit: 3,
      activities: [
        { type: "강의", name: "3주차: 선형회귀 심화", date: "2026-05-11" },
        { type: "과제", name: "회귀 모델 실습 과제", date: "2026-05-08" },
      ],
    },
    {
      id: "WEB202", n: "웹 프로그래밍", code: "WEB202", prof: "박민수", type: "교과", credit: 3,
      activities: [
        { type: "퀴즈", name: "CSS Grid 퀴즈", date: "2026-05-13" },
        { type: "과제", name: "반응형 레이아웃 과제", date: "2026-05-10" },
      ],
    },
    {
      id: "ENG101", n: "영어 커뮤니케이션", code: "ENG101", prof: "Sarah Kim", type: "교양", credit: 2,
      activities: [
        { type: "발표", name: "5월 Presentation 준비", date: "2026-05-12" },
      ],
    },
    {
      id: "DS301", n: "데이터 사이언스", code: "DS301", prof: "정수진", type: "교과", credit: 3,
      activities: [
        { type: "프로젝트", name: "데이터 분석 팀 프로젝트", date: "2026-05-11" },
        { type: "강의", name: "4주차: 데이터 전처리", date: "2026-05-07" },
      ],
    },
    {
      id: "UI201", n: "UI/UX 디자인 입문", code: "UI201", prof: "최지원", type: "교양", credit: 2,
      activities: [
        { type: "과제", name: "디자인 포트폴리오 제출", date: "2026-05-13" },
      ],
    },
    {
      id: "DB101", n: "데이터베이스 기초", code: "DB101", prof: "강동진", type: "교과", credit: 3,
      activities: [
        { type: "퀴즈", name: "SQL 기초 퀴즈", date: "2026-05-10" },
        { type: "강의", name: "3주차: JOIN 심화", date: "2026-05-08" },
      ],
    },
    {
      id: "NET201", n: "컴퓨터 네트워크", code: "NET201", prof: "윤서연", type: "교과", credit: 3,
      activities: [
        { type: "강의", name: "TCP/IP 프로토콜 강의", date: "2026-05-09" },
      ],
    },
    {
      id: "OS101", n: "운영체제 기초", code: "OS101", prof: "한지훈", type: "교과", credit: 3,
      activities: [
        { type: "과제", name: "프로세스 스케줄링 분석", date: "2026-05-12" },
        { type: "퀴즈", name: "메모리 관리 퀴즈", date: "2026-05-06" },
      ],
    },
    {
      id: "MATH", n: "공업수학", code: "MATH201", prof: "임채원", type: "교과", credit: 3,
      activities: [],
    },
    {
      id: "STAT", n: "통계학 개론", code: "STAT101", prof: "오혜린", type: "교양", credit: 2,
      activities: [
        { type: "강의", name: "2주차: 확률분포", date: "2026-05-07" },
      ],
    },
    {
      id: "SEC301", n: "정보보안 개론", code: "SEC301", prof: "백승호", type: "교과", credit: 3,
      activities: [
        { type: "토론", name: "사이버 보안 사례 토론", date: "2026-05-11" },
        { type: "강의", name: "암호화 알고리즘 강의", date: "2026-05-08" },
      ],
    },
  ],
  "2025-2": [
    {
      id: "JAVA", n: "자바 프로그래밍", code: "JAVA101", prof: "김철수", type: "교과", credit: 3,
      activities: [],
    },
    {
      id: "C101", n: "C언어 기초", code: "C101", prof: "이영희", type: "교과", credit: 3,
      activities: [],
    },
    {
      id: "ART", n: "디지털 포토그래피", code: "ART201", prof: "박민수", type: "교양", credit: 2,
      activities: [],
    },
    {
      id: "ALGO", n: "알고리즘 기초", code: "ALGO101", prof: "김철수", type: "교과", credit: 3,
      activities: [],
    },
    {
      id: "HCI", n: "인간컴퓨터상호작용", code: "HCI201", prof: "최지원", type: "교양", credit: 2,
      activities: [],
    },
    {
      id: "DB2", n: "고급 데이터베이스", code: "DB201", prof: "강동진", type: "교과", credit: 3,
      activities: [],
    },
    {
      id: "PROB", n: "확률과 통계", code: "STAT201", prof: "오혜린", type: "교과", credit: 3,
      activities: [],
    },
  ],
};


export const NOTICES_MOCK: BoardItem[] = [
  {
    id: 1, course: "웹 개발 입문", emoji: "💻", title: "5월 중간고사 일정 안내",
    author: "박민수 교수", date: "2026-04-22", views: 198, isNew: true, important: true,
    content: "안녕하세요, 수강생 여러분. 5월 중간고사 일정을 안내드립니다.\n\n■ 일시: 2026년 5월 20일(수) 오후 2시~4시\n■ 장소: 공학관 302호\n■ 범위: 1~8주차 강의 내용 전체",
    files: ["중간고사_안내.pdf"], replies: [],
  },
  {
    id: 2, course: "UX/UI 디자인 기초", emoji: "🎨", title: "과제 제출 기한 연장",
    author: "최지원 교수", date: "2026-04-21", views: 156, isNew: true, important: true,
    content: "많은 수강생 분들의 요청으로 이번 주 디자인 포트폴리오 과제 제출 기한이 48시간 연장되었습니다.\n\n새 마감일: 2026년 4월 25일(금) 자정까지",
    files: [], replies: [],
  },
  {
    id: 3, course: "데이터 분석과 시각화", emoji: "📊", title: "특강 공지: 업계 전문가 초청 세미나",
    author: "정수진 교수", date: "2026-04-20", views: 134, isNew: false, important: false,
    content: "다음 주 토요일에 업계 전문가를 초청하여 특강을 진행합니다.\n\n■ 주제: 실무에서의 데이터 분석\n■ 강사: 카카오 데이터 사이언티스트\n■ 일시: 4월 27일(토) 오후 2시",
    files: ["특강_안내.pdf"], replies: [],
  },
  {
    id: 4, course: "Python 기초부터 실전까지", emoji: "🐍", title: "주차별 학습 자료 업데이트",
    author: "이영희 교수", date: "2026-04-19", views: 89, isNew: false, important: false,
    content: "3~5주차 학습 자료가 업데이트되었습니다.\n\n■ 3주차: 함수와 모듈\n■ 4주차: 파일 입출력\n■ 5주차: 예외 처리",
    files: ["학습자료_3주차.pdf", "학습자료_4주차.pdf"], replies: [],
  },
  {
    id: 5, course: "머신러닝 기초", emoji: "🤖", title: "중간 프로젝트 주제 선정 안내",
    author: "이영희 교수", date: "2026-04-18", views: 112, isNew: false, important: false,
    content: "중간 프로젝트 주제를 4월 22일까지 제출해 주세요.\n구글 폼 링크로 주제를 제출하시면 됩니다.",
    files: [], replies: [],
  },
  {
    id: 6, course: "영어 커뮤니케이션", emoji: "🌐", title: "5월 발표 일정 변경 안내",
    author: "Sarah Kim", date: "2026-04-17", views: 76, isNew: false, important: false,
    content: "Due to the university Sports Day on May 15th, the presentation schedule has changed.\n■ New: May 22nd (Thursday) 2:00 PM",
    files: [], replies: [],
  },
];

export const QAS_MOCK: BoardItem[] = [
  {
    course: "데이터 구조와 알고리즘", title: "힙 정렬 시간복잡도 질문드립니다", author: "이준혁", date: "2026.05.11 22:10", views: 34, isNew: true,
    content: "안녕하세요 교수님!\n\n힙 정렬에서 heapify 과정의 시간복잡도가 왜 O(log n)인지 이해가 잘 안 됩니다.\n재귀 호출이 최대 트리 높이만큼 발생하기 때문에 O(log n)이 되는 건가요?\n그렇다면 전체 힙 생성은 O(n log n)이어야 할 것 같은데, O(n)이라고 하신 부분이 혼란스럽습니다.",
    files: [], replies: [{ author: "김철수 교수", date: "2026.05.12 09:40", txt: "좋은 질문입니다! 초기 힙 구성 시에는 리프 노드부터 시작하므로 수학적으로 합산하면 O(n)이 됩니다. 다음 수업에서 자세히 설명할게요." }],
  },
  {
    course: "머신러닝 기초", title: "Dropout과 L2 정규화 차이점 질문", author: "박소연", date: "2026.05.11 19:45", views: 52, isNew: true,
    content: "Dropout과 L2 정규화 모두 과적합을 방지한다고 하는데 어떤 경우에 어떤 방법을 사용하는 게 좋은가요? 직관적인 설명 부탁드립니다.",
    files: [], replies: [],
  },
  {
    course: "웹 프로그래밍", title: "React useEffect 무한루프 해결 방법", author: "최현우", date: "2026.05.10 15:30", views: 78, isNew: false,
    content: "useEffect 의존성 배열에 함수를 넣었더니 무한 루프가 발생합니다.\nuseCallback을 사용해야 하나요? 아니면 다른 방법이 있나요?",
    files: [], replies: [{ author: "박민수 교수", date: "2026.05.10 17:00", txt: "fetchData를 useCallback으로 메모이제이션하거나 useEffect 내부로 이동시키면 해결됩니다!" }],
  },
  {
    course: "데이터 사이언스", title: "groupby 이후 reset_index 관련 질문", author: "김도윤", date: "2026.05.09 21:00", views: 41, isNew: false,
    content: "df.groupby(\"category\").agg({\"value\":\"mean\"}) 실행 시 인덱스가 category 컬럼으로 변경됩니다.\nreset_index()와 as_index=False 옵션의 차이가 있나요?",
    files: [], replies: [],
  },
  {
    course: "UI/UX 디자인 입문", title: "와이어프레임 툴 Figma 외 가능한가요?", author: "이하은", date: "2026.05.08 14:20", views: 63, isNew: false,
    content: "과제에서 와이어프레임 제작 시 Figma 말고 Balsamiq나 draw.io 사용해도 괜찮을까요?\n제출은 PDF로 내면 되나요?",
    files: [], replies: [{ author: "최지원 교수", date: "2026.05.08 16:00", txt: "네, Balsamiq, Marvel, Adobe XD 모두 허용합니다. PDF 또는 PNG로 제출해주세요!" }],
  },
  {
    course: "컴퓨터과학개론", title: "재귀함수 스택오버플로우 원인이 뭔가요?", author: "정민서", date: "2026.05.07 10:22", views: 29, isNew: false,
    content: "재귀함수 호출 시 종료 조건이 누락되거나 너무 많이 호출되어 스택 메모리를 초과하는 스택오버플로우가 생기는데 해결책이 궁금합니다.",
    replies: [], files: []
  },
];

/* Prof */
export const PROF_COURSES_LIST_MOCK: ProfAssignedCourse[] = [
  {
    name: "웹 개발 입문",
    code: "WEB101",
    prof: "박민수 교수",
    schedule: "화·목 09:00",
    total: 42,
    danger: 2,
    caution: 4,
    normal: 36,
    events: [
      { title: "HTML/CSS 성적 입력 완료", badge: "grade", dday: "D-2", cls: "warn" },
      { title: "CSS Grid 평가 출제 마감", badge: "quiz", dday: "D-1", cls: "red" },
      { title: "4주차 출석 상태 점검", badge: "class", dday: "D-4", cls: "ok" },
    ],
  },
  {
    name: "데이터 분석과 시각화",
    code: "DS201",
    prof: "정수진 교수",
    schedule: "화·목 13:00",
    total: 38,
    danger: 1,
    caution: 3,
    normal: 34,
    events: [
      { title: "중간 성적 입력 제출 마감", badge: "grade", dday: "D-1", cls: "red" },
      { title: "실습형 평가 결과 업로드", badge: "quiz", dday: "D-4", cls: "ok" },
    ],
  },
  {
    name: "Python 기초부터 실전까지",
    code: "PY101",
    prof: "이영희 교수",
    schedule: "화·목 11:00",
    total: 47,
    danger: 0,
    caution: 1,
    normal: 46,
    events: [
      { title: "Python 3주차 과제 마감", badge: "assign", dday: "D-3", cls: "warn" },
    ],
  },
];

export const EXTRA_COURSES_MOCK: ProfExtraCourse[] = [
  {
    id: "ec1",
    title: "2026 취업 역량 강화 캠프",
    cat: "취업·창업",
    type: "블렌디드",
    desc: "취업률 극대화를 위한 이력서 클리닉, 모의 면접, 실전 코칭을 진행합니다.",
    start: "2026-05-20",
    end: "2026-06-10",
    capacity: 50,
    applied: 38,
    status: "open",
    applyType: "선착순 자동 승인",
    target: "전체 학년",
  },
  {
    id: "ec2",
    title: "AI를 활용한 코딩 입문",
    cat: "SW·AI·테크",
    type: "온라인",
    desc: "비전공자도 쉽게 배울 수 있는 Python 기초 및 ChatGPT 프롬프트 엔지니어링.",
    start: "2026-06-01",
    end: "2026-06-30",
    capacity: 30,
    applied: 12,
    status: "draft",
    applyType: "선착순 자동 승인",
    target: "1학년",
  },
];

export const EC_CAT_LABELS: Record<string, string> = {
  career: "취업·창업",
  leadership: "리더십·소통",
  sw: "SW·AI·테크",
  startup: "창업·인큐베이팅",
  global: "글로벌·외국어",
  wellness: "건강·상담",
  culture: "문화·예술",
  etc: "기타",
};

export const EC_STATUS_LABELS = {
  open: "모집 중",
  draft: "임시저장",
  closed: "모집 마감",
};
