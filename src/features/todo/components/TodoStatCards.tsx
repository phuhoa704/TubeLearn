import React from "react";
import { cn } from "../../../lib/utils";
import type { TodoStats } from "../../../types/todo/todo";

interface TodoStatCardsProps {
  stats: TodoStats;
}

const CARDS = [
  {
    key: "total" as const,
    label: "전체",
    cls: "",
    numCls: "text-text-main",
    borderCls: "border-l-primary",
  },
  {
    key: "urgent" as const,
    label: "긴급",
    cls: "",
    numCls: "text-err",
    borderCls: "border-l-err",
  },
  {
    key: "ongoing" as const,
    label: "진행 중",
    cls: "",
    numCls: "text-warn",
    borderCls: "border-l-warn",
  },
  {
    key: "done" as const,
    label: "완료",
    cls: "",
    numCls: "text-ok",
    borderCls: "border-l-ok",
  },
];

export const TodoStatCards: React.FC<TodoStatCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
      {CARDS.map(({ key, label, numCls, borderCls }) => (
        <div
          key={key}
          className={cn(
            "bg-surface-main border border-border-main rounded-r3 px-5 py-4.5 border-l-4 shadow-sh1",
            borderCls,
          )}
        >
          <div
            className={cn(
              "text-[28px] font-extrabold leading-none mb-1.5 tracking-tight",
              numCls,
            )}
          >
            {stats[key]}
          </div>
          <div className="text-[13px] text-text-sub font-medium">{label}</div>
        </div>
      ))}
    </div>
  );
};
