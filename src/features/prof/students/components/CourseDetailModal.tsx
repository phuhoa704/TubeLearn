import React, { useState, useMemo, useEffect } from "react";
import type { ProfCourseStatus } from "../../../../types/student";

interface CourseDetailModalProps {
  course: ProfCourseStatus | null;
  open: boolean;
  onClose: () => void;
  onOpenStudent: (studentName: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  open,
  onClose,
  onOpenStudent,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "danger" | "caution" | "normal"
  >("all");
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setActiveFilter("all");
    setVisibleCount(5);
    setSearchQuery("");
  }, [course, open]);

  const sortedStudents = useMemo(() => {
    if (!course) return [];
    const list = [...course.students];
    const order = { danger: 0, caution: 1, normal: 2 };
    return list.sort((a, b) => (order[a.status] ?? 0) - (order[b.status] ?? 0));
  }, [course]);

  const filteredStudents = useMemo(() => {
    if (!course) return [];
    return sortedStudents.filter((student) => {
      if (activeFilter !== "all" && student.status !== activeFilter) {
        return false;
      }
      if (
        searchQuery &&
        !student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !student.id.includes(searchQuery)
      ) {
        return false;
      }
      return true;
    });
  }, [sortedStudents, activeFilter, searchQuery, course]);

  const displayedStudents = filteredStudents.slice(0, visibleCount);
  const hasMore = filteredStudents.length > visibleCount;
  const remainingCount = filteredStudents.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (!open || !course) return null;

  const getMetricColor = (val: number, type: "join" | "score") => {
    if (type === "join") {
      if (val < 50) return "text-danger";
      if (val < 70) return "text-[#f59e0b]";
      return "text-ok";
    } else {
      if (val < 60) return "text-danger";
      if (val < 75) return "text-[#f59e0b]";
      return "text-ok";
    }
  };

  const getStatusBadgeClass = (status: "danger" | "caution" | "normal") => {
    if (status === "danger") return "bg-danger-bg text-danger";
    if (status === "caution") return "bg-[#fef9c3] text-[#854d0e]";
    return "bg-[#d1fae5] text-[#065f46]";
  };

  const getStatusText = (status: "danger" | "caution" | "normal") => {
    if (status === "danger") return "위험";
    if (status === "caution") return "주의";
    return "정상";
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
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-r2 bg-primary-light flex items-center justify-center text-primary shrink-0 font-bold">
              🎓
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-extrabold text-text-main leading-tight">
                {course.name}
              </h2>
              <div className="text-xs text-text-sub">
                총 {course.total}명 수강 중 · {course.code}
              </div>
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

        <div className="px-5 py-3.5 border-b border-border-main flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex gap-1">
            {(["all", "danger", "caution", "normal"] as const).map((filter) => {
              const isActive = activeFilter === filter;
              let count = course.total;
              if (filter === "danger") count = course.danger;
              if (filter === "caution") count = course.caution;
              if (filter === "normal") count = course.normal;

              return (
                <button
                  key={filter}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-sub hover:bg-surface-alt"
                  }`}
                  onClick={() => {
                    setActiveFilter(filter);
                    setVisibleCount(5);
                  }}
                >
                  {filter === "all"
                    ? "전체"
                    : filter === "danger"
                      ? "위험"
                      : filter === "caution"
                        ? "주의"
                        : "정상"}{" "}
                  {count}
                </button>
              );
            })}
          </div>
          <div className="w-full sm:w-48 shrink-0">
            <input
              type="text"
              placeholder="학생 검색..."
              className="w-full h-8.5 text-xs px-3 bg-surface-alt border border-border-main rounded-r2 text-text-main outline-none focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(5);
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          {displayedStudents.map((st) => (
            <div
              key={st.id}
              className={`flex items-center justify-between gap-3 p-3.5 border border-border-main rounded-r2 bg-surface-main cursor-pointer hover:border-primary transition-all`}
              onClick={() => onOpenStudent(st.name)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-extrabold shrink-0 ${getStatusBadgeClass(
                    st.status,
                  )}`}
                >
                  {st.av}
                </div>
                <div>
                  <div className="text-[13.5px] font-bold text-text-main flex items-center gap-1.5">
                    {st.name}
                    <span
                      className={`text-[10px] font-bold py-px px-1.5 rounded-full ${getStatusBadgeClass(
                        st.status,
                      )}`}
                    >
                      {getStatusText(st.status)}
                    </span>
                  </div>
                  <div className="text-[11px] text-text-sub">
                    {st.id} · 마지막 접속: {st.last}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:block">
                  <div className="text-[10px] text-text-muted">참여율</div>
                  <div
                    className={`text-xs font-bold ${getMetricColor(st.join, "join")}`}
                  >
                    {st.join}%
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] text-text-muted">과제</div>
                  <div className="text-xs font-bold text-text-main">
                    {st.assign}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] text-text-muted">점수</div>
                  <div
                    className={`text-xs font-bold ${getMetricColor(st.score, "score")}`}
                  >
                    {st.score}점
                  </div>
                </div>

                <div className="pl-2 border-l border-border-main flex items-center gap-2">
                  <div>
                    <div className="text-[10px] text-text-muted">위험도</div>
                    <div className="text-[14px] font-extrabold text-text-main">
                      {st.risk.toFixed(2)}
                    </div>
                  </div>
                  <svg
                    className="text-text-muted w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 14 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 2l6 5-6 5" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="text-center py-10 text-text-muted text-sm">
              해당하는 학생이 없습니다.
            </div>
          )}

          {hasMore && (
            <div className="pt-2 text-center">
              <button
                className="text-xs font-bold text-primary bg-primary-light hover:bg-primary-hover/20 transition-colors py-2 px-5 rounded-full"
                onClick={handleLoadMore}
              >
                {remainingCount}명 더보기
              </button>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-border-main bg-surface-alt flex items-center justify-between shrink-0">
          <span className="text-[12px] text-text-muted">
            표시 {displayedStudents.length} / {filteredStudents.length}명
          </span>
          <button
            className="px-4 py-1.5 border border-border-main rounded-r2 text-[12.5px] font-bold text-text-sub bg-surface-main hover:bg-surface-alt transition-colors"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
