import React from "react";
import { cn } from "../../../lib/utils";
import type { Task } from "../../../types/todo/todo";
import { TodoCard } from "./TodoCard";

interface TodoGroupProps {
  label: string;
  icon: React.ReactNode;
  variant: "urgent" | "ongoing" | "done";
  items: Task[];
  onToggle: (id: number) => void;
}

const GROUP_STYLES = {
  urgent: "bg-[#fee2e2] text-[#991b1b]",
  ongoing: "bg-[#fef9c3] text-[#854d0e]",
  done: "bg-surface-alt text-text-sub",
};

export const TodoGroup: React.FC<TodoGroupProps> = ({
  label,
  icon,
  variant,
  items,
  onToggle,
}) => {
  if (!items.length) return null;

  return (
    <div className="mb-5.5">
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-r2 mb-3 text-[14px] font-bold",
          GROUP_STYLES[variant],
        )}
      >
        <span className="flex items-center">{icon}</span>
        <span className="flex-1">{label}</span>
        <span className="text-[12px] font-extrabold px-2.25 py-0.5 rounded-full bg-black/8">
          {items.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((t) => (
          <TodoCard key={t.id} task={t} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
};
