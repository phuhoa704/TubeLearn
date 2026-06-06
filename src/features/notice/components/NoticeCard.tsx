import React from "react";
import { cn } from "../../../lib/utils";
import type { Notice } from "../../../types/notice";

interface NoticeCardProps {
  notice: Notice;
  onClick: () => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  notice: n,
  onClick,
}) => {
  const preview = n.content ? n.content.split("\n")[0] : "";

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-surface-main border border-l-4 border-border-main rounded-r3 p-5 mb-3",
        "cursor-pointer hover:shadow-sh2 hover:-translate-y-0.5 transition-all duration-150",
        "animate-[fadeUp_.2s_ease]",
        n.important
          ? "border-l-primary"
          : n.isNew
            ? "border-l-primary"
            : "border-l-border-main",
      )}
    >
      <div className="flex items-center justify-between mb-2.5 gap-2.5 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {n.isNew && (
            <span className="text-[10.5px] font-extrabold bg-primary text-white px-2 py-0.5 rounded-full">
              NEW
            </span>
          )}
          {n.important && (
            <span className="text-[11px] font-bold bg-err-bg text-err px-2.5 py-0.5 rounded-full">
              ⚡ 중요
            </span>
          )}
          <span className="text-[12px] font-semibold text-primary flex items-center gap-1">
            {n.emoji} {n.course}
          </span>
        </div>
        <span className="text-xs text-[#435165] shrink-0">{n.date}</span>
      </div>

      <div className="text-lg font-bold text-text-main mb-2 leading-snug tracking-tight line-clamp-2">
        {n.title}
      </div>
      <div className="text-[15px] text-text-sub line-clamp-2 leading-relaxed">
        {preview}
      </div>
    </div>
  );
};
