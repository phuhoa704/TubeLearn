import { useNavigate } from "react-router-dom";
import { profMenus, studentMenus } from "../configs/sidebar";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store";
import { Role } from "../types/auth";
import { Button } from "./ui";
import { cn } from "../lib/utils";

interface Props {
  collapsed: boolean;
}

export const Sidebar: React.FC<Props> = ({ collapsed }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const menus = user && user.role === Role.STUDENT ? studentMenus : profMenus;
  return (
    <aside
      className={`bg-surface-main border-r border-border-main flex flex-col overflow-hidden transition-all duration-300 shrink-0 ${
        collapsed ? "w-15.5" : "w-55"
      }`}
    >
      <div className="h-16 flex items-center gap-2.5 px-3.5 border-b border-border-main shrink-0 overflow-hidden">
        <div className="w-8 h-8 bg-primary rounded-r1 flex items-center justify-center shrink-0 text-white font-extrabold shadow-sm transition-colors duration-200">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 2L12.5 8H18L13.5 11.5L15.5 18L10 14.5L4.5 18L6.5 11.5L2 8H7.5L10 2Z" />
          </svg>
        </div>
        {!collapsed && (
          <div className="whitespace-nowrap">
            <div className="text-base font-bold text-(--tx)">tubeLearn4U</div>
            <div className="text-(--tx3) text-xs">(주) intube</div>
          </div>
        )}
      </div>

      <div
        onClick={() => navigate("/todo")}
        className={`bg-primary rounded-r2 p-3 cursor-pointer shrink-0 overflow-hidden m-2 transition-all duration-300 hover:bg-primary-hover ${
          collapsed
            ? "mx-2 my-2.5 rounded-r1 p-2 flex items-center justify-center"
            : "mx-2.5 my-3"
        }`}
      >
        {collapsed ? (
          <div className="text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[12.5px] font-semibold text-white/80">
                오늘의 할 일
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                6개 남음
              </span>
            </div>
            <div className="text-xs font-bold text-white mb-2 truncate">
              데이터 구조 과제 3
            </div>
            <div className="text-[10px] text-white/70 flex items-center gap-1">
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                stroke="rgba(255,255,255,.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <rect x="2" y="3" width="12" height="11" rx="2" />
                <path d="M5 1v3M11 1v3M2 7h12" />
              </svg>
              2026-05-12
            </div>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-4 py-2 mt-1">
          MENU
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-1 scrollbar-none">
        <nav className="space-y-1">
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 py-2 px-3 mx-2 rounded-r2 text-sm font-medium transition-all relative whitespace-nowrap group ${
                  isActive
                    ? "bg-primary-light text-primary font-bold"
                    : "text-text-sub hover:bg-surface-alt"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-8.5 h-8.5 rounded-r1 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "bg-primary-accent text-primary"
                        : "text-inherit"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span
                      className={cn(
                        "flex-1 text-sm truncate font-semibold",
                        isActive && "font-bold",
                      )}
                    >
                      {item.label}
                    </span>
                  )}

                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold min-w-4.5 h-4.5 rounded-full flex items-center justify-center px-1.5 shrink-0 ${
                        item.badgeClass || "bg-surface-alt text-text-sub"
                      } ${collapsed ? "absolute top-1 right-1 min-w-3 h-3 text-[7px] px-0.5" : ""}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {collapsed && (
                    <div className="absolute left-17.5 bg-text-main text-surface-main text-xs font-bold py-1.5 px-3 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-2 border-t border-border-main shrink-0">
        <Button variant="ghost" className="w-full border-none">
          <div className="w-8 h-8 rounded-r1 flex items-center justify-center shrink-0 text-inherit">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="10" cy="10" r="3" />
              <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4" />
            </svg>
          </div>
          {!collapsed && (
            <span className="truncate flex-1 text-base font-semibold text-ellipsis text-center">
              설정
            </span>
          )}
        </Button>
      </div>
    </aside>
  );
};
