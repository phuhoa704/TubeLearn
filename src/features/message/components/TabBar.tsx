import { cn } from "../../../lib/utils";
import type { MsgTab } from "../../../types/message";
import { INITIAL_CLASSMATES, FRIENDS } from "../../../mocks/message";

interface TabBarProps {
  activeTab: MsgTab;
  totalUnread: number;
  onTabChange: (tab: MsgTab) => void;
}

export const TabBar = ({
  activeTab,
  totalUnread,
  onTabChange,
}: TabBarProps) => {
  const tabCls = (tab: MsgTab) =>
    cn(
      "flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-[2px] transition-colors whitespace-nowrap cursor-pointer",
      activeTab === tab
        ? "border-primary text-primary"
        : "border-transparent text-text-muted hover:text-text-sub",
    );

  return (
    <div className="flex gap-0 border-b-2 border-border-main px-7 mt-3.5 shrink-0">
      <button
        className={tabCls("messages")}
        onClick={() => onTabChange("messages")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 3H2a1 1 0 00-1 1v7a1 1 0 001 1h4l3 3 3-3h2a1 1 0 001-1V4a1 1 0 00-1-1z" />
        </svg>
        메시지
        {totalUnread > 0 && (
          <span
            className={cn(
              "min-w-4.5 h-4.5 px-1 text-[10px] font-bold rounded-full flex items-center justify-center",
              activeTab === "messages"
                ? "bg-primary text-white"
                : "bg-border-alt text-text-sub",
            )}
          >
            {totalUnread}
          </span>
        )}
      </button>

      <button
        className={tabCls("classmates")}
        onClick={() => onTabChange("classmates")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="5" r="2.5" />
          <path d="M1 14c0-3 2.2-5 5-5" />
          <circle cx="11" cy="5" r="2.5" />
          <path d="M16 14c0-3-2.2-5-5-5" />
          <path d="M6 9h5" />
        </svg>
        같이 수강생
        <span
          className={cn(
            "min-w-4.5 h-4.5 px-1 text-[10px] font-bold rounded-full flex items-center justify-center",
            activeTab === "classmates"
              ? "bg-primary text-white"
              : "bg-border-alt text-text-sub",
          )}
        >
          {INITIAL_CLASSMATES.length}
        </span>
      </button>

      <button
        className={tabCls("friends")}
        onClick={() => onTabChange("friends")}
      >
        ⭐ 친구
        <span
          className={cn(
            "min-w-4.5 h-4.5 px-1 text-[10px] font-bold rounded-full flex items-center justify-center",
            activeTab === "friends"
              ? "bg-primary text-white"
              : "bg-border-alt text-text-sub",
          )}
        >
          {FRIENDS.length}
        </span>
      </button>
    </div>
  );
};
