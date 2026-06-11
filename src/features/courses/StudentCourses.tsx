import { useState, useMemo } from "react";
import { ALL_COURSES, NOTICES_MOCK, QAS_MOCK } from "../../mocks/courses";
import {
  CourseGrid,
  BoardFeed,
  CourseDetailModal,
} from "./components/student/components";
import type { BoardItem } from "../../types/courses/index";

const PER = 8;

interface PopupState {
  type: "notice" | "qa";
  index: number;
}

export const StudentCourses = () => {
  const [term, setTerm] = useState("2026-1");
  const [type, setType] = useState("all");
  const [coursePage, setCoursePage] = useState(0);
  const [popupItem, setPopupItem] = useState<PopupState | null>(null);

  const filteredCourses = useMemo(() => {
    const list = ALL_COURSES[term] || [];
    return list.filter((c) => type === "all" || c.type === type);
  }, [term, type]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PER));

  const handleTermChange = (val: string) => {
    setTerm(val);
    setCoursePage(0);
  };

  const handleTypeChange = (val: string) => {
    setType(val);
    setCoursePage(0);
  };

  // Modal data
  const currentList: BoardItem[] = useMemo(() => {
    if (!popupItem) return [];
    return popupItem.type === "notice" ? NOTICES_MOCK : QAS_MOCK;
  }, [popupItem]);

  const activeItem: BoardItem | null = useMemo(() => {
    if (!popupItem) return null;
    return currentList[popupItem.index] ?? null;
  }, [popupItem, currentList]);

  const newNoticesCount = useMemo(
    () => NOTICES_MOCK.filter((n) => n.isNew).length,
    [],
  );

  const openModal = (type: "notice" | "qa", index: number) =>
    setPopupItem({ type, index });

  const closeModal = () => setPopupItem(null);

  const handlePrev = () => {
    if (popupItem && popupItem.index > 0)
      setPopupItem({ ...popupItem, index: popupItem.index - 1 });
  };

  const handleNext = () => {
    if (popupItem && popupItem.index < currentList.length - 1)
      setPopupItem({ ...popupItem, index: popupItem.index + 1 });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-text-main">
            내 강의
          </h1>
          <p className="text-sm text-text-sub mt-1">
            {term.replace("-1", "년 1학기").replace("-2", "년 2학기")} ·{" "}
            {filteredCourses.length}개 강의 수강 중
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={term}
            onChange={(e) => handleTermChange(e.target.value)}
            className="text-[12.5px] font-normal px-3 py-2 border border-border-main rounded-r2 bg-surface-main text-text-main focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="2026-1">2026년 1학기</option>
            <option value="2025-2">2025년 2학기</option>
          </select>

          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="text-[12.5px] font-normal px-3 py-2 border border-border-main rounded-r2 bg-surface-main text-text-main focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">전체 과목</option>
            <option value="교과">교과</option>
            <option value="교양">교양</option>
          </select>

          <span className="text-[12px] text-text-muted ml-1">
            총{" "}
            <b className="text-text-main font-bold">{filteredCourses.length}</b>
            개
          </span>
        </div>
      </header>

      <CourseGrid
        courses={filteredCourses}
        page={coursePage}
        totalPages={totalPages}
        onPageChange={setCoursePage}
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BoardFeed
          title="통합 공지사항"
          iconBg="bg-primary-light text-primary"
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 8A5.5 5.5 0 018 2.5M8 2.5A5.5 5.5 0 0113.5 8c0 4-2 5-2 5h-7s-2-1-2-5" />
              <path d="M9.5 14a2 2 0 01-3 0" />
            </svg>
          }
          badge={
            <span className="text-[10px] font-black bg-err text-white px-2.5 py-0.75 rounded-full border border-danger/15">
              {newNoticesCount} NEW
            </span>
          }
          items={NOTICES_MOCK}
          onItemClick={(idx) => openModal("notice", idx)}
        />

        <BoardFeed
          title="통합 Q&A"
          iconBg="bg-primary-light text-primary"
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h10a1 1 0 011 1v6a1 1 0 01-1 1H7L3.5 14V11H3a1 1 0 01-1-1V4a1 1 0 011-1z" />
            </svg>
          }
          items={QAS_MOCK}
          onItemClick={(idx) => openModal("qa", idx)}
        />
      </section>

      <CourseDetailModal
        open={!!popupItem}
        onClose={closeModal}
        type={popupItem?.type ?? "notice"}
        item={activeItem}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={!!popupItem && popupItem.index > 0}
        hasNext={!!popupItem && popupItem.index < currentList.length - 1}
      />
    </div>
  );
};
