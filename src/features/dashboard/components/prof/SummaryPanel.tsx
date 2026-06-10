import {
  DASH_GOOD,
  DASH_WARN,
  TREND_WEEKS,
  TREND_RECOVER,
  TREND_SLA,
} from "../../../../mocks/dashboard";
import { showToast } from "../../../../lib/toast";
import { cn } from "../../../../lib/utils";

export const SummaryPanel = () => {
  const w = 520;
  const h = 160;
  const pL = 36;
  const pB = 28;
  const pT = 10;
  const pR = 20;
  const plotW = w - pL - pR;
  const plotH = h - pT - pB;

  const xs = TREND_WEEKS.map(
    (_, i) => pL + i * (plotW / (TREND_WEEKS.length - 1)),
  );
  const yS = (v: number) => pT + plotH - (v / 100) * plotH;

  const rPts = TREND_RECOVER.map((v, i) => `${xs[i]},${yS(v)}`).join(" ");
  const sPts = TREND_SLA.map((v, i) => `${xs[i]},${yS(v)}`).join(" ");

  return (
    <div>
      <div className="py-4 px-5 mb-4 bg-surface-alt border border-border-main rounded-r2">
        <div className="text-sm font-bold text-text-main mb-3 flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" />
            <path d="M8 7v3M8 5v.5" />
          </svg>
          이번 주 한 줄 요약
        </div>
        <div className="text-sm text-text-main leading-relaxed">
          수강생 127명 중 <strong>위험 학생 8명 (Critical)</strong> ·{" "}
          <strong>회복 사례 5건</strong>으로 회복률이 지난주 대비{" "}
          <strong className="text-ok">+12%p 개선</strong>됐어요. 다만{" "}
          <strong>컴퓨터공학과 1학년</strong>의 무학습 공백 신호(S01)가 평균
          대비 <strong>2배</strong>로 누적되니 다음 주 우선 점검 권장.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-surface-main border border-border-main border-t-[3px] border-t-ok rounded-r3 p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 7l4 4 6-7" />
            </svg>
            <span className="text-sm font-extrabold text-text-main">
              잘 된 것 ({DASH_GOOD.length})
            </span>
            <span className="text-[11px] font-bold bg-normal-bg text-normal px-2 py-1 rounded-full ml-auto">
              +12%p 회복률
            </span>
          </div>
          <div className="">
            {DASH_GOOD.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2.5 text-[12px] py-2",
                  i === DASH_GOOD.length - 1
                    ? "border-none"
                    : "border-b border-b-border-main",
                )}
              >
                <div className="w-5 h-5 rounded-full bg-normal-bg flex items-center justify-center text-normal shrink-0 mt-0.5 border border-ok/15">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-text-main">
                    {item.title}
                  </div>
                  <div className="text-text-muted mt-0.5 text-[11px] leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-main border border-border-main border-t-[3px] border-t-warn rounded-r3 p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M7 2l5.5 10H1.5L7 2z" />
              <path d="M7 6v3M7 10.5v.5" />
            </svg>
            <span className="text-sm font-extrabold text-text-main">
              다음 주 주의할 것 ({DASH_WARN.length})
            </span>
            <span className="text-[11px] font-bold bg-warn-bg text-[#854d0e] px-2 py-1 rounded-full ml-auto">
              우선순위 정렬
            </span>
          </div>
          <div className="">
            {DASH_WARN.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2.5 text-[12px] py-2",
                  i === DASH_WARN.length - 1
                    ? "border-none"
                    : "border-b border-b-border-main",
                )}
              >
                <div className="w-5 h-5 rounded-full bg-warn-bg flex items-center justify-center text-warn shrink-0 mt-0.5 border border-warn/15">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 2l4.5 8H1.5L6 2z" />
                    <path d="M6 5.5v2M6 8.5v.3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-text-main">
                    {item.title}
                  </div>
                  <div className="text-text-muted mt-0.5 text-[11px] leading-relaxed">
                    {item.desc}
                  </div>
                  {item.link && (
                    <button
                      onClick={() =>
                        showToast(
                          `${item.title} 상세 분석 페이지로 이동합니다.`,
                        )
                      }
                      className="text-[10px] font-bold text-primary mt-1 bg-transparent border-none cursor-pointer block"
                    >
                      {item.link}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface-main border border-border-main rounded-xl p-5">
        <div className="text-base font-extrabold text-text-main mb-0.5">
          이번 주 핵심 지표 추이
        </div>
        <div className="text-xs text-text-muted mb-4">
          4주차 ~ 10주차 · 회복률 및 처리 마감 준수율
        </div>

        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${w} ${h + 4}`}
            className="w-full min-w-[320px]"
            // style={{ height: 164 }}
          >
            {[0, 25, 50, 75, 100].map((v) => {
              const y = yS(v);
              return (
                <g key={v}>
                  <line
                    x1={pL}
                    y1={y}
                    x2={w - pR}
                    y2={y}
                    stroke="var(--bd)"
                    strokeWidth="1"
                  />
                  <text
                    x={pL - 6}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="10"
                    className="fill-text-muted font-medium"
                  >
                    {v}%
                  </text>
                </g>
              );
            })}

            {TREND_WEEKS.map((lbl, i) => (
              <text
                key={lbl}
                x={xs[i]}
                y={h}
                textAnchor="middle"
                fontSize="10"
                className="fill-text-muted font-medium"
              >
                {lbl}
              </text>
            ))}

            <polyline
              points={rPts}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {TREND_RECOVER.map((v, i) => (
              <circle
                key={i}
                cx={xs[i]}
                cy={yS(v)}
                r="3.5"
                fill="#10b981"
                stroke="var(--sur)"
                strokeWidth="1.5"
              />
            ))}

            <polyline
              points={sPts}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeDasharray="6,3"
            />
            {TREND_SLA.map((v, i) => (
              <circle
                key={i}
                cx={xs[i]}
                cy={yS(v)}
                r="3.5"
                fill="#6366f1"
                stroke="var(--sur)"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>

        <div className="flex gap-6 mt-4">
          {[
            { color: "#10b981", label: "회복률 (73%)", dash: false },
            { color: "#6366f1", label: "처리 마감 준수율 (92%)", dash: true },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={cn("w-5 h-0.5 rounded-full")}
                style={{
                  background: l.color,
                }}
              />
              <span className="text-xs text-text-muted font-semibold">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
