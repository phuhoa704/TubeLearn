import React from "react";

export const ProfStudentsKpis: React.FC = () => {
  const kpis = [
    {
      label: "담당 강의",
      value: "3",
      unit: "개",
      sub: "총 127명 수강 중",
      borderCls: "border-l-primary",
      valueCls: "text-text-main",
      subCls: "text-text-sub",
    },
    {
      label: "위험 학생",
      value: "3",
      unit: "명",
      sub: "즉시 개입 필요",
      borderCls: "border-l-[#ef4444]",
      valueCls: "text-[#ef4444]",
      subCls: "text-[#ef4444]",
    },
    {
      label: "주의 학생",
      value: "8",
      unit: "명",
      sub: "모니터링 필요",
      borderCls: "border-l-[#f59e0b]",
      valueCls: "text-[#f59e0b]",
      subCls: "text-[#f59e0b]",
    },
    {
      label: "평균 참여율",
      value: "72",
      unit: "%",
      sub: "↗ 전주 대비 +4%",
      borderCls: "border-l-ok",
      valueCls: "text-ok",
      subCls: "text-ok",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      {kpis.map((kpi, idx) => (
        <div key={idx} className={`bg-surface-main border border-border-main rounded-r3 shadow-sh1 p-5 border-l-4 ${kpi.borderCls}`}>
          <div className="text-[13px] text-text-sub mb-2">{kpi.label}</div>
          <div
            className={`text-3xl font-extrabold flex items-baseline ${kpi.valueCls}`}
          >
            {kpi.value}
            <span className="text-sm font-medium text-text-sub ml-0.5">
              {kpi.unit}
            </span>
          </div>
          <div className={`text-xs mt-1.5 font-medium ${kpi.subCls}`}>
            {kpi.sub}
          </div>
        </div>
      ))}
    </div>
  );
};
