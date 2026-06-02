import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helper, icon, iconRight, className = "", id, ...rest },
    ref,
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-(--tx)"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3 flex items-center text-(--tx3) pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full bg-(--inp) border rounded-(--r2) text-[14px] text-(--tx)",
              "placeholder:text-(--tx3) outline-none",
              "transition-all duration-(.18s) ease-(cubic-bezier(.4,0,.2,1))",
              "focus:border-(--p) focus:ring-2 focus:ring-(--pr)",
              error
                ? "border-(--err) focus:border-(--err) focus:ring-[rgba(239,68,68,.15)]"
                : "border-(--bd)",
              icon ? "pl-9" : "pl-3.5",
              iconRight ? "pr-9" : "pr-3.5",
              "py-2.5",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          />

          {iconRight && (
            <span className="absolute right-3 flex items-center text-(--tx3)">
              {iconRight}
            </span>
          )}
        </div>

        {error && (
          <p className="text-[12px] text-(--err) flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4h1.5v4h-1.5V5zm0 5h1.5v1.5h-1.5V10z" />
            </svg>
            {error}
          </p>
        )}

        {!error && helper && (
          <p className="text-[12px] text-(--tx3)">{helper}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
