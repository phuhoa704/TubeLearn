import React from "react";
import type { ProfAssignedCourse } from "../../../../types/courses";
import { Button } from "../../../../components/ui";

interface AssignedCourseCardProps {
  course: ProfAssignedCourse;
  onOpenStudentList: () => void;
  onNoticeWrite: () => void;
  onGradeBook: () => void;
  onMaterial: () => void;
}

export const AssignedCourseCard: React.FC<AssignedCourseCardProps> = ({
  course,
  onOpenStudentList,
  onNoticeWrite,
  onGradeBook,
  onMaterial,
}) => {
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "grade":
        return "bg-[#d1fae5] text-[#065f46]";
      case "assign":
        return "bg-[#ede9fe] text-[#5b21b6]";
      case "quiz":
        return "bg-[#fef9c3] text-[#854d0e]";
      case "class":
      default:
        return "bg-primary-light text-primary";
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case "grade":
        return "성적입력";
      case "assign":
        return "과제제출";
      case "quiz":
        return "퀴즈";
      case "class":
      default:
        return "수업참여";
    }
  };

  const getDdayClass = (cls: string) => {
    if (cls === "red") return "text-[#ef4444]";
    if (cls === "warn") return "text-[#f59e0b]";
    return "text-ok";
  };

  return (
    <div className="bg-surface-main border border-border-main rounded-r3 p-5 shadow-sh1 transition-all hover:shadow-sh2">
      <div className="flex justify-between items-start mb-3.5">
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-extrabold text-text-main mb-1 truncate">
            {course.name}
          </div>
          <div className="text-[12.5px] text-text-sub truncate">
            {course.code} · {course.prof} · {course.schedule}
          </div>
        </div>
        <span className="text-[12px] font-bold bg-primary-light text-primary py-1 px-3 rounded-full shrink-0 ml-3">
          {course.total}명
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3.5 flex-wrap">
        {course.danger > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sub bg-surface-alt border border-border-main py-1 px-2.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-err" />
            위험 {course.danger}명
          </span>
        )}
        {course.caution > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sub bg-surface-alt border border-border-main py-1 px-2.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#f59e0b]" />
            주의 {course.caution}명
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sub bg-surface-alt border border-border-main py-1 px-2.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-ok" />
          정상 {course.normal}명
        </span>

        <button
          className="ml-auto text-xs text-primary font-bold bg-transparent border-none cursor-pointer hover:underline"
          onClick={onOpenStudentList}
        >
          학생 목록
        </button>
      </div>

      <div className="text-[12.5px] font-bold text-text-sub mb-2">
        이번 주 처리 항목
      </div>
      <div className="flex flex-col gap-1.5 mb-3.5">
        {course.events.map((ev, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2.5 p-2 rounded-r2 border border-transparent transition-all ${
              ev.cls === "red"
                ? "bg-[#fff5f5] border-l-2 border-l-[#ef4444]"
                : "bg-surface-alt"
            }`}
          >
            <span
              className={`text-xs font-bold py-0.5 px-2 rounded-full shrink-0 ${getBadgeStyle(
                ev.badge,
              )}`}
            >
              {getBadgeLabel(ev.badge)}
            </span>
            <span className="text-sm text-text-main flex-1 truncate">
              {ev.title}
            </span>
            <span
              className={`text-xs font-bold shrink-0 ${getDdayClass(ev.cls)}`}
            >
              {ev.dday}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap border-t border-border-main pt-3.5">
        <Button
          variant="ghost"
          className="rounded-r2 text-xs font-bold py-1.5 px-2"
          onClick={onGradeBook}
          size="sm"
        >
          성적부
        </Button>
        <Button
          variant="ghost"
          className="rounded-r2 text-xs font-bold py-1.5 px-2"
          onClick={onMaterial}
          size="sm"
        >
          강의 자료
        </Button>
        <Button
          variant="ghost"
          className="rounded-r2 text-xs font-bold py-1.5 px-2"
          onClick={onNoticeWrite}
          size="sm"
        >
          공지 작성
        </Button>
        <Button
          variant="primary"
          className="rounded-r2 text-xs font-bold py-1.5 px-2"
          onClick={onOpenStudentList}
          size="sm"
        >
          수강생 현황
        </Button>
      </div>
    </div>
  );
};
