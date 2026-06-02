import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: number;
  persistent?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 560,
  persistent = false,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !persistent) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, persistent]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={[
        "fixed inset-0 z-60 flex items-center justify-center p-4",
        "transition-opacity duration-200",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      ].join(" ")}
      style={{ background: "rgba(0,0,0,.45)" }}
      onClick={
        persistent
          ? undefined
          : (e) => {
              if (!panelRef.current?.contains(e.target as Node)) onClose();
            }
      }
    >
      <div
        ref={panelRef}
        className={[
          "bg-(--sur) rounded-(--r3) w-full flex flex-col overflow-hidden",
          "shadow-[0_24px_60px_rgba(0,0,0,.2)]",
          "transition-all duration-(.22s) ease-(cubic-bezier(.4,0,.2,1))",
          open ? "translate-y-0 scale-100" : "translate-y-3 scale-[.98]",
        ].join(" ")}
        style={{ maxWidth, maxHeight: "90vh" }}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between px-5 py-4 border-b border-(--bd) shrink-0">
            <div>
              {title && (
                <h2 className="text-[16px] font-bold text-(--tx)">{title}</h2>
              )}
              {subtitle && (
                <p className="text-[13px] text-(--tx2) mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-(--r1) flex items-center justify-center text-(--tx3) hover:bg-(--sur2) hover:text-(--tx) transition-all duration-(.18s) ml-3 shrink-0"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-3 border-t border-(--bd) flex items-center justify-end gap-2 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
