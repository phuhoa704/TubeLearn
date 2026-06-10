import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { Role } from "../types/auth";
import { cn } from "../lib/utils";
import { useAppContext } from "../context/AppContext";

export const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { toggleChat } = useAppContext();
  const currentPath = location.pathname;

  const isStudent = user?.role === Role.STUDENT;

  const handleTubeBotClick = () => {
    toggleChat();
  };

  const linkCls = (path: string) =>
    cn(
      "flex flex-col items-center justify-center gap-1 flex-1 h-full text-[10px] font-semibold transition-colors duration-150 cursor-pointer",
      currentPath === path
        ? "text-primary"
        : "text-text-muted hover:text-text-main",
    );

  if (isStudent) {
    return (
      <nav className="md:hidden h-16 bg-surface-main border-t border-border-main flex items-center justify-between px-2 shrink-0 z-20 relative transition-colors duration-200">
        <button
          onClick={() => navigate("/dashboard")}
          className={linkCls("/dashboard")}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span>학습분석</span>
        </button>

        <button
          onClick={() => navigate("/courses")}
          className={linkCls("/courses")}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 6h16a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
            <path d="M8 10h8M8 13h5M15 6V4M9 6V4" />
          </svg>
          <span>강의</span>
        </button>

        <div className="flex-1 flex flex-col items-center justify-center relative -top-3">
          <button
            onClick={handleTubeBotClick}
            className="w-15 h-15 rounded-full bg-[#6366f1] text-white flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform shrink-0"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="9" width="18" height="13" rx="4" />
              <path d="M8 9V6a4 4 0 018 0v3" />
              <circle cx="9.5" cy="15.5" r="1.2" fill="#fff" stroke="none" />
              <circle cx="14.5" cy="15.5" r="1.2" fill="#fff" stroke="none" />
            </svg>
            <span className="text-[8px] font-bold text-white">tubeBot</span>
          </button>
        </div>

        <button
          onClick={() => navigate("/todo")}
          className={cn(linkCls("/todo"), "relative")}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          <span>할 일</span>
          <span className="absolute top-0.5 right-4.5 bg-err text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-surface-main">
            6
          </span>
        </button>

        <button
          onClick={() => navigate("/message")}
          className={cn(linkCls("/message"), "relative")}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 4H3a1 1 0 00-1 1v12a1 1 0 001 1h6l3 3 3-3h6a1 1 0 001-1V5a1 1 0 00-1-1z" />
          </svg>
          <span>메시지</span>
          <span className="absolute top-0.5 right-4.5 bg-err text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-surface-main">
            3
          </span>
        </button>
      </nav>
    );
  }

  return (
    <nav className="md:hidden h-16 bg-surface-main border-t border-border-main flex items-center justify-between px-2 shrink-0 z-20 transition-colors duration-200">
      <button
        onClick={() => navigate("/dashboard")}
        className={linkCls("/dashboard")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        <span>대시보드</span>
      </button>

      <button
        onClick={() => navigate("/student")}
        className={cn(linkCls("/student"), "relative")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>수강생</span>
        <span className="absolute top-0.5 right-4.5 bg-err text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-surface-main">
          3
        </span>
      </button>

      <button
        onClick={() => navigate("/courses")}
        className={linkCls("/courses")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span>강의 관리</span>
      </button>

      <button
        onClick={() => navigate("/notice")}
        className={linkCls("/notice")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <span>공지사항</span>
      </button>

      <button
        onClick={() => navigate("/message")}
        className={linkCls("/message")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>메시지</span>
      </button>
    </nav>
  );
};
