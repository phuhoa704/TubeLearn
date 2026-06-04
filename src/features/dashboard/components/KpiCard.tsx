import React from "react";
import { cn } from "../../../lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  sub: string;
  subVariant?: "danger" | "ok" | "warn" | "default";
  onClick?: () => void;
  active?: boolean;
  badge?: React.ReactNode;
  chart?: React.ReactNode;
  valueClassName?: string;
  labelClassName?: string;
  subClassName?: string;
}

export function KpiCard({
  label,
  value,
  unit,
  sub,
  subVariant = "default",
  onClick,
  active,
  badge,
  chart,
  valueClassName,
  labelClassName,
  subClassName,
}: KpiCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-surface-main border rounded-r3 p-4 flex flex-col gap-1.5 transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        active
          ? "border-primary ring-1 ring-primary/20 shadow-sm"
          : "border-border-main",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-[11.5px] text-text-muted font-semibold",
            labelClassName,
          )}
        >
          {label}
        </span>
        {badge}
      </div>
      <div
        className={cn(
          "text-2xl font-bold text-text-main tracking-tight leading-none flex items-baseline gap-1",
          valueClassName,
        )}
      >
        {value}
        {unit && (
          <span className="text-[13px] font-medium text-text-sub">{unit}</span>
        )}
      </div>
      <div
        className={cn(
          "text-[11.5px] font-semibold",
          subVariant === "danger"
            ? "text-err"
            : subVariant === "ok"
              ? "text-ok"
              : subVariant === "warn"
                ? "text-[#d97706]"
                : "text-text-sub",
          subClassName,
        )}
      >
        {sub}
      </div>
      {chart}
    </div>
  );
}
