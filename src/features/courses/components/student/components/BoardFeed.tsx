import React, { useState } from "react";
import type { BoardItem } from "../../../../../types/courses";

interface BoardFeedProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  items: BoardItem[];
  badge?: React.ReactNode;
  onItemClick: (index: number) => void;
}

const BOARD_PER = 5;

export const BoardFeed: React.FC<BoardFeedProps> = ({
  title,
  icon,
  iconBg,
  items,
  badge,
  onItemClick,
}) => {
  const [visibleCount, setVisibleCount] = useState(BOARD_PER);

  return (
    <div className="bg-surface-main border border-border-main rounded-r3 shadow-sh1 flex flex-col justify-between min-h-105 pb-3">
      <div>
        <header className="flex items-center justify-between gap-3 border-b border-border-main p-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-r1 flex items-center justify-center shrink-0 ${iconBg}`}
            >
              {icon}
            </div>
            <h3 className="text-[14px] font-extrabold text-text-main">
              {title}
            </h3>
          </div>
          {badge}
        </header>

        <div className="divide-y divide-border-main">
          {items.slice(0, visibleCount).map((item, idx) => (
            <div
              key={item.id ?? idx}
              onClick={() => onItemClick(idx)}
              className="py-3 flex items-start justify-between gap-4 cursor-pointer hover:bg-surface-alt/30 px-6 -mx-1.5 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[10.5px] inline-flex font-bold text-primary bg-primary-light py-1 px-2 rounded-sm mb-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.course}
                </div>
                <h4 className="text-[12.5px] font-bold text-text-main transition-colors truncate">
                  {item.title}
                </h4>
                <div className="text-[11px] text-text-muted font-medium flex items-center gap-1.5 mt-1">
                  <span>{item.author}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                  <span>·</span>
                  <span>조회 {item.views}</span>
                  {item.files && item.files.length > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-primary font-bold">
                        📎 {item.files.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-center">
                {item.isNew && (
                  <span className="w-1.5 h-1.5 rounded-full bg-err" />
                )}
                {item.replies && item.replies.length > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-ok-bg rounded-full text-ok">
                    {item.replies.length}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-3 border-t border-border-main/50 mt-3">
        {visibleCount < items.length && (
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + BOARD_PER, items.length),
              )
            }
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-text-sub bg-surface-main hover:text-text-main hover:bg-border-main border border-border-main px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2v8M2 7l4 4 4-4" />
            </svg>
            더보기
            <span className="text-[9.5px] bg-surface-alt text-text-muted border border-border-main/80 rounded-full px-2 py-px font-extrabold ml-1">
              {items.length - visibleCount}개 더보기
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
