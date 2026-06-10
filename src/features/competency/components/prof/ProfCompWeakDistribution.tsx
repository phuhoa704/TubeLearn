import React from "react";
import type { ProfCompDef } from "../../../../types/competency";

interface WeakByCompItem {
  compIdx: number;
  count: number;
  pct: number;
}

interface ProfCompWeakDistributionProps {
  weakByComp?: WeakByCompItem[];
  defs: ProfCompDef[];
  weakFilter: string;
  onSelectComp: (compIdx: string) => void;
}

export const ProfCompWeakDistribution: React.FC<
  ProfCompWeakDistributionProps
> = ({ weakByComp, defs, weakFilter, onSelectComp }) => {
  return (
    <div className="lg:col-span-5 bg-surface-main border border-border-main rounded-r2 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[15px] font-extrabold text-text-main">
            역량별 취약학생
          </h2>
          <span className="text-xs text-text-muted bg-surface-alt px-2.5 py-0.5 rounded-full">
            50점 미만 기준
          </span>
        </div>
        <p className="text-[12px] text-text-sub mb-4">
          클릭하면 해당 역량 취약 학생 목록을 확인해요
        </p>
      </div>

      <div className="space-y-2.5 overflow-y-auto max-h-75 pr-1 scrollbar-none">
        {weakByComp?.map((w) => {
          const def = defs[w.compIdx] || { lbl: "—", col: "var(--primary)" };
          const pct = w.pct;
          const severity = pct > 25 ? "red" : pct > 15 ? "warn" : "ok";
          const sevColors = {
            red: "text-red-500",
            warn: "text-amber-500",
            ok: "text-emerald-500",
          };
          const isSelected = weakFilter === String(w.compIdx);

          return (
            <div
              key={w.compIdx}
              className={`p-2 rounded-r2 cursor-pointer border hover:bg-surface-alt transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-transparent"
              }`}
              onClick={() => {
                onSelectComp(String(w.compIdx));
                document
                  .getElementById("compWeakListSection")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: def.col }}
                  />
                  <span className="text-sm font-bold text-text-main">
                    {def.lbl}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-extrabold ${sevColors[severity]}`}
                  >
                    {w.count}명
                  </span>
                  <span className="text-xs text-text-muted font-bold">
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: def.col,
                    opacity: 0.85,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
