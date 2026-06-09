import React from "react";
import type { ProfExtraCourse } from "../../../../types/courses";
import { Button } from "../../../../components/ui";

interface ExtraCourseCardProps {
  course: ProfExtraCourse;
  onEdit: () => void;
  onPublish: () => void;
  onCloseRegistration: () => void;
  onViewApplicants: () => void;
}

export const ExtraCourseCard: React.FC<ExtraCourseCardProps> = ({
  course,
  onEdit,
  onPublish,
  onCloseRegistration,
  onViewApplicants,
}) => {
  const pct = course.capacity
    ? Math.round((course.applied / course.capacity) * 100)
    : 0;
  const barColor = pct >= 90 ? "bg-err" : pct >= 70 ? "bg-[#f59e0b]" : "bg-ok";

  const getStatusInfo = (status: "open" | "draft" | "closed") => {
    switch (status) {
      case "open":
        return {
          label: "모집 중",
          bg: "#d1fae5",
          tx: "#065f46",
        };
      case "draft":
        return {
          label: "임시저장",
          bg: "var(--sur2)",
          tx: "var(--tx3)",
        };
      case "closed":
      default:
        return {
          label: "모집 마감",
          bg: "#fee2e2",
          tx: "#991b1b",
        };
    }
  };

  const statusInfo = getStatusInfo(course.status);

  return (
    <div className="bg-surface-main border border-border-main rounded-r3 p-5 shadow-sh1 transition-all hover:shadow-sh2">
      <div className="flex justify-between items-start mb-3.5">
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-extrabold text-text-main mb-1 truncate">
            {course.title}
          </div>
          <div className="text-[12.5px] text-text-sub truncate">
            {course.cat} · {course.type} · 대상 {course.target}
          </div>
        </div>
        <span
          className="text-[11.5px] font-bold py-1 px-3 rounded-full shrink-0 ml-3 whitespace-nowrap"
          style={{ background: statusInfo.bg, color: statusInfo.tx }}
        >
          {statusInfo.label}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sub bg-surface-alt border border-border-main py-1 px-2.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-ok" />
          정원 {course.capacity}명
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sub bg-surface-alt border border-border-main py-1 px-2.5 rounded-full">
          <div
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              pct >= 90 ? "bg-err" : pct >= 70 ? "bg-[#f59e0b]" : "bg-ok"
            }`}
          />
          신청 {course.applied}명
        </span>
        {course.status !== "draft" && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sub bg-surface-alt border border-border-main py-1 px-2.5 rounded-full">
            <div
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                pct >= 90 ? "bg-err" : pct >= 70 ? "bg-[#f59e0b]" : "bg-ok"
              }`}
            />
            {pct}%
          </span>
        )}

        <button
          className="ml-auto text-xs text-primary font-bold bg-transparent border-none cursor-pointer hover:underline"
          onClick={onViewApplicants}
        >
          신청자 보기
        </button>
      </div>

      <div className="text-[12.5px] text-text-sub mb-3 font-semibold flex items-center gap-1.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <rect x="1" y="2" width="12" height="11" rx="2" />
          <path d="M1 6h12M5 2V1M9 2V1" />
        </svg>
        {course.start} ~ {course.end}
      </div>

      <div className="mb-3.5 h-1.5">
        {course.status !== "draft" && (
          <div className="h-1.5 bg-surface-alt rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${barColor}`}
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap border-t border-border-main pt-3.5">
        <Button
          className="text-sm! font-bold rounded-r2"
          variant="ghost"
          size="sm"
          onClick={onEdit}
        >
          강의 수정
        </Button>
        {course.status === "draft" ? (
          <Button
            className="text-sm! font-bold rounded-r2"
            variant="primary"
            size="sm"
            onClick={onPublish}
          >
            공개하기
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className={`text-sm! font-bold rounded-r2 ${
              course.status === "closed"
                ? "bg-surface-alt text-text-muted cursor-not-allowed"
                : "bg-surface-main text-text-sub hover:border-primary hover:text-primary"
            }`}
            onClick={onCloseRegistration}
            disabled={course.status === "closed"}
          >
            모집 마감
          </Button>
        )}
      </div>
    </div>
  );
};
