import React from "react";
import type { ProfCourseStatus } from "../../../../types/student";

interface CourseStatusSectionProps {
  courses: ProfCourseStatus[];
  onSelectCourse: (index: number) => void;
}

export const CourseStatusSection: React.FC<CourseStatusSectionProps> = ({
  courses,
  onSelectCourse,
}) => {
  return (
    <div className="bg-surface-main border border-border-main rounded-r3 shadow-sh1 p-5">
      <h2 className="text-[15px] font-bold text-text-main mb-4">
        담당 강의 현황
      </h2>

      <div className="flex flex-col gap-2.5">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="p-3.5 border border-border-main rounded-r2 bg-surface-alt cursor-pointer hover:border-primary hover:bg-surface-main transition-all"
            onClick={() => onSelectCourse(idx)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[14px] font-bold text-text-main">
                {course.name}
              </div>
              <span className="text-[11px] font-semibold bg-primary-light text-primary py-0.5 px-2 rounded-full">
                {course.total}명
              </span>
            </div>

            <div className="flex gap-4">
              <div className="text-xs text-text-sub">
                참여율{" "}
                <span className="font-extrabold text-ok">
                  {course.participationRate}%
                </span>
              </div>
              <div className="text-xs text-text-sub">
                위험{" "}
                <span className="font-extrabold text-danger">
                  {course.danger}명
                </span>
              </div>
              <div className="text-xs text-text-sub">
                주의{" "}
                <span className="font-extrabold text-[#f59e0b]">
                  {course.caution}명
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
