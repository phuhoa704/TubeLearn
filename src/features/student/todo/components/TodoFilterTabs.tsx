import React from "react";
import { cn } from "../../../../lib/utils";
import { FILTER_TABS } from "../../../../mocks/todo/todo";
import type { FilterKey } from "../../../../types/todo/todo";

interface TodoFilterTabsProps {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
}

export const TodoFilterTabs: React.FC<TodoFilterTabsProps> = ({
  active,
  onChange,
}) => {
  return (
    <div className="flex gap-2 flex-wrap mb-4.5">
      {FILTER_TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "px-4.5 py-2 rounded-full border text-[13px] font-semibold cursor-pointer transition-all duration-150",
            active === key
              ? "bg-primary border-primary text-white"
              : "bg-surface-main border-border-main text-text-sub hover:border-border-alt hover:bg-surface-alt",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
