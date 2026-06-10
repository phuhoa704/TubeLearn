import React from "react";
import type { ProfStudentDetail } from "../../../types/student";
import { showToast } from "../../../lib/toast";

interface StudentDetailModalProps {
  student: ProfStudentDetail | null;
  open: boolean;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  open,
  onClose,
}) => {
  if (!open || !student) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "msg":
        return "✉️";
      case "call":
        return "📞";
      case "auto":
        return "⚙️";
      default:
        return "📝";
    }
  };

  const getRiskValColor = (cls: string) => {
    if (cls === "red") return "text-danger";
    if (cls === "warn") return "text-[#f59e0b]";
    if (cls === "ok") return "text-ok";
    return "text-text-sub";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-main rounded-r3 shadow-sh3 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-scale-in">
        <div className="px-5 py-4 border-b border-border-main flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-lg font-extrabold text-white shrink-0">
              {student.av}
            </div>
            <div>
              <div className="text-lg font-extrabold text-text-main flex items-center gap-2">
                {student.name}
                <span className="text-xs font-bold bg-[#fee2e2] text-[#991b1b] py-0.5 px-3 rounded-full">
                  위험도 {student.risk.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-text-sub">{student.dept}</div>
            </div>
          </div>

          <button
            className="w-7 h-7 rounded-r1 flex items-center justify-center text-text-muted hover:bg-surface-alt hover:text-text-main transition-all"
            onClick={onClose}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-none">
          <div className="space-y-3">
            <div className="text-[13.5px] font-extrabold text-text-main flex items-center gap-1.5">
              ⚠️ 주요 위험 지표
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {student.riskCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`border rounded-r2 p-3 text-center transition-all bg-surface-alt border-border-main ${
                    card.cls === "red" ? "bg-[#fff5f5] border-[#fca5a5]" : ""
                  }`}
                >
                  <div className="text-[11.5px] text-text-sub font-semibold mb-1.5">
                    {card.lbl}
                  </div>
                  <div
                    className={`text-lg font-extrabold ${getRiskValColor(
                      card.cls,
                    )}`}
                  >
                    {card.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {student.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[12px] font-semibold bg-[#fee2e2] text-[#991b1b] py-0.75 px-2.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-border-main" />

          <div className="space-y-3">
            <div className="text-[13.5px] font-extrabold text-text-main flex items-center gap-1.5">
              📊 이번 학기 학습 통계
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {student.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-surface-alt rounded-r2 p-3 text-center"
                >
                  <div className="text-[11.5px] text-text-sub mb-1">
                    {stat.lbl}
                  </div>
                  <div className="text-lg font-extrabold text-text-main">
                    {stat.val}
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border-main" />

          <div className="space-y-3">
            <div className="text-[13.5px] font-extrabold text-text-main flex items-center gap-1.5">
              📚 과목별 진도 현황
            </div>
            <div className="flex flex-col gap-3">
              {student.progress.map((prog, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[13px] text-text-sub w-28 shrink-0 truncate">
                    {prog.name}
                  </span>
                  <div className="flex-1 h-2 bg-surface-alt rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${prog.pct}%`,
                        backgroundColor: prog.color,
                      }}
                    />
                  </div>
                  <span className="text-[12.5px] font-bold text-text-main w-8 text-right shrink-0">
                    {prog.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border-main" />

          <div className="space-y-3">
            <div className="text-[13.5px] font-extrabold text-text-main flex items-center gap-1.5">
              📜 지도 및 개입 이력
            </div>
            <div className="flex flex-col gap-2">
              {student.history.map((hist, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 bg-surface-alt rounded-r2"
                >
                  <div className="text-lg shrink-0">{getIcon(hist.icon)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-bold text-text-main">
                      {hist.title}
                    </div>
                    <div className="text-[11px] text-text-sub">{hist.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-border-main bg-surface-alt flex items-center justify-end gap-2.5 shrink-0">
          <button
            className="px-4 py-2 border border-border-main rounded-r2 text-[13px] font-bold text-text-sub bg-surface-main hover:bg-surface-alt transition-colors"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded-r2 text-[13px] font-bold hover:bg-primary-hover transition-colors"
            onClick={() => {
              showToast(`${student.name} 학생에게 메시지를 보냈어요! ✉️`);
              onClose();
            }}
          >
            학습 독려 메시지 발송
          </button>
        </div>
      </div>
    </div>
  );
};
