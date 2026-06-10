import React from "react";

export const ProfStudentsHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
      <div>
        <h1 className="text-[24px] font-extrabold text-text-main tracking-[-0.3px] mb-1">수강생 현황</h1>
        <p className="text-[14px] text-text-sub mb-2">학생별 진도·참여율·위험도를 모니터링하세요</p>
      </div>
      <span className="text-[13px] text-text-muted px-3.5 py-1.5 border border-border-main rounded-full bg-surface-main shrink-0 w-fit self-start sm:self-auto">
        2026년 1학기
      </span>
    </div>
  );
};
