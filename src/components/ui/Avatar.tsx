import React from "react";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: boolean;
  className?: string;
}

const sizePx: Record<string, number> = {
  xs: 24,
  sm: 30,
  md: 36,
  lg: 44,
  xl: 56,
};

const fontPx: Record<string, string> = {
  xs: "9px",
  sm: "11px",
  md: "13px",
  lg: "15px",
  xl: "20px",
};

const dotSize: Record<string, string> = {
  xs: "w-2 h-2",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-3.5 h-3.5",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  online,
  className = "",
}) => {
  const px = sizePx[size];

  return (
    <span className={["relative inline-flex shrink-0", className].join(" ")}>
      <span
        className="rounded-full overflow-hidden flex items-center justify-center bg-(--p) text-white font-bold select-none"
        style={{ width: px, height: px, fontSize: fontPx[size] }}
      >
        {src ? (
          <img
            src={src}
            alt={name ?? "avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials(name)
        )}
      </span>

      {online !== undefined && (
        <span
          className={[
            dotSize[size],
            "absolute bottom-0 right-0 rounded-full border-2 border-(--sur)",
            online ? "bg-(--ok)" : "bg-(--tx3)",
          ].join(" ")}
        />
      )}
    </span>
  );
};

export default Avatar;
