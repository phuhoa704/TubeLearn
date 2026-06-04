import {
  SUMMARY_GOOD,
  SUMMARY_WARN,
  TREND_DATA,
} from "../../../../mocks/dashboard";

export const SummaryPanel = () => {
  const W = 400;
  const H = 80;
  const MIN = 40;
  const RANGE = 60;

  const toPoints = (values: number[]) =>
    values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * W;
        const y = H - ((v - MIN) / RANGE) * H;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const recoverPts = toPoints(TREND_DATA.map((d) => d.recover));
  const slaPts = toPoints(TREND_DATA.map((d) => d.sla));

  return (
    <div>
      <div className="p-5 mb-5 bg-surface-main border border-border-main rounded-xl">
        <div className="text-[14px] font-bold text-text-main mb-3 flex items-center gap-2">
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
        <div className="text-[13.5px] text-text-main leading-relaxed">
          수강생 127명 중 <strong>위험 학생 8명 (Critical)</strong> ·{" "}
          <strong>회복 사례 5건</strong>으로 회복률이 지난주 대비{" "}
          <strong className="text-ok">+12%p 개선</strong>됐어요. 다만{" "}
          <strong>컴퓨터공학과 1학년</strong>의 무학습 공백 신호(S01)가 평균
          대비 <strong>2배</strong>로 누적되니 다음 주 우선 점검 권장.
        </div>
      </div>

      {/* Good / Warn grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-surface-main border border-border-main border-l-[3px] border-l-ok rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M2 7l4 4 6-7" />
            </svg>
            <span className="text-[13px] font-extrabold text-text-main">
              잘 된 것 ({SUMMARY_GOOD.length})
            </span>
            <span className="text-[10px] font-black bg-ok-bg text-ok px-2 py-0.5 rounded-full border border-ok/20 ml-auto">
              +12%p 회복률
            </span>
          </div>
          <div className="space-y-2">
            {SUMMARY_GOOD.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[12px] text-text-sub"
              >
                <span className="text-ok shrink-0 mt-0.5">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-main border border-border-main border-l-[3px] border-l-[#f59e0b] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#d97706"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M7 2l5.5 10H1.5L7 2z" />
              <path d="M7 6v3M7 10.5v.5" />
            </svg>
            <span className="text-[13px] font-extrabold text-text-main">
              다음 주 주의할 것 ({SUMMARY_WARN.length})
            </span>
            <span className="text-[10px] font-black bg-[#fef3c7] text-[#d97706] px-2 py-0.5 rounded-full border border-[#f59e0b]/20 ml-auto">
              우선순위 정렬
            </span>
          </div>
          <div className="space-y-2">
            {SUMMARY_WARN.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[12px] text-text-sub"
              >
                <span className="text-[#d97706] shrink-0 mt-0.5">⚠</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface-main border border-border-main rounded-xl p-5">
        <div className="text-[15px] font-extrabold text-text-main mb-0.5">
          이번 주 핵심 지표 추이
        </div>
        <div className="text-[12px] text-text-muted mb-4">
          4주차 ~ 8주차 · 회복률 및 처리 마감 준수율
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: 90 }}
          preserveAspectRatio="none"
        >
          {[0.25, 0.5, 0.75].map((f, i) => (
            <line
              key={i}
              x1="0"
              y1={H * f}
              x2={W}
              y2={H * f}
              stroke="var(--bd)"
              strokeWidth="0.8"
            />
          ))}
          <polygon
            points={`0,${H} ${recoverPts} ${W},${H}`}
            fill="#10b981"
            fillOpacity="0.08"
          />
          <polygon
            points={`0,${H} ${slaPts} ${W},${H}`}
            fill="#6366f1"
            fillOpacity="0.06"
          />
          <polyline
            points={recoverPts}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={slaPts}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {TREND_DATA.map((d, i) => {
            const x = (i / (TREND_DATA.length - 1)) * W;
            const yR = H - ((d.recover - MIN) / RANGE) * H;
            const yS = H - ((d.sla - MIN) / RANGE) * H;
            return (
              <g key={i}>
                <circle cx={x} cy={yR} r="3.5" fill="#10b981" />
                <circle cx={x} cy={yS} r="3.5" fill="#6366f1" />
              </g>
            );
          })}
        </svg>
        <div className="flex justify-between mt-1 mb-4">
          {TREND_DATA.map((d, i) => (
            <span
              key={i}
              className="text-[10.5px] text-text-muted font-semibold"
            >
              {d.week}
            </span>
          ))}
        </div>
        <div className="flex gap-6">
          {[
            { color: "#10b981", label: "회복률 (73%)" },
            { color: "#6366f1", label: "처리 마감 준수율 (92%)" },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-5 h-0.5 rounded-full"
                style={{ background: l.color }}
              />
              <span className="text-[11.5px] text-text-muted">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
