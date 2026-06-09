import React from "react";
import { Button } from "../../../../components/ui";

interface ProfCoursesHeaderProps {
  onRegisterClick: () => void;
}

export const ProfCoursesHeader: React.FC<ProfCoursesHeaderProps> = ({
  onRegisterClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
      <div>
        <h1 className="text-[24px] font-extrabold text-text-main tracking-[-0.3px] mb-1">강의 관리</h1>
        <p className="text-[14px] text-text-sub mb-2">담당 강의 현황을 확인하고, 비교과 강의를 등록하세요</p>
      </div>
      <Button
        variant="primary"
        size="sm"
        onClick={onRegisterClick}
        className="flex items-center gap-1.5 font-bold shrink-0 self-start sm:self-auto"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M7 2v10M2 7h10" />
        </svg>
        비교과 강의 등록
      </Button>
    </div>
  );
};
