import React from "react";

interface KpiItem {
  lbl: string;
  val: string;
  sub: string;
  col: string;
}

interface ProfCompKpisProps {
  kpis: KpiItem[];
}

export const ProfCompKpis: React.FC<ProfCompKpisProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
      {kpis.map((k, idx) => (
        <div
          key={idx}
          className="bg-surface-main border border-border-main rounded-r2 p-5 shadow-sm transition-all"
          style={{ borderLeftWidth: "4px", borderLeftColor: k.col }}
        >
          <div className="text-xs font-semibold text-text-sub mb-1.5">
            {k.lbl}
          </div>
          <div
            className="text-[28px] font-black tracking-tight mb-1"
            style={{ color: k.col }}
          >
            {k.val}
          </div>
          <div className="text-xs text-text-sub">{k.sub}</div>
        </div>
      ))}
    </div>
  );
};
