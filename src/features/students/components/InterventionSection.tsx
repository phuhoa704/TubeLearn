import React from "react";
import type { ProfStudentDetail } from "../../../types/student";
import { showToast } from "../../../lib/toast";
import { Button } from "../../../components/ui";

interface InterventionSectionProps {
  students: ProfStudentDetail[];
  onSelectStudent: (index: number) => void;
  onViewAll?: () => void;
}

export const InterventionSection: React.FC<InterventionSectionProps> = ({
  students,
  onSelectStudent,
  onViewAll,
}) => {
  const getSubText = (student: ProfStudentDetail) => {
    if (student.name === "김민준") {
      return "웹 개발 입문 · 14일 미접속";
    }
    if (student.name === "이수빈") {
      return "데이터 분석 · 과제 3개 미제출";
    }
    if (student.name === "박서연") {
      return "Python 기초 · 참여율 28%";
    }
    return `${student.dept} · 위험도 ${student.risk}`;
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      showToast("전체 수강생 현황 목록을 불러옵니다.");
    }
  };

  return (
    <div className="bg-surface-main border border-border-main rounded-r3 shadow-sh1 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-text-main">
          즉시 개입 필요 학생
        </h2>
        <Button
          variant="primary"
          size="sm"
          className="text-xs"
          onClick={handleViewAll}
        >
          전체보기
        </Button>
      </div>

      <div className="flex flex-col gap-2.5">
        {students.map((student, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-[#fff5f5] rounded-r2 border-l-[3px] border-l-[#ef4444] cursor-pointer hover:bg-[#ffebeb] transition-colors"
            onClick={() => onSelectStudent(idx)}
          >
            <div className="w-9 h-9 rounded-full bg-[#fee2e2] flex items-center justify-center text-[14px] font-extrabold text-[#991b1b] shrink-0">
              {student.av}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-text-main">
                {student.name}
              </div>
              <div className="text-[12px] text-text-sub truncate">
                {getSubText(student)}
              </div>
            </div>
            <span className="text-[11px] font-bold bg-[#fee2e2] text-[#991b1b] py-0.75 px-2.25 rounded-full shrink-0">
              위험도 {student.risk.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
