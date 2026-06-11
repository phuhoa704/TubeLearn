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
          <span>학습분석</span>
        </button>

        <button
          onClick={() => navigate("/courses")}
          className={linkCls("/courses")}
        >
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
          <span>강의</span>
        </button>

        <button
          onClick={() => navigate("/notice")}
          className={cn(linkCls("/notice"), "relative")}
        >
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
          <span>공지사항</span>
          <span className="absolute top-0.5 right-4.5 bg-err text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-surface-main">
            3
          </span>
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
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
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
          <span>할 일</span>
          <span className="absolute top-0.5 right-4.5 bg-err text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-surface-main">
            6
          </span>
        </button>

        <button
          onClick={() => navigate("/competency")}
          className={cn(linkCls("/competency"), "relative")}
        >
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
          <span>역량 진단</span>
          <span className="absolute top-0.5 right-4.5 bg-ok text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-surface-main">
            K
          </span>
        </button>

        <button
          onClick={() => navigate("/message")}
          className={cn(linkCls("/message"), "relative")}
        >
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
        <span>대시보드</span>
      </button>

      <button
        onClick={() => navigate("/student")}
        className={cn(linkCls("/student"), "relative")}
      >
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
        <span>수강생 현황</span>
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
        <span>강의 관리</span>
      </button>

      <button
        onClick={() => navigate("/notice")}
        className={linkCls("/notice")}
      >
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
        <span>공지사항</span>
      </button>

      <button
        onClick={() => navigate("/competency")}
        className={linkCls("/competency")}
      >
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
        <span>역량진단 결과</span>
      </button>

      <button
        onClick={() => navigate("/message")}
        className={linkCls("/message")}
      >
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
        <span>메시지</span>
      </button>
    </nav>
  );
};
