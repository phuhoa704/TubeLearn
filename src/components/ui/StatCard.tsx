import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  sub?: React.ReactNode;
  accent?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  unit,
  sub,
  accent = "--p",
  className = "",
}) => (
  <div
    className={[
      "bg-(--sur) border border-(--bd) rounded-(--r3) shadow-(--sh1)",
      "stat",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    <div className="flex items-center gap-2.25 mb-3">
      <span
        className="w-8 h-8 rounded-(--r1) flex items-center justify-center shrink-0 transition-[background-.22s]"
        style={{ background: "var(--pl)", color: `var(${accent})` }}
      >
        {icon}
      </span>
      <span className="text-[14px] text-(--tx2) font-medium">{label}</span>
    </div>

    <div className="text-[32px] font-extrabold text-(--tx) tracking-[-.5px] leading-none mb-1.5 flex items-baseline gap-1">
      {value}
      {unit && (
        <span className="text-[14px] font-medium text-(--tx2)">{unit}</span>
      )}
    </div>

    {sub && (
      <div className="text-[12.5px] text-(--tx3) flex items-center gap-1">
        {sub}
      </div>
    )}
  </div>
);

export default StatCard;
