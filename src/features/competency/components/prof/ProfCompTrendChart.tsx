import React from "react";
import { Button } from "../../../../components/ui";

interface TrendSeriesItem {
  lbl: string;
  data: number[];
  col: string;
}

interface TrendData {
  labels: string[];
  series: TrendSeriesItem[];
}

interface ProfCompTrendChartProps {
  trend: TrendData;
  period: "month" | "week";
  target: number;
  onPeriodChange: (p: "month" | "week") => void;
}

export const ProfCompTrendChart: React.FC<ProfCompTrendChartProps> = ({
  trend,
  period,
  target,
  onPeriodChange,
}) => {
  const w = 480;
  const h = 180;
  const pL = 36;
  const pB = 28;
  const pT = 12;
  const pR = 16;
  const plotW = w - pL - pR;
  const plotH = h - pT - pB;
  const maxV = 100;
  const minV = 30;

  const xs = trend.labels.map(
    (_, i) => pL + i * (plotW / (trend.labels.length - 1)),
  );
  const yS = (v: number) => pT + plotH - ((v - minV) / (maxV - minV)) * plotH;

  return (
    <div className="lg:col-span-7 bg-surface-main border border-border-main rounded-r2 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[15px] font-extrabold text-text-main">
            역량 성장 추이
          </h2>
          <div className="flex gap-1.5">
            <Button
              size="sm"
              className="text-xs rounded-r2 py-1! px-3!"
              variant={period === "month" ? "outline" : "ghost"}
              onClick={() => onPeriodChange("month")}
            >
              월별
            </Button>
            <Button
              size="sm"
              className="text-xs rounded-r2 py-1! px-3!"
              variant={period === "week" ? "outline" : "ghost"}
              onClick={() => onPeriodChange("week")}
            >
              주별
            </Button>
          </div>
        </div>
        <p className="text-[12px] text-text-sub mb-4">
          전체 수강생 역량 점수 변화 · 목표: <strong>{target}점</strong>
        </p>
      </div>

      <div className="w-full overflow-x-auto select-none mt-1">
        <svg
          viewBox={`0 0 ${w} ${h + 4}`}
          width="100%"
          className="min-w-90 overflow-visible"
        >
          {[40, 55, 70, 85].map((v) => {
            const y = yS(v);
            return (
              <g key={v}>
                <line
                  x1={pL}
                  y1={y}
                  x2={w - pR}
                  y2={y}
                  stroke="currentColor"
                  className="text-border-main opacity-20"
                  strokeWidth="1"
                />
                <text
                  x={pL - 6}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[9px] fill-text-sub font-semibold"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {(() => {
            const tY = yS(target);
            return (
              <g>
                <line
                  x1={pL}
                  y1={tY}
                  x2={w - pR}
                  y2={tY}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="5,3"
                />
                <text
                  x={w - pR + 4}
                  y={tY + 4}
                  className="text-[9px] fill-[#94a3b8] font-bold"
                >
                  목표
                </text>
              </g>
            );
          })()}

          {trend.labels.map((lbl, i) => (
            <text
              key={lbl}
              x={xs[i]}
              y={h - 4}
              textAnchor="middle"
              className="text-[9.5px] fill-text-sub font-bold"
            >
              {lbl}
            </text>
          ))}

          {trend.series.map((ser) => {
            const points = ser.data
              .map((v, i) => `${xs[i]},${yS(v)}`)
              .join(" ");
            const lastVal = ser.data[ser.data.length - 1];
            return (
              <g key={ser.lbl}>
                <polyline
                  points={points}
                  fill="none"
                  stroke={ser.col}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {ser.data.map((v, i) => (
                  <circle
                    key={i}
                    cx={xs[i]}
                    cy={yS(v)}
                    r="3"
                    fill={ser.col}
                    stroke="var(--surface-main)"
                    strokeWidth="1.5"
                  />
                ))}
                <text
                  x={xs[xs.length - 1] + 6}
                  y={yS(lastVal) + 3}
                  className="text-[9px] font-extrabold"
                  fill={ser.col}
                >
                  {lastVal}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-[11px] text-text-sub font-semibold">
        {trend.series.map((s) => (
          <div key={s.lbl} className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-1 rounded-sm shrink-0"
              style={{ backgroundColor: s.col }}
            />
            <span>{s.lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
