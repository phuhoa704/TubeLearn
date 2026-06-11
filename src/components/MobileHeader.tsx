import { useState, useRef, useEffect } from "react";
import { useAppTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { themeSwatches } from "../mocks/theme";
import { Avatar, Button } from "./ui";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/slices/authSlice";

export const MobileHeader = () => {
  const { theme, mode, changeTheme, toggleMode } = useAppTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const themeRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const [themeOpen, setThemeOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        themeRef.current &&
        !themeRef.current.contains(event.target as Node)
      ) {
        setThemeOpen(false);
      }
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="md:hidden h-14 min-h-14 bg-surface-main border-b border-border-main flex items-center justify-start px-4 gap-2.5 shrink-0 z-20 transition-colors duration-200">
      <div className="relative" ref={themeRef}>
        <Button
          onClick={() => setThemeOpen(!themeOpen)}
          variant={themeOpen ? "outline" : "ghost"}
          className="w-9.5 h-9.5 rounded-r1 flex items-center justify-center text-text-sub hover:bg-surface-alt transition-colors p-0!"
          title="테마 색상"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <circle cx="10" cy="10" r="3" />
            <circle cx="10" cy="10" r="7.5" strokeDasharray="3 2" />
          </svg>
        </Button>

        {themeOpen && (
          <div className="absolute top-full left-0 mt-2 bg-surface-main border border-border-main rounded-r2 shadow-sh3 p-2.5 w-47.5 z-50 transition-all duration-150 animate-[fadeUp_0.15s_ease]">
            <div className="text-[10.5px] font-bold text-text-muted uppercase tracking-wider px-1 pb-2 border-b border-border-main mb-1.5">
              테마 색상
            </div>
            <div className="space-y-0.5">
              {themeSwatches.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    changeTheme(t.id);
                    setThemeOpen(false);
                  }}
                  className={`flex items-center gap-2.5 py-1.5 px-2 rounded-r1 text-xs font-semibold w-full text-left transition-colors duration-100 hover:bg-surface-alt ${
                    theme === t.id
                      ? "text-text-main font-bold"
                      : "text-text-sub"
                  }`}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-sm",
                      theme === t.id ? "border-black border-2" : "",
                    )}
                    style={{
                      backgroundColor: t.color,
                      transform: theme === t.id ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <span
                    className={cn("flex-1", theme === t.id ? "font-bold" : "")}
                  >
                    {t.label}
                  </span>
                  {theme === t.id && (
                    <svg
                      className="w-4 h-4 text-primary ml-auto shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={toggleMode}
        variant="ghost"
        className="w-9.5 h-9.5 rounded-full flex items-center justify-center text-text-sub hover:bg-surface-alt transition-colors p-0!"
        title={mode === "light" ? "다크 모드" : "라이트 모드"}
      >
        {mode === "light" ? (
          <svg
            width="17"
            height="17"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 13.5A7.5 7.5 0 016.5 3a9 9 0 100 14 7.5 7.5 0 0110.5-3.5z" />
          </svg>
        ) : (
          <svg
            width="17"
            height="17"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10" cy="10" r="4" />
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4" />
          </svg>
        )}
      </Button>

      <Button
        variant="ghost"
        className="w-9.5 h-9.5 rounded-full relative flex items-center justify-center text-text-sub hover:bg-surface-alt transition-colors p-0!"
        title="알림"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 2.5A5.5 5.5 0 004.5 8c0 4.5-2.5 5.5-2.5 5.5h16S15.5 12.5 15.5 8A5.5 5.5 0 0010 2.5z" />
          <path d="M11.7 17a2 2 0 01-3.4 0" />
        </svg>
        <div className="absolute top-1 right-1 w-4 h-4 bg-err rounded-full text-white font-extrabold text-[9px] flex items-center justify-center border border-surface-main">
          6
        </div>
      </Button>

      <div className="relative" ref={avatarRef}>
        <button
          onClick={() => setAvatarOpen(!avatarOpen)}
          className="flex items-center focus:outline-none cursor-pointer rounded-full"
        >
          <Avatar name={user?.username || "KH"} size="sm" />
        </button>

        {avatarOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-surface-main border border-border-main rounded-r2 shadow-sh3 py-1 z-50 transition-all duration-150 animate-[fadeUp_0.15s_ease]">
            {user && (
              <div className="px-4 py-2 border-b border-border-main">
                <p className="text-sm font-semibold text-text-main truncate">
                  {user.username}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                dispatch(logout());
                setAvatarOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-err hover:bg-surface-alt transition-colors duration-150 text-left font-medium cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
