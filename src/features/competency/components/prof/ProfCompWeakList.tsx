import React from "react";
import type {
  ProfCompDef,
  ProfCompWeakStudent,
} from "../../../../types/competency";
import { Button, Select } from "../../../../components/ui";

interface ProfCompWeakListProps {
  std: "kcesa" | "lms" | "all";
  weakFilter: string;
  onWeakFilterChange: (val: string) => void;
  defs: ProfCompDef[];
  filteredStudents: ProfCompWeakStudent[];
  onOpenStudentDetail: (name: string) => void;
  onOpenMsgModal: (student: ProfCompWeakStudent) => void;
}

export const ProfCompWeakList: React.FC<ProfCompWeakListProps> = ({
  std,
  weakFilter,
  onWeakFilterChange,
  defs,
  filteredStudents,
  onOpenStudentDetail,
  onOpenMsgModal,
}) => {
  return (
    <div
      id="compWeakListSection"
      className="bg-surface-main border border-border-main rounded-r2 overflow-hidden shadow-sm"
    >
      <div className="p-5 border-b border-border-main flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-[15px] font-extrabold text-text-main">
            취약 학생 상세 목록
          </h2>
          <p className="text-[12.5px] text-text-sub mt-0.5">
            역량 평균 55점 이하 학생 · 클릭하면 학생 상세 정보를 확인해요
          </p>
        </div>
        <Select
          value={weakFilter}
          onChange={(e) => onWeakFilterChange(e.target.value)}
          options={[
            { label: "전체 역량", value: "all" },
            ...defs.map((d, i) => ({ label: d.lbl, value: `${i}` })),
          ]}
          wrapperClassName="w-36! px-3.5! py-1.5!"
        />
      </div>

      <div className="p-5">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 text-text-muted text-[13.5px] font-bold">
            해당 역량 취약 학생이 없어요! 🎉
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredStudents.map((st) => {
              const sc =
                std === "lms"
                  ? st.lms
                  : std === "all"
                    ? st.kcesa.concat(st.lms)
                    : st.kcesa;
              const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length);
              const isD = st.risk === "danger";

              const weakTags = sc
                .map((v, i) =>
                  v < 55 ? { lbl: defs[i]?.lbl || "—", score: v } : null,
                )
                .filter((x): x is { lbl: string; score: number } => x !== null);

              return (
                <div
                  key={st.name}
                  className={`p-4 border border-border-main rounded-r2 bg-surface-main hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between ${
                    isD ? "border-l-[3px] border-l-red-500" : ""
                  }`}
                  onClick={() => onOpenStudentDetail(st.name)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-alt border border-border-main flex items-center justify-center font-extrabold text-[15px] text-text-main shrink-0">
                        {st.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-extrabold text-text-main flex items-center gap-1.5 flex-wrap">
                          {st.name}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border text-text-muted bg-surface-alt border-border-main">
                            {isD ? "위험" : "주의"}
                          </span>
                        </div>
                        <div className="text-[12px] text-text-sub truncate mt-0.5">
                          {st.course}
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center gap-2.5 shrink-0">
                      <div className="text-right">
                        <span className="text-[20px] font-black text-text-main">
                          {avg}
                        </span>
                        <span className="text-[10px] text-text-muted ml-0.5">
                          점
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-bold bg-primary-light! text-xs! py-1 px-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenMsgModal(st);
                        }}
                      >
                        메시지
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {weakTags.length > 0 ? (
                      weakTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-2.5 py-1 rounded-r1 bg-surface-alt border border-border-main text-text-sub"
                        >
                          {tag.lbl} {tag.score}점
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-text-muted font-semibold">
                        취약 역량 없음
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
