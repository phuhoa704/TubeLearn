import React, { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options?: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, helper, options, className = "", id, children, ...rest },
    ref,
  ) => {
    const selectId = id ?? `select-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[13px] font-semibold text-(--tx)"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={[
              "w-full bg-(--inp) border rounded-(--r2) text-sm text-(--tx)",
              "outline-none transition-all duration-(.18s) ease-(cubic-bezier(.4,0,.2,1))",
              "focus:border-(--p) focus:ring-2 focus:ring-(--pr)",
              error
                ? "border-(--err) focus:border-(--err) focus:ring-[rgba(239,68,68,.15)]"
                : "border-(--bd)",
              "px-3.5 pr-10 py-2.5 cursor-pointer appearance-none",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3.5 pointer-events-none text-(--tx3)">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          </div>
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

Select.displayName = "Select";

export default Select;
