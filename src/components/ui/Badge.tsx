import React from "react";

type BadgeVariant = "primary" | "ok" | "error" | "warn" | "neutral";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-[var(--pl)] text-[var(--p)]",
  ok: "bg-[var(--okb)] text-[var(--ok)]",
  error: "bg-[var(--errb)] text-[var(--err)]",
  warn: "bg-[var(--warnb)] text-[var(--warn)]",
  neutral: "bg-[var(--sur2)] text-[var(--tx2)]",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  dot = false,
  className = "",
  ...rest
}) => (
  <span
    className={[
      "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full",
      variantStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {dot && (
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: "currentColor" }}
      />
    )}
    {children}
  </span>
);

export default Badge;
