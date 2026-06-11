import { COMP6 } from "../../../../mocks/competency";

const Comp6Type = (type: string) => {
  if (type === "self") return "Self-Management";
  if (type === "res") return "Resource·Info·Tech";
  if (type === "comm") return "Communication";
  if (type === "rel") return "Interpersonal";
  if (type === "glob") return "Global";
  if (type === "think") return "Think";
};

export const Comp6Grid = () => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {COMP6.map((c) => (
        <div
          key={c.id}
          className="bg-surface-main border border-border-main rounded-r2 p-4 flex flex-col gap-2 transition-all hover:shadow-sh2"
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-10 h-10 rounded-r2 flex items-center justify-center shrink-0"
              style={{ background: `${c.color}1A`, color: c.color }}
            >
              {c.icon}
            </div>
            <div>
              <div className="text-[13px] font-extrabold text-text-main">
                {c.name} 역량
              </div>
              <div style={{ color: c.color }} className="text-[11px]">
                {Comp6Type(c.id)}
              </div>
            </div>
          </div>

          <div className="text-xs text-text-sub leading-relaxed flex-1">
            {c.desc}
          </div>

          <div className="flex flex-wrap gap-1">
            {c.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold rounded-full px-2 py-0.5 text-text-muted bg-surface-alt"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
