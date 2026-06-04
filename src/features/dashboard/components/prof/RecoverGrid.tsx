import type { RecoverEntry } from "../../../../types/professor";

export const RecoverGrid = ({ entries }: { entries: RecoverEntry[] }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-[14px] font-extrabold text-text-main">
          이번 주 회복 사례
        </div>
        <button className="text-[12.5px] font-bold text-primary bg-transparent border-none cursor-pointer hover:underline">
          전체 보기
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-surface-main border border-border-main border-l-[3px] border-l-ok rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-extrabold text-text-main">
                  {entry.name}
                </span>
                <span className="text-[11px] text-text-muted">
                  {entry.dept}
                </span>
              </div>
              <span className="text-[9.5px] font-black bg-ok-bg text-ok px-2 py-0.5 rounded-full border border-ok/20">
                {entry.badge} 회복
              </span>
            </div>
            <div className="text-[12px] text-text-sub mb-3 leading-relaxed">
              {entry.desc}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11.5px]">
                <span className="text-text-muted">ERDI</span>
                <span className="font-bold text-err">{entry.erdi_before}</span>
                <span className="text-text-muted">→</span>
                <span className="font-bold text-ok">{entry.erdi_after}</span>
              </div>
              <span className="text-[11px] font-bold text-ok ml-auto">
                {entry.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
