import type { CompScore } from "../../../types/competency";
import { COMP6 } from "../../../mocks/competency";
import { cn } from "../../../lib/utils";

interface Props {
  scores: CompScore[];
}

export function RadarChart({ scores }: Props) {
  const cx = 110,
    cy = 110,
    R = 82;
  const n = scores.length;

  const rings = [0.25, 0.5, 0.75, 1.0];

  const pt = (r: number, i: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const polyPoints = (values: number[]) =>
    values
      .map((v, i) => {
        const p = pt(R * (v / 100), i);
        return `${p.x},${p.y}`;
      })
      .join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 220 220" className="w-full max-w-60">
        {rings.map((ring, ri) => (
          <polygon
            key={ri}
            points={Array.from({ length: n }, (_, i) => {
              const p = pt(R * ring, i);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="var(--bd)"
            strokeWidth="1"
          />
        ))}

        {scores.map((_, i) => {
          const p = pt(R, i);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="var(--bd)"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={polyPoints(scores.map((s) => s.avg))}
          fill="var(--tx3)"
          fillOpacity={0.1}
          stroke="var(--tx3)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        <polygon
          points={polyPoints(scores.map((s) => s.score))}
          fill="var(--p)"
          fillOpacity={0.18}
          stroke="var(--p)"
          strokeWidth="2.5"
        />

        {scores.map((s, i) => {
          const p = pt(R * (s.score / 100), i);
          const comp = COMP6.find((c) => c.id === s.compId);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="5"
              fill={comp?.color || "var(--p)"}
              stroke="var(--sur)"
              strokeWidth="2.5"
            />
          );
        })}

        {scores.map((s, i) => {
          const lp = pt(R + 18, i);
          const anc =
            lp.x < cx - 4 ? "end" : lp.x > cx + 4 ? "start" : "middle";

          return (
            <text
              key={i}
              x={lp.x}
              y={lp.y + 4}
              textAnchor={anc}
              fontSize="10"
              fontWeight="600"
              fill="var(--tx2)"
              fontFamily="var(--f)"
            >
              {s.score}
            </text>
          );
        })}
      </svg>
      <div className="flex gap-3.5 mt-2 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-4.5 h-0.5 bg-primary rounded-sm" />나
        </div>
        <div className="flex items-center gap-1.5">
          <div
            style={{ width: 18, height: 0, borderTop: "2px dashed var(--tx3)" }}
          />
          동기평균
        </div>
      </div>
    </div>
  );
}

export function ScoreBars({ scores }: Props) {
  return (
    <div className="flex flex-col gap-3.5" id="scoreBars">
      {scores.map((s) => {
        const comp = COMP6.find((item) => item.id === s.compId);
        const color = comp?.color || "var(--p)";
        const d = s.score - s.prev;
        const displayName =
          s.name.length > 7 ? `${s.name.slice(0, 7)}…` : s.name;

        return (
          <div
            key={s.compId}
            className="sbar flex items-center gap-2.25 py-0.5"
          >
            <div className="sbar-ic w-5 flex items-center justify-center shrink-0">
              <div
                className="w-2.25 h-2.25 rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>

            <div className="sbar-lbl text-xs font-semibold text-text-sub w-22.5 shrink-0 truncate">
              {displayName}
            </div>
            <div className="sbar-bg flex-1 h-1.5 bg-surface-alt rounded-full overflow-hidden">
              <div
                className="sbar-fill h-full rounded-full transition-[width] duration-750"
                style={{ width: `${s.score}%`, backgroundColor: color }}
              />
            </div>

            <div className="sbar-r flex items-center gap-1.5 min-w-16 justify-end">
              <span className="sbar-sc text-[13px] font-extrabold text-text-main">
                {s.score}
              </span>
              <span
                className={cn(
                  "sbar-ch text-[11px] font-semibold",
                  d >= 0 ? "up text-ok" : "dn text-err",
                )}
              >
                {d >= 0 ? "↑" : "↓"}
                {Math.abs(d)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DetailCards({ scores }: Props) {
  return (
    <div
      className="detail6 grid grid-cols-3 gap-2.75 mb-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1"
      id="detail6"
    >
      {scores.map((s) => {
        const comp = COMP6.find((c) => c.id === s.compId);
        const color = comp?.color || "var(--p)";
        const lvl = s.score >= 80 ? "high" : s.score >= 65 ? "mid" : "low";
        const levelLabel =
          lvl === "high" ? "우수" : lvl === "mid" ? "보통" : "개선 필요";
        const badgeCls =
          lvl === "high"
            ? "bg-ok-bg text-ok"
            : lvl === "mid"
              ? "bg-warn-bg text-warn"
              : "bg-err-bg text-err";

        return (
          <div
            key={s.compId}
            className="dcard bg-surface-main border border-border-main rounded-r3 p-3.75 shadow-sh1"
          >
            <div className="dcard-top flex items-center gap-2 mb-2.5">
              <div
                className="dcard-ic w-7.5 h-7.5 rounded-r1 flex items-center justify-center shrink-0 text-white"
                style={{ backgroundColor: color }}
              >
                {comp?.icon}
              </div>
              <div className="dcard-name text-[12.5px] font-bold text-text-main">
                {s.name}
              </div>
            </div>

            <div
              className="dcard-score text-[26px] font-black tracking-[-0.5px] mb-1.25"
              style={{ color }}
            >
              {s.score}
            </div>

            <div
              className={cn(
                "dlevel text-[11px] font-bold px-2 py-0.5 rounded-full inline-block mb-2",
                lvl === "high" ? "l-high" : lvl === "mid" ? "l-mid" : "l-low",
                badgeCls,
              )}
            >
              {levelLabel}
            </div>

            <div className="dsubs flex flex-col gap-1.25">
              {s.subItems.map((sub) => (
                <div
                  key={sub.label}
                  className="dsub flex items-center gap-1.75 text-[11px] text-text-sub"
                >
                  <span className="flex-[0_0_68px] overflow-hidden text-ellipsis whitespace-nowrap shrink-0">
                    {sub.label}
                  </span>
                  <div className="dsub-bg flex-1 h-1 bg-surface-alt rounded-full overflow-hidden">
                    <div
                      className="dsub-fill h-full rounded-full transition-[width] duration-750"
                      style={{ width: `${sub.score}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="dsub-sc text-[11px] font-bold text-text-muted min-w-5 text-right">
                    {sub.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
