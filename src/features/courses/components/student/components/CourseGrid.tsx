import React, { useMemo } from "react";
import { CourseCard } from "./CourseCard";
import { Button } from "../../../../../components/ui";
import { cn } from "../../../../../lib/utils";
import type { CourseData } from "../../../../../types/courses";

interface CourseGridProps {
  courses: CourseData[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PER = 8;

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  page,
  totalPages,
  onPageChange,
}) => {
  const displayed = useMemo(
    () => courses.slice(page * PER, page * PER + PER),
    [courses, page],
  );

  return (
    <section className="bg-surface-main border border-border-main rounded-r3 p-5 shadow-sh1">
      <header className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M3 3h7a2 2 0 012 2v8a2 2 0 01-2 2H3a1 1 0 01-1-1V4a1 1 0 011-1z" />
              <path d="M5 7h5M5 10h3M12 5V3a1 1 0 00-1-1H4" />
            </svg>
          </div>
          <h2 className="text-[14px] font-extrabold text-text-main">
            수강 강의
          </h2>
          <span className="text-[11.5px] text-text-muted font-semibold ml-1.5 py-0.75 px-2.5 bg-surface-alt rounded-full">
            {page + 1} / {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            onClick={() => onPageChange(Math.max(0, page - 1))}
            disabled={page === 0}
            size="sm"
            variant="ghost"
            className="w-8.5 h-8.5 p-0!"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 2L5 7l4 5" />
            </svg>
          </Button>
          <Button
            onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            size="sm"
            variant="ghost"
            className="w-8.5 h-8.5 p-0!"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 2l4 5-4 5" />
            </svg>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayed.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
        {Array.from({ length: PER - displayed.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="border border-transparent pointer-events-none opacity-0 invisible"
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-5">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200 cursor-pointer",
              page === idx
                ? "bg-primary w-5"
                : "bg-border-main hover:bg-border-alt",
            )}
          />
        ))}
      </div>
    </section>
  );
};
