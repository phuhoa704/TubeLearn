import React, { useState } from "react";
import {
  ProfCoursesHeader,
  AssignedCourseCard,
  ExtraCourseCard,
  ExtraCourseFormModal,
} from "./components/prof";
import {
  CourseDetailModal,
  StudentDetailModal,
} from "../../features/prof/students/components";
import {
  PROF_COURSES_LIST_MOCK,
  EXTRA_COURSES_MOCK,
} from "../../mocks/courses";
import { COURSE_DATA_MOCK } from "../../mocks/student";
import { PROF_STUDENTS_MOCK } from "../../mocks/student";
import type { ProfAssignedCourse, ProfExtraCourse } from "../../types/courses";
import { showToast } from "../../lib/toast";
import { TabBar } from "./components/prof/TabBar";

export const ProfCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"assigned" | "extra">("assigned");
  const assignedCourses: ProfAssignedCourse[] = PROF_COURSES_LIST_MOCK;
  const [extraCourses, setExtraCourses] =
    useState<ProfExtraCourse[]>(EXTRA_COURSES_MOCK);

  const [selectedCourseIdx, setSelectedCourseIdx] = useState<number | null>(
    null,
  );
  const [selectedStudentIdx, setSelectedStudentIdx] = useState<number | null>(
    null,
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editingExtraCourse, setEditingExtraCourse] =
    useState<ProfExtraCourse | null>(null);

  const activeRosterCourse =
    selectedCourseIdx !== null
      ? COURSE_DATA_MOCK.find(
          (c) => c.name === assignedCourses[selectedCourseIdx].name,
        ) || null
      : null;

  const activeStudent =
    selectedStudentIdx !== null ? PROF_STUDENTS_MOCK[selectedStudentIdx] : null;

  const handleOpenStudentFromCourse = (studentName: string) => {
    const foundIdx = PROF_STUDENTS_MOCK.findIndex(
      (s) => s.name === studentName,
    );
    setSelectedCourseIdx(null);
    if (foundIdx >= 0) {
      setTimeout(() => {
        setSelectedStudentIdx(foundIdx);
      }, 150);
    } else {
      showToast(`${studentName} 학생 상세 — 준비 중이에요! 🔍`);
    }
  };

  const handlePublish = (id: string) => {
    const target = extraCourses.find((c) => c.id === id);
    if (!target) return;
    if (!confirm(`${target.title} 비교과 강의를 공개하시겠습니까?`)) return;

    setExtraCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "open" } : c)),
    );
    showToast("비교과 강의가 공개되었습니다! 🚀");
  };

  const handleCloseRegistration = (id: string) => {
    const target = extraCourses.find((c) => c.id === id);
    if (!target) return;
    if (!confirm(`${target.title} 비교과 강의 모집을 마감하시겠습니까?`))
      return;

    setExtraCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "closed" } : c)),
    );
    showToast("모집이 마감되었습니다.");
  };

  const handleSaveForm = (data: Partial<ProfExtraCourse>) => {
    if (editingExtraCourse) {
      setExtraCourses((prev) =>
        prev.map((c) =>
          c.id === editingExtraCourse.id
            ? ({
                ...c,
                ...data,
                status: c.status === "draft" ? "open" : c.status,
              } as ProfExtraCourse)
            : c,
        ),
      );
      showToast("비교과 강의 수정이 완료되었습니다! 📝");
    } else {
      const newCourse: ProfExtraCourse = {
        id: "ec" + Date.now(),
        title: data.title || "",
        cat: data.cat || "기타",
        type: data.type || "온라인",
        desc: data.desc || "",
        start: data.start || "",
        end: data.end || "",
        capacity: data.capacity || 0,
        applied: 0,
        status: "open",
        applyType: data.applyType || "선착순 자동 승인",
        target: data.target || "전체 학년",
      };
      setExtraCourses((prev) => [newCourse, ...prev]);
      showToast("비교과 강의가 성공적으로 등록되었습니다! 🚀");
    }
    setFormOpen(false);
    setActiveTab("extra");
  };

  const handleSaveDraft = (data: Partial<ProfExtraCourse>) => {
    if (editingExtraCourse) {
      setExtraCourses((prev) =>
        prev.map((c) =>
          c.id === editingExtraCourse.id
            ? ({ ...c, ...data, status: "draft" } as ProfExtraCourse)
            : c,
        ),
      );
    } else {
      const newCourse: ProfExtraCourse = {
        id: "ec" + Date.now(),
        title: data.title || "",
        cat: data.cat || "기타",
        type: data.type || "온라인",
        desc: data.desc || "",
        start: data.start || "",
        end: data.end || "",
        capacity: data.capacity || 0,
        applied: 0,
        status: "draft",
        applyType: data.applyType || "선착순 자동 승인",
        target: data.target || "전체 학년",
      };
      setExtraCourses((prev) => [newCourse, ...prev]);
    }
    showToast("임시저장 되었습니다.");
    setFormOpen(false);
    setActiveTab("extra");
  };

  return (
    <div className="space-y-4">
      <ProfCoursesHeader
        onRegisterClick={() => {
          setEditingExtraCourse(null);
          setFormOpen(true);
        }}
      />

      <TabBar
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as "assigned" | "extra")}
        extraCoursesCount={extraCourses.length}
      />

      {activeTab === "assigned" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
          {assignedCourses.map((course, idx) => (
            <AssignedCourseCard
              key={idx}
              course={course}
              onOpenStudentList={() => setSelectedCourseIdx(idx)}
              onNoticeWrite={() =>
                showToast(`${course.name} 공지사항 작성 페이지로 이동합니다.`)
              }
              onGradeBook={() => showToast("성적부 준비 중 📊")}
              onMaterial={() => showToast("강의 자료실 준비 중 📂")}
            />
          ))}
        </div>
      )}

      {activeTab === "extra" && (
        <div>
          {extraCourses.length === 0 ? (
            <div className="text-center py-16 text-text-muted bg-surface-main border border-dashed border-border-main rounded-r3 shadow-sh1 p-12 max-w-xl mx-auto flex flex-col items-center gap-3">
              <div className="text-[36px]">📋</div>
              <div className="text-[16px] font-bold text-text-main">
                등록된 비교과 강의가 없어요
              </div>
              <div className="text-[13px] text-text-sub">
                비교과 강의를 등록하면 수강생이 신청할 수 있어요.
              </div>
              <button
                className="mt-3 py-1.5 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-r2 border-none transition-colors cursor-pointer"
                onClick={() => {
                  setEditingExtraCourse(null);
                  setFormOpen(true);
                }}
              >
                + 비교과 강의 등록
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
              {extraCourses.map((course) => (
                <ExtraCourseCard
                  key={course.id}
                  course={course}
                  onEdit={() => {
                    setEditingExtraCourse(course);
                    setFormOpen(true);
                  }}
                  onPublish={() => handlePublish(course.id)}
                  onCloseRegistration={() => handleCloseRegistration(course.id)}
                  onViewApplicants={() =>
                    showToast("신청자 목록 준비 중이에요! 🔍")
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      <ExtraCourseFormModal
        open={formOpen}
        initialCourse={editingExtraCourse}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveForm}
        onSaveDraft={handleSaveDraft}
      />

      <CourseDetailModal
        open={selectedCourseIdx !== null}
        course={activeRosterCourse}
        onClose={() => setSelectedCourseIdx(null)}
        onOpenStudent={handleOpenStudentFromCourse}
      />

      <StudentDetailModal
        open={selectedStudentIdx !== null}
        student={activeStudent}
        onClose={() => setSelectedStudentIdx(null)}
      />
    </div>
  );
};
