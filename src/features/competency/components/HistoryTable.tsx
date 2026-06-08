import { COMP6 } from "../../../mocks/competency";
import type { CompScore } from "../../../types/competency";
import { cn } from "../../../lib/utils";

interface Props {
  scores?: CompScore[];
  totalScore?: number;
}

export function HistoryTable({ scores = [], totalScore = 79 }: Props) {
  const activeScores = scores.length > 0 ? scores : [];

  return (
    <div className="hist-card bg-surface-main border border-border-main rounded-r3 stat shadow-sh1 mb-4">
      <div className="hist-t text-[14px] font-bold text-text-main mb-3 flex items-center gap-2">
        <div className="sec-icon text-text-muted">
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <rect x="2" y="3" width="12" height="11" rx="2" />
            <path d="M5 1v3M11 1v3M2 7h12" />
          </svg>
        </div>
        진단 이력
      </div>

      <div className="overflow-x-auto">
        <table
          className="hist-table w-full border-collapse text-[13px]"
          id="histTable"
        >
          <thead>
            <tr>
              <th className="px-2.5 py-2 text-left text-[10.5px] font-bold text-text-muted uppercase tracking-wider border-b-[1.5px] border-border-main">
                진단일
              </th>
              <th className="px-2.5 py-2 text-left text-[10.5px] font-bold text-text-muted uppercase tracking-wider border-b-[1.5px] border-border-main">
                종합
              </th>
              {COMP6.map((c) => (
                <th
                  key={c.id}
                  className="px-2.5 py-2 text-left text-[10.5px] font-bold text-text-muted uppercase tracking-wider border-b-[1.5px] border-border-main"
                >
                  {c.name.slice(0, 3)}
                </th>
              ))}
              <th className="px-2.5 py-2 text-left text-[10.5px] font-bold text-text-muted uppercase tracking-wider border-b-[1.5px] border-border-main">
                변화
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1: Latest dynamic row */}
            <tr className="hover:bg-surface-alt transition-colors">
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub font-medium">
                <b>2026.05.12</b>{" "}
                <span className="badge badge-p text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary ml-1 inline-block align-middle">
                  최신
                </span>
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-primary font-bold">
                {totalScore}
              </td>
              {COMP6.map((c) => {
                const s = activeScores.find(
                  (scoreItem) => scoreItem.compId === c.id,
                );
                return (
                  <td
                    key={c.id}
                    className="px-2.5 py-2.5 border-b border-border-main text-text-sub"
                  >
                    {s ? s.score : 0}
                  </td>
                );
              })}
              <td
                className={cn(
                  "px-2.5 py-2.5 border-b border-border-main font-bold",
                  totalScore - 73 >= 0 ? "text-ok" : "text-err",
                )}
              >
                {totalScore - 73 >= 0 ? `+${totalScore - 73}` : totalScore - 73}
              </td>
            </tr>

            {/* Row 2: Hardcoded 2025.11.15 */}
            <tr className="hover:bg-surface-alt transition-colors">
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                2025.11.15
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                73
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                72
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                79
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                68
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                62
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                55
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-text-sub">
                76
              </td>
              <td className="px-2.5 py-2.5 border-b border-border-main text-ok font-bold">
                +5
              </td>
            </tr>

            {/* Row 3: Hardcoded 2025.04.10 */}
            <tr className="hover:bg-surface-alt transition-colors">
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">
                2025.04.10
              </td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">68</td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">65</td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">74</td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">65</td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">58</td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">50</td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-sub">74</td>
              <td className="px-2.5 py-2.5 border-b-0 text-text-muted font-bold">
                기준
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
