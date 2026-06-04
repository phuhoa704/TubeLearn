export const studentMenus = [
  {
    path: "/dashboard",
    label: "학습분석",
    badgeClass: "bg-err text-white",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2L12.5 8H18L13.5 11.5L15.5 18L10 14.5L4.5 18L6.5 11.5L2 8H7.5L10 2Z" />
      </svg>
    ),
  },
  {
    path: "/competency",
    label: "강의",
    badgeClass: "bg-ok text-white",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h9a2 2 0 012 2v9a2 2 0 01-2 2H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
        <path d="M7 9h5M7 12h3M15 6V4a1 1 0 00-1-1H5" />
      </svg>
    ),
  },
  {
    path: "/todo",
    label: "할 일",
    badge: "6",
    badgeClass: "bg-err text-white",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="14" height="14" rx="3" />
        <path d="M7 10l2.5 2.5L13 8" />
      </svg>
    ),
  },
  {
    path: "/courses",
    label: "공지사항",
    badge: "3",
    badgeClass: "bg-err text-white",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2.5A5.5 5.5 0 004.5 8c0 4.5-2.5 5.5-2.5 5.5h16S15.5 12.5 15.5 8A5.5 5.5 0 0010 2.5z" />
        <path d="M11.7 17a2 2 0 01-3.4 0" />
      </svg>
    ),
  },
  {
    path: "/notice",
    label: "역량 진단",
    badge: "K",
    badgeClass: "bg-ok text-white",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="13" r="5" />
        <path d="M7.5 8.5L6 4h8l-1.5 4.5" />
        <circle cx="10" cy="13" r="2" />
      </svg>
    ),
  },
  {
    path: "/message",
    label: "메시지",
    badge: "3",
    badgeClass: "bg-err text-white",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="16" height="13" rx="2" />
        <path d="M2 7l8 5.5L18 7" />
      </svg>
    ),
  },
];

export const profMenus = [
  {
    path: "/dashboard",
    label: "대시보드",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    path: "/competency",
    label: "수강생 현황",
    badge: "3",
    badgeClass: "bg-err-bg text-err",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="6" r="3" />
        <path d="M1 18c0-3.3 2.7-6 6-6" />
        <circle cx="14" cy="6" r="3" />
        <path d="M19 18c0-3.3-2.7-6-6-6" />
        <path d="M9 12h2" />
      </svg>
    ),
  },
  {
    path: "/todo",
    label: "강의 관리",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h12a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
        <path d="M7 8h6M7 11h4" />
        <path d="M13 4V2M7 4V2" />
      </svg>
    ),
  },
  {
    path: "/courses",
    label: "공지사항",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        <path d="M2 7l8 5 8-5" />
      </svg>
    ),
  },
  {
    path: "/notice",
    label: "역량진단 결과",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2l1.8 5.5H17l-4.8 3.5 1.8 5.5L10 13 6 16.5l1.8-5.5L3 7.5h5.2L10 2z" />
      </svg>
    ),
  },
  {
    path: "/message",
    label: "메시지",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 3H2a1 1 0 00-1 1v10a1 1 0 001 1h5l3 3 3-3h5a1 1 0 001-1V4a1 1 0 00-1-1z" />
      </svg>
    ),
  },
];
