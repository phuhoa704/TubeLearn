import { cn } from "../../../lib/utils";
import type { Conversation, ConvType } from "../../../types/message";

function ConvTypeBadge({
  type,
  members,
}: {
  type: ConvType;
  members?: number;
}) {
  if (type === "course") {
    return (
      <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-warn-bg text-warn ml-1.5 shrink-0">
        강좌
      </span>
    );
  }
  if (type === "group") {
    return (
      <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-light text-primary ml-1.5 shrink-0">
        그룹{members ? ` ${members}` : ""}
      </span>
    );
  }
  return null;
}

interface ConvItemProps {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ConvItem = ({ conv, isActive, onClick }: ConvItemProps) => {
  const isGroup = conv.type === "group";
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3.5 py-3 cursor-pointer transition-all duration-150 border-b border-border-main last:border-b-0",
        isActive
          ? "bg-primary/8 border-l-[3px] border-l-primary"
          : "hover:bg-surface-alt border-l-[3px] border-l-transparent",
      )}
      onClick={onClick}
    >
      <div className="relative shrink-0">
        <div
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center text-xl leading-none",
            isGroup ? "bg-ok-bg border-2 border-ok/30" : "bg-surface-alt",
          )}
        >
          {conv.avatar}
        </div>
        {conv.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-ok rounded-full border-2 border-surface-main" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center mb-0.5">
          <span
            className={cn(
              "text-[13.5px] font-bold truncate",
              isActive ? "text-primary" : "text-text-main",
            )}
          >
            {conv.name}
          </span>
          <ConvTypeBadge type={conv.type} members={conv.members} />
        </div>
        <div className="text-[11px] text-text-sub font-medium mb-0.5 truncate">
          📚 {conv.course}
        </div>
        <div className="text-[12px] text-text-sub truncate">{conv.lastMsg}</div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0 ml-1">
        <span className="text-[11px] text-text-sub font-medium whitespace-nowrap">
          {conv.time}
        </span>
        {conv.unread > 0 && (
          <span className="min-w-4.5 h-4.5 px-1 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {conv.unread}
          </span>
        )}
      </div>
    </div>
  );
};
