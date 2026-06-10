import React from "react";
import type { ProfCompDef } from "../../../../types/competency";
import { Button, Modal } from "../../../../components/ui";

interface ProfCompMsgModalProps {
  msgStudent: any;
  std: "kcesa" | "lms" | "all";
  msgType: "encourage" | "guide" | "consult" | "custom";
  onMsgTypeChange: (t: "encourage" | "guide" | "consult" | "custom") => void;
  msgBody: string;
  onMsgBodyChange: (body: string) => void;
  isMsgEditable: boolean;
  onToggleEditable: () => void;
  sendChannels: {
    lms: boolean;
    email: boolean;
    push: boolean;
  };
  onSendChannelsChange: (channels: {
    lms: boolean;
    email: boolean;
    push: boolean;
  }) => void;
  defs: ProfCompDef[];
  onClose: () => void;
  onSend: () => void;
}

export const ProfCompMsgModal: React.FC<ProfCompMsgModalProps> = ({
  msgStudent,
  std,
  msgType,
  onMsgTypeChange,
  msgBody,
  onMsgBodyChange,
  isMsgEditable,
  onToggleEditable,
  sendChannels,
  onSendChannelsChange,
  defs,
  onClose,
  onSend,
}) => {
  if (!msgStudent) return null;

  const sc =
    std === "lms"
      ? msgStudent.lms
      : std === "all"
        ? msgStudent.kcesa.concat(msgStudent.lms)
        : msgStudent.kcesa;
  const avg = Math.round(
    sc.reduce((a: number, b: number) => a + b, 0) / sc.length,
  );
  const weakIdx = sc
    .map((v: number, i: number) => (v < 55 ? i : -1))
    .filter((i: number) => i >= 0);
  const weakLabels = weakIdx
    .map((i: number) => defs[i]?.lbl || "")
    .filter(Boolean);

  return (
    <Modal
      open={msgStudent !== null}
      onClose={onClose}
      title="역량 맞춤 상담 메시지"
      subtitle="수강생에게 맞춤형 개입 및 상담 메시지를 발송합니다."
      maxWidth={580}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-surface-alt rounded-r2 border border-border-main">
          <div className="w-10 h-10 rounded-full bg-surface-main border border-border-main flex items-center justify-center font-extrabold text-[15px] text-text-main shrink-0">
            {msgStudent.name[0]}
          </div>
          <div>
            <div className="text-[14px] font-extrabold text-text-main">
              {msgStudent.name}
            </div>
            <div className="text-[12px] text-text-sub">
              {msgStudent.dept} · {msgStudent.course}
            </div>
          </div>
        </div>

        <div className="p-4 bg-surface-alt rounded-r2 border border-border-main space-y-3">
          <div className="text-[12.5px] font-bold text-text-main flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M8 5v3M8 11v.5" />
            </svg>
            역량진단 현황 요약
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-2xl font-black ${
                  avg < 55
                    ? "text-red-500"
                    : avg < 70
                      ? "text-amber-500"
                      : "text-emerald-500"
                }`}
              >
                {avg}점
              </span>
              <span className="text-[11.5px] text-text-muted">
                평균 · 목표 {std === "lms" ? "75" : "70"}점
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {weakLabels.length > 0 ? (
                weakLabels.map((lbl: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[10.5px] font-extrabold bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 px-2 py-0.5 rounded-full"
                  >
                    {lbl}
                  </span>
                ))
              ) : (
                <span className="text-[11.5px] font-bold text-emerald-500">
                  취약 역량 없음
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1 pt-1">
            {defs.slice(0, 6).map((d, i) => {
              const v = sc[i] || 0;
              const col =
                v < 50
                  ? "#ef4444"
                  : v < 55
                    ? "#f59e0b"
                    : v < 70
                      ? "#6366f1"
                      : "#10b981";
              return (
                <div key={d.key} className="flex-1 text-center">
                  <div className="text-[8.5px] text-text-muted mb-1 truncate">
                    {d.lbl.slice(0, 3)}
                  </div>
                  <div className="h-9 bg-surface-main rounded-sm relative overflow-hidden border border-border-main/50">
                    <div
                      className="absolute bottom-0 w-full rounded-sm transition-all duration-500"
                      style={{ height: `${v}%`, backgroundColor: col }}
                    />
                  </div>
                  <div
                    className="text-[10px] font-black mt-1"
                    style={{ color: col }}
                  >
                    {v}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-[12.5px] font-bold text-text-sub block mb-1.5">
            메시지 유형
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "encourage", lbl: "학습 독려" },
              { id: "guide", lbl: "역량 향상 안내" },
              { id: "consult", lbl: "면담 요청" },
              { id: "custom", lbl: "직접 작성" },
            ].map((type) => (
              <button
                key={type.id}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all border ${
                  msgType === type.id
                    ? "bg-primary border-primary text-white"
                    : "border-border-main bg-surface-main text-text-sub hover:bg-surface-alt"
                }`}
                onClick={() => {
                  onMsgTypeChange(type.id as any);
                }}
              >
                {type.lbl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[12.5px] font-bold text-text-sub">
              메시지 내용 <span className="text-red-500">*</span>
            </label>
            {msgType !== "custom" && (
              <button
                className="text-[12px] font-bold text-primary hover:underline"
                onClick={onToggleEditable}
              >
                {isMsgEditable ? "수정 완료" : "직접 수정"}
              </button>
            )}
          </div>
          <textarea
            className="w-full min-h-35 rounded-r2 border border-border-main bg-surface-main p-3.5 text-[13px] text-text-main focus:outline-none focus:border-primary disabled:opacity-75 disabled:cursor-not-allowed"
            rows={5}
            maxLength={500}
            value={msgBody}
            onChange={(e) => onMsgBodyChange(e.target.value)}
            disabled={!isMsgEditable}
            placeholder={
              msgType === "custom"
                ? "학생에게 보낼 상담 메시지를 직접 입력하세요."
                : ""
            }
          />
          <div className="text-[11px] text-text-muted text-right mt-1">
            {msgBody.length} / 500자
          </div>
        </div>

        <div>
          <label className="text-[12.5px] font-bold text-text-sub block mb-1.5">
            발송 방법
          </label>
          <div className="flex gap-4 flex-wrap text-[13px] text-text-main font-bold">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sendChannels.lms}
                onChange={(e) =>
                  onSendChannelsChange({
                    ...sendChannels,
                    lms: e.target.checked,
                  })
                }
                className="accent-primary w-4 h-4 rounded"
              />
              LMS 쪽지
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sendChannels.email}
                onChange={(e) =>
                  onSendChannelsChange({
                    ...sendChannels,
                    email: e.target.checked,
                  })
                }
                className="accent-primary w-4 h-4 rounded"
              />
              이메일
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sendChannels.push}
                onChange={(e) =>
                  onSendChannelsChange({
                    ...sendChannels,
                    push: e.target.checked,
                  })
                }
                className="accent-primary w-4 h-4 rounded"
              />
              앱 푸시
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-2 border-t border-border-main">
          <Button
            variant="ghost"
            size="sm"
            className="font-bold border border-border-main hover:bg-surface-alt text-[13px]"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="font-bold text-[13px]"
            onClick={onSend}
          >
            발송하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};
