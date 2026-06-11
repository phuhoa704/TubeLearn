import { useState } from "react";
import type { StudentEntry } from "../../../../types/student";
import { cn } from "../../../../lib/utils";
import { showToast } from "../../../../lib/toast";
import { Button } from "../../../../components/ui";

const trendColor = (t: string) => {
  if (t.includes("↗")) return "text-ok";
  if (t.includes("↘")) return "text-err";
  return "text-text-muted";
};

const signalClass = (cls: string) => {
  if (cls === "red") return "bg-danger-bg text-danger";
  if (cls === "yellow") return "bg-[#fef9c3] text-[#854d0e]";
  if (cls === "blue") return "bg-[#dbeafe] text-[#1e40af]";
  return "bg-surface-alt text-text-sub";
};

const slaCls = (sla: string | undefined, isWatch: boolean) => {
  if (!sla) return "bg-surface-alt text-text-sub";
  if (isWatch) return "bg-surface-alt text-text-sub";
  if (sla === "urgent") return "bg-danger-bg text-danger";
  if (sla === "warn") return "bg-[#fef9c3] text-[#854d0e]";
  return "bg-surface-alt text-text-sub";
};

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
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const displayed = showAll ? students : students.slice(0, initialCount);

  const toggle = (id: string) =>
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

      <div className={cn("box-border")}>
        {displayed.map((student) => (
          <div
            key={student.id}
            className={cn(
              "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 px-4 py-3.5 sm:py-3 transition-colors bg-surface-main",
              "mb-1.5 rounded-r2 border border-border-main",
              student.urgent && "border-l-[3px] border-l-err",
            )}
          >
            <div className="flex items-center gap-3 w-full sm:w-auto sm:contents">
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

              <div className="flex-1 sm:flex-[1.4] min-w-0">
                <div className={cn("text-sm font-extrabold truncate")}>
                  {student.name}
                </div>
                <div className="text-xs text-text-muted">{student.dept}</div>
              </div>

              <div className="sm:hidden shrink-0">
                <Button
                  onClick={() =>
                    showToast(`${student.name} 학생에게 메시지를 보냅니다.`)
                  }
                  variant="outline"
                  size="sm"
                  className="text-[10.5px]! bg-primary-light! rounded-r2 font-bold px-3 py-1"
                >
                  연락하기
                </Button>
              </div>
            </div>

            <hr className="sm:hidden border-border-main/50 w-full my-0.5" />

            <div className="w-full sm:flex-[2.2] flex flex-wrap gap-1">
              {student.signals.map((sig, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-[11.5px] font-bold py-0.75 px-2.25 rounded-r1",
                    signalClass(sig.cls),
                  )}
                >
                  {sig.txt}
                </span>
              ))}
            </div>

            <div className="w-full sm:w-auto flex items-center justify-between sm:contents gap-2 mt-1 sm:mt-0">
              <div className="flex flex-col sm:block items-start sm:w-20 sm:text-center">
                <span className="sm:hidden text-[9px] font-bold text-text-muted mb-0.5">
                  위험도 (ERDI)
                </span>
                <div className="text-sm sm:text-lg font-extrabold text-text-main sm:w-20 sm:text-center">
                  {student.erdi}
                </div>
              </div>

              <div className="flex flex-col sm:block items-center sm:w-17.5 sm:text-center">
                <span className="sm:hidden text-[9px] font-bold text-text-muted mb-0.5">
                  추세
                </span>
                <div
                  className={cn(
                    "text-[13px] font-bold sm:w-17.5 sm:text-center",
                    trendColor(student.trend),
                  )}
                >
                  {student.trend.includes("↗")
                    ? student.trend.replace("↗", "↗")
                    : student.trend.includes("↘")
                      ? student.trend.replace("↘", "↘")
                      : student.trend}
                </div>
              </div>

              <div className="flex flex-col sm:block items-end sm:w-22.5 sm:text-center">
                <span className="sm:hidden text-[9px] font-bold text-text-muted mb-0.5">
                  {showLastSeen ? "마지막 접속" : "처리 마감 (SLA)"}
                </span>
                <div className="sm:w-22.5 sm:text-center flex justify-end sm:justify-center">
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs font-bold py-0.75 px-2.5 whitespace-nowrap rounded-full",
                      slaCls(student?.slaCls, showLastSeen),
                    )}
                  >
                    {showLastSeen ? student.sla || "—" : student.sla}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex w-20 justify-end">
                <Button
                  onClick={() =>
                    showToast(`${student.name} 학생에게 메시지를 보냅니다.`)
                  }
                  variant="outline"
                  size="sm"
                  className="text-[12.5px]! bg-primary-light! rounded-r2 font-bold"
                >
                  연락하기
                </Button>
              </div>
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
