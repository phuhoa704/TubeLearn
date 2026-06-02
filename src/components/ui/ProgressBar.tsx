import React from "react";

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  animate?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "var(--p)",
  height = 5,
  animate = true,
  className = "",
}) => (
  <div
    className={["w-full rounded-full overflow-hidden bg-(--sur2)", className]
      .filter(Boolean)
      .join(" ")}
    style={{ height }}
  >
    <div
      style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        height: "100%",
        background: color,
        borderRadius: 9999,
        transition: animate ? "width .5s ease" : "none",
      }}
    />
  </div>
);

export default ProgressBar;
