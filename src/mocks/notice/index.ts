import type { Notice, FilterTab } from "../../types/notice";

export const NOTICES_MOCK: Notice[] = [
  {id:1, course:'웹 개발 입문', emoji:'💻', title:'5월 중간고사 일정 안내',
   author:'박민수 교수', date:'2026-04-22', views:198, isNew:true, important:true,
   content:'안녕하세요, 수강생 여러분. 5월 중간고사 일정을 안내드립니다.\n\n■ 일시: 2026년 5월 20일(수) 오후 2시~4시\n■ 장소: 공학관 302호\n■ 범위: 1~8주차 강의 내용 전체',
   files:['중간고사_안내.pdf'], replies:[]},
  {id:2, course:'UX/UI 디자인 기초', emoji:'🎨', title:'과제 제출 기한 연장',
   author:'최지원 교수', date:'2026-04-21', views:156, isNew:true, important:true,
   content:'많은 수강생 분들의 요청으로 이번 주 디자인 포트폴리오 과제 제출 기한이 48시간 연장되었습니다.\n\n새 마감일: 2026년 4월 25일(금) 자정까지',
   files:[], replies:[]},
  {id:3, course:'데이터 분석과 시각화', emoji:'📊', title:'특강 공지: 업계 전문가 초청 세미나',
   author:'정수진 교수', date:'2026-04-20', views:134, isNew:false, important:false,
   content:'다음 주 토요일에 업계 전문가를 초청하여 특강을 진행합니다.\n\n■ 주제: 실무에서의 데이터 분석\n■ 강사: 카카오 데이터 사이언티스트\n■ 일시: 4월 27일(토) 오후 2시',
   files:['특강_안내.pdf'], replies:[]},
  {id:4, course:'Python 기초부터 실전까지', emoji:'🐍', title:'주차별 학습 자료 업데이트',
   author:'이영희 교수', date:'2026-04-19', views:89, isNew:false, important:false,
   content:'3~5주차 학습 자료가 업데이트되었습니다.\n\n■ 3주차: 함수와 모듈\n■ 4주차: 파일 입출력\n■ 5주차: 예외 처리',
   files:['학습자료_3주차.pdf','학습자료_4주차.pdf'], replies:[]},
  {id:5, course:'머신러닝 기초', emoji:'🤖', title:'중간 프로젝트 주제 선정 안내',
   author:'이영희 교수', date:'2026-04-18', views:112, isNew:false, important:false,
   content:'중간 프로젝트 주제를 4월 22일까지 제출해 주세요.\n구글 폼 링크로 주제를 제출하시면 됩니다.',
   files:[], replies:[]},
  {id:6, course:'영어 커뮤니케이션', emoji:'🌐', title:'5월 발표 일정 변경 안내',
   author:'Sarah Kim', date:'2026-04-17', views:76, isNew:false, important:false,
   content:'Due to the university Sports Day on May 15th, the presentation schedule has changed.\n■ New: May 22nd (Thursday) 2:00 PM',
   files:[], replies:[]},
];

export const NOTICE_FILTER_TABS: FilterTab[] = [
  { key: "all", label: "전체" },
  { key: "unread", label: "안 읽음" },
  { key: "important", label: "중요" },
];

export const NOTICE_PER_PAGE = 5;
