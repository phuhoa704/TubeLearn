import { useState } from "react";
import type { StudentEntry } from "../../../../types/professor";
import { cn } from "../../../../lib/utils";
import { showToast } from "../../../../lib/toast";

const erdiColor = (v: number) =>
  v >= 0.7
    ? "text-err font-black"
    : v >= 0.5
      ? "text-[#d97706] font-bold"
      : "text-text-main font-bold";
const trendColor = (t: string) =>
  t === "↗" ? "text-ok" : t === "↘" ? "text-err" : "text-text-muted";

export const StudentTable = ({
  students,
  showLastSeen = false,
  initialCount = 4,
}: {
  students: StudentEntry[];
  showLastSeen?: boolean;
  initialCount?: number;
}) => {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const displayed = showAll ? students : students.slice(0, initialCount);

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="space-y-1">
      <div className="hidden sm:flex items-center py-3 px-4 bg-surface-alt rounded-r2 text-[10.5px] font-bold text-text-muted">
        <div className="w-7" />
        <div className="flex-[1.4] pl-1">학생</div>
        <div className="flex-[2.2]">지금 보이는 신호</div>
        <div className="w-22 text-center">
          위험도 <br />
          (ERDI)
        </div>
        <div className="w-16 text-center">추세</div>
        <div className="w-28 text-center">
          {showLastSeen ? (
            "마지막 접속"
          ) : (
            <span>
              처리 마감 <br />
              (SLA)
            </span>
          )}
        </div>
        <div className="w-20" />
      </div>

      <div
        className={cn(
          "border-x border-b border-border-main rounded-b-xl overflow-hidden divide-y divide-border-main",
          "sm:rounded-tl-none sm:rounded-tr-none",
          "border border-border-main sm:border-t-0 rounded-xl sm:rounded-t-none",
        )}
      >
        {displayed.map((student) => (
          <div
            key={student.id}
            className={cn(
              "flex flex-wrap sm:flex-nowrap items-center gap-2 px-3 py-3 transition-colors hover:bg-surface-alt/50",
              student.urgent && "bg-err-bg/10",
            )}
          >
            <div className="w-7 shrink-0">
              <button
                onClick={() => toggle(student.id)}
                className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all",
                  selected.has(student.id)
                    ? "bg-primary border-primary"
                    : "border-border-main hover:border-primary/50",
                )}
              >
                {selected.has(student.id) && (
                  <svg
                    className="w-2.5 h-2.5"
                    fill="none"
                    viewBox="0 0 10 10"
                    stroke="white"
                    strokeWidth={2.5}
                  >
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex-[1.4] min-w-25">
              <div
                className={cn(
                  "text-[12.5px] font-bold truncate",
                  student.urgent && "text-err",
                )}
              >
                {student.urgent && (
                  <span className="inline-block w-1.5 h-1.5 bg-err rounded-full mr-1.5 mb-0.5 animate-pulse" />
                )}
                {student.name}
              </div>
              <div className="text-[10px] text-text-muted">
                {student.studentId} · {student.dept}
              </div>
            </div>

            {/* Signals */}
            <div className="flex-[2.2] flex flex-wrap gap-1">
              {student.signals.map((sig, i) => (
                <span
                  key={i}
                  className="text-[10px] font-semibold bg-err-bg text-err px-1.5 py-0.5 rounded border border-err/20"
                >
                  {sig}
                </span>
              ))}
            </div>

            {/* ERDI */}
            <div
              className={cn(
                "w-22 text-center text-[13px]",
                erdiColor(student.erdi),
              )}
            >
              {student.erdi}
            </div>

            {/* Trend */}
            <div
              className={cn(
                "w-16 text-center text-[16px] font-bold",
                trendColor(student.trend),
              )}
            >
              {student.trend}
            </div>

            <div className="w-28 text-center text-[11px] font-semibold text-text-sub">
              {showLastSeen ? student.lastSeen : student.sla}
            </div>

            <div className="w-20 flex justify-end">
              <button
                onClick={() =>
                  showToast(`${student.name} 학생에게 메시지를 보냅니다.`)
                }
                className="text-[11px] font-bold px-3 py-1 rounded-lg bg-primary-light text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                연락하기
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-[12px] text-text-muted">
          표시 {displayed.length} / {students.length}건 · 1차 자동 리마인드 발송{" "}
          {Math.ceil(students.length / 2)}건
        </span>
        {students.length > initialCount && (
          <button
            onClick={() => setShowAll((p) => !p)}
            className="text-[12.5px] font-bold text-primary bg-transparent border-none cursor-pointer hover:underline"
          >
            {showAll ? "접기" : `전체 ${students.length}건 보기`}
          </button>
        )}
      </div>
    </div>
  );
};
