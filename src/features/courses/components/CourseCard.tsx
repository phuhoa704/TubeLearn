import React from "react";
import { cn } from "../../../lib/utils";
import type { CourseData } from "../../../mocks/courses";
import { showToast } from "../../../lib/toast";

const ACT_TYPE_COLORS: Record<string, string> = {
  과제: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  퀴즈: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  강의: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  프로젝트: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  토론: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  발표: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

interface CourseCardProps {
  course: CourseData;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const typeClass =
    course.type === "교과"
      ? "bg-primary-light text-primary border-primary/20"
      : "bg-recover-bg text-recover border-recover/20";

  const getRecentActivities = (c: CourseData) => {
    const today = new Date("2026-05-13");
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const recent = (c.activities || []).filter((a) => {
      return new Date(a.date) >= weekAgo;
    });

    recent.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return recent;
  };

  const recent = getRecentActivities(course);
  const latest = recent[0];

  return (
    <div
      onClick={() =>
        showToast(
          `📚 ${course.n}\n담당: ${course.prof} · ${course.credit}학점\n(Moodle 연동 후 강의실로 이동합니다)`,
        )
      }
      className="bg-surface-main border border-border-main rounded-r3 p-4.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11.5px] text-text-muted font-bold tracking-wide">
            {course.code}
          </span>
          <span
            className={cn(
              "text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border",
              typeClass,
            )}
          >
            {course.type}
          </span>
        </div>

        <h3 className="text-[13.5px] font-extrabold text-text-main leading-snug line-clamp-2 min-h-9.5 mb-3">
          {course.n}
        </h3>

        <div className="text-[11px] text-text-sub font-semibold flex items-center gap-1.5 mb-3.5">
          <svg
            width="11"
            height="11"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <circle cx="7" cy="5" r="3" />
            <path d="M1 13c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          </svg>
          {course.prof}
        </div>

        <div className="bg-surface-alt/50 border border-border-main/50 rounded-lg p-2.5 space-y-1.5 mb-3">
          <div className="flex items-center gap-1.5 text-[13px] text-text-sub font-extrabold">
            <svg
              width="11"
              height="11"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7" cy="7" r="6" />
              <path d="M7 4v3l2 1.5" />
            </svg>
            최근 등록 학습활동
          </div>
          {latest ? (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0",
                  ACT_TYPE_COLORS[latest.type] ||
                    "bg-surface-alt text-text-sub",
                )}
              >
                {latest.type}
              </span>
              <span className="text-sm font-medium text-text-sub truncate">
                {latest.name}
              </span>
            </div>
          ) : (
            <div className="text-[11px] text-text-muted font-medium py-0.5">
              등록된 학습활동이 없어요
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 mt-1 select-none">
        <span className="text-[11px] text-text-muted">{course.credit}학점</span>
        {recent.length > 1 && (
          <span className="text-[10px] text-text-muted">
            +{recent.length - 1}개 활동
          </span>
        )}
      </div>
    </div>
  );
};
