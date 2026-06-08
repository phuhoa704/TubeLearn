import { cn } from "../../../lib/utils";
import type { Friend } from "../../../types/message";

interface FriendsTabProps {
  friends: Friend[];
  onMessage: (name: string) => void;
  onAddFriend: () => void;
}

export function FriendsTab({
  friends,
  onMessage,
  onAddFriend,
}: FriendsTabProps) {
  const onlineCount = friends.filter((f) => f.statusType !== "off").length;
  const offlineCount = friends.length - onlineCount;

  const dotColor = (type: Friend["statusType"]) =>
    type === "on" ? "bg-ok" : type === "busy" ? "bg-warn" : "bg-text-muted";

  const statusColor = (type: Friend["statusType"]) =>
    type === "on"
      ? "text-ok"
      : type === "busy"
        ? "text-warn"
        : "text-text-muted";

  return (
    <div className="overflow-y-auto p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-bold text-text-main">
            내 친구 ({friends.length}명)
          </div>
          <div className="text-[12.5px] text-text-muted mt-0.5">
            온라인 {onlineCount}명 · 오프라인 {offlineCount}명
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-r2 text-[12.5px] font-semibold bg-surface-main border border-border-main text-text-sub hover:border-primary hover:text-primary transition-colors shadow-sh1"
          onClick={onAddFriend}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="M7 2v10M2 7h10" />
          </svg>
          친구 추가
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {friends.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-3.5 bg-surface-main border border-border-main rounded-r2 px-4 py-3.5 shadow-sh1 hover:bg-surface-alt transition-colors"
          >
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full bg-surface-alt flex items-center justify-center text-2xl">
                {f.avatar}
              </div>
              <div
                className={cn(
                  "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface-main",
                  dotColor(f.statusType),
                )}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[13.5px] font-bold text-text-main">
                  {f.name}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-semibold",
                    statusColor(f.statusType),
                  )}
                >
                  ● {f.status}
                </span>
              </div>
              <div className="text-[12px] text-text-muted truncate">
                {f.desc}
              </div>
            </div>

            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-r2 text-[12.5px] font-semibold border border-border-main text-text-sub hover:border-primary hover:text-primary transition-colors shrink-0"
              onClick={() => onMessage(f.name)}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2H1a1 1 0 00-1 1v7a1 1 0 001 1h4l3 3 3-3h2a1 1 0 001-1V3a1 1 0 00-1-1z" />
              </svg>
              메시지
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
