import React from "react";
import { cn } from "../../../../lib/utils";
import { showToast } from "../../../../lib/toast";
import type { Task } from "../../../../types/todo/todo";
import { Button } from "../../../../components/ui";

const ACT_MAP: Record<string, { icon: React.ReactNode; label: string }> = {
  과제: {
    label: "과제 바로가기",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="1" width="10" height="12" rx="1.5" />
        <path d="M4 5h6M4 7.5h6M4 10h4" />
      </svg>
    ),
  },
  퀴즈: {
    label: "퀴즈 바로가기",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="7" r="6" />
        <path d="M5.5 5.2a1.5 1.5 0 013 .5c0 1-1.5 1.5-1.5 2.5M7 11v.5" />
      </svg>
    ),
  },
  강의: {
    label: "강의 바로가기",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="12" height="8" rx="1.5" />
        <path d="M5 6.5l4 2-4 2V6.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  프로젝트: {
    label: "프로젝트 바로가기",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="10" height="10" rx="2" />
        <path d="M5 7l2 2 4-4" />
      </svg>
    ),
  },
  토론: {
    label: "토론 바로가기",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 2h7a1 1 0 011 1v4a1 1 0 01-1 1H5L2 10V3a1 1 0 011-1z" />
      </svg>
    ),
  },
  발표: {
    label: "발표 바로가기",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="4" r="2.5" />
        <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      </svg>
    ),
  },
};

const PRI_LABEL: Record<string, string> = {
  high: "높음",
  normal: "보통",
  low: "낮음",
};

function accentColor(t: Task): string {
  if (t.done) return "var(--tx3)";
  if (t.priority === "high") return "var(--err)";
  if (t.priority === "normal") return "var(--warn)";
  return "var(--ok)";
}

interface TodoCardProps {
  task: Task;
  onToggle: (id: number) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ task: t, onToggle }) => {
  const isUrgent = t.priority === "high" && !t.done;
  const act = ACT_MAP[t.type] ?? { icon: null, label: "바로가기" };

  return (
    <div
      onClick={() => onToggle(t.id)}
      className={cn(
        "bg-surface-main border border-border-main rounded-r3 shadow-sh1 cursor-pointer",
        "flex flex-col gap-3 px-4.5 py-4",
        "hover:bg-surface-alt hover:shadow-sh2 hover:-translate-y-0.5 transition-all duration-150",
        "relative overflow-hidden",
        t.done && "opacity-60",
      )}
      style={{ borderLeft: `4px solid ${accentColor(t)}` }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(t.id);
          }}
          className={cn(
            "w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-all duration-150 mt-px",
            t.done
              ? "bg-ok border-ok text-white"
              : "border-border-alt bg-surface-main hover:border-primary",
          )}
        >
          {t.done && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6l3 3 5-5" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0 pt-px">
          <div
            className={cn(
              "text-[15px] font-semibold mb-1 overflow-hidden text-ellipsis whitespace-nowrap",
              t.done ? "line-through text-text-muted" : "text-text-main",
            )}
          >
            {t.n}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          {t.done ? (
            <span className="text-[11px] font-bold px-2.5 py-0.75 rounded-full bg-ok-bg text-ok">
              완료
            </span>
          ) : (
            <span
              className={cn(
                "text-[11px] font-bold px-2.5 py-0.75 rounded-full",
                t.priority === "high"
                  ? "bg-err-bg text-err"
                  : t.priority === "normal"
                    ? "bg-warn-bg text-warn"
                    : "bg-ok-bg text-ok",
              )}
            >
              {PRI_LABEL[t.priority]}
            </span>
          )}
          <span className="text-[12px] text-text-sub text-right truncate max-w-40">
            {t.course} · {t.type}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-border-main mt-0.5">
        <div>
          <div
            className={cn(
              "text-[12.5px] font-semibold",
              isUrgent ? "text-err" : "text-text-sub",
            )}
          >
            {t.date}
          </div>
          <div className="text-[13px] text-text-muted">마감일</div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            showToast(`${t.emoji} ${t.course} — ${act.label}`);
          }}
          variant="outline"
          size="sm"
        >
          {act.icon}
          {act.label}
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
