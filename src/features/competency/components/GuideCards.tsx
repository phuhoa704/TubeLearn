import { GUIDE_CARDS } from "../../../mocks/competency";

export function GuideCards() {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5 max-sm:grid-cols-1">
      {GUIDE_CARDS.map((g) => (
        <div
          key={g.title}
          className="bg-surface-main border border-border-main rounded-r2 p-4 flex flex-col items-center text-center gap-1.5"
        >
          <div className="w-9.5 h-9.5 rounded-r1 bg-primary-light text-primary flex items-center justify-center mb-0.5">
            {g.icon}
          </div>
          <div className="text-sm font-bold text-text-main">{g.title}</div>
          <div className="text-xs text-text-muted">{g.desc}</div>
        </div>
      ))}
    </div>
  );
}
