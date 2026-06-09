import React, { useState } from "react";
import {
  ProfStudentsHeader,
  ProfStudentsKpis,
  InterventionSection,
  CourseStatusSection,
  StudentDetailModal,
  CourseDetailModal,
} from "../../features/prof/students/components";
import { PROF_STUDENTS_MOCK, COURSE_DATA_MOCK } from "../../mocks/student";
import { showToast } from "../../lib/toast";

export const Students: React.FC = () => {
  const [selectedStudentIdx, setSelectedStudentIdx] = useState<number | null>(
    null,
  );
  const [selectedCourseIdx, setSelectedCourseIdx] = useState<number | null>(
    null,
  );

  const activeStudent =
    selectedStudentIdx !== null ? PROF_STUDENTS_MOCK[selectedStudentIdx] : null;
  const activeCourse =
    selectedCourseIdx !== null ? COURSE_DATA_MOCK[selectedCourseIdx] : null;

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

  return (
    <div className="space-y-4">
      <ProfStudentsHeader />
      <ProfStudentsKpis />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
        <InterventionSection
          students={PROF_STUDENTS_MOCK}
          onSelectStudent={(idx) => setSelectedStudentIdx(idx)}
        />
        <CourseStatusSection
          courses={COURSE_DATA_MOCK}
          onSelectCourse={(idx) => setSelectedCourseIdx(idx)}
        />
      </div>

      <StudentDetailModal
        open={selectedStudentIdx !== null}
        student={activeStudent}
        onClose={() => setSelectedStudentIdx(null)}
      />

      <CourseDetailModal
        open={selectedCourseIdx !== null}
        course={activeCourse}
        onClose={() => setSelectedCourseIdx(null)}
        onOpenStudent={handleOpenStudentFromCourse}
      />
    </div>
  );
};

export default Students;
