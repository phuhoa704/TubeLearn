import React from "react";
import { cn } from "../../../lib/utils";

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  badgeVariant?: "default" | "danger" | "ok";
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  variant?: "pill" | "underline";
  className?: string;
}

export function TabBar({
  tabs,
  active,
  onChange,
  variant = "pill",
  className,
}: TabBarProps) {
  if (variant === "underline") {
    return (
      <div
        className={cn(
          "flex items-center gap-0.5 border-b border-border-main pb-0 mb-5",
          className,
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-semibold border-b-2 -mb-px transition-all duration-150 cursor-pointer",
              active === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main",
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-4.5 text-center",
                  tab.badgeVariant === "danger"
                    ? "bg-danger-bg text-danger"
                    : tab.badgeVariant === "ok"
                      ? "bg-normal-bg text-normal"
                      : "bg-surface-alt text-text-sub",
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-surface-alt border border-border-main rounded-xl p-1 mb-5 w-fit flex-wrap",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-[12.5px] font-semibold rounded-lg transition-all duration-150 cursor-pointer",
            active === tab.id
              ? "bg-surface-main text-primary shadow-sm border border-border-main"
              : "text-text-sub hover:text-text-main",
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
