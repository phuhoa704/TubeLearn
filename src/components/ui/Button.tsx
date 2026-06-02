import React from "react";

type ButtonVariant = "primary" | "ghost" | "danger" | "success" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--p)] text-white hover:bg-[var(--ph)] shadow-[0_1px_3px_rgba(0,0,0,.12)] hover:shadow-[0_3px_10px_rgba(0,0,0,.18)]",
  ghost:
    "bg-[var(--sur)] text-[var(--tx2)] border border-[var(--bd)] hover:border-[var(--bd2)] hover:bg-[var(--sur2)]",
  danger:
    "bg-[var(--err)] text-white hover:opacity-90 shadow-[0_1px_3px_rgba(0,0,0,.12)]",
  success:
    "bg-[var(--ok)] text-white hover:opacity-90 shadow-[0_1px_3px_rgba(0,0,0,.12)]",
  outline:
    "bg-transparent text-[var(--p)] border border-[var(--p)] hover:bg-[var(--pl)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-[13px] gap-1.5 rounded-[var(--r1)]",
  md: "px-5 py-2.5 text-[14px] gap-2 rounded-[var(--r2)]",
  lg: "px-7 py-3 text-[15px] gap-2.5 rounded-[var(--r3)]",
};

const Spinner = () => (
  <svg
    className="animate-spin"
    style={{ width: "1em", height: "1em" }}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-(--f)",
        "transition-all duration-(.18s) ease-(cubic-bezier(.4,0,.2,1))",
        "cursor-pointer select-none whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
};

export default Button;
