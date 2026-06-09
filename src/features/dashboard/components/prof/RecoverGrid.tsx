import type { RecoverEntry } from "../../../../types/student";
import { cn } from "../../../../lib/utils";

export const RecoverGrid = ({ entries }: { entries: RecoverEntry[] }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-extrabold text-text-main">
          이번 주 회복 사례
        </div>
        <button className="text-xs font-bold text-primary bg-transparent border-none cursor-pointer hover:underline">
          전체 보기
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 bg-surface-alt rounded-r2 border border-border-main"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-text-main">
                    {entry.name}
                  </span>
                  {entry.dept && (
                    <span className="text-xs text-text-muted">
                      {entry.dept}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    entry.badgeCls === "r3"
                      ? "bg-normal-bg text-normal"
                      : "bg-blue-bg text-blue-text",
                  )}
                >
                  {entry.badge}
                </span>
              </div>
              <div className="text-xs text-text-sub mb-2.5 leading-relaxed">
                {entry.desc}
              </div>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              {entry.flow.map((step, idx) => (
                <div key={idx} className="flex items-center">
                  {idx > 0 && (
                    <span className="text-text-muted text-xs mx-1.5 select-none">
                      →
                    </span>
                  )}
                  <span
                    className="w-2 h-2 rounded-full inline-block mr-1.5 shrink-0"
                    style={{ backgroundColor: step.col }}
                  />
                  <span className="text-xs text-text-sub">{step.txt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
