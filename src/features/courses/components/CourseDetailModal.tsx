import React from "react";
import Modal from "../../../components/ui/Modal";
import { cn } from "../../../lib/utils";
import { showToast } from "../../../lib/toast";
import type { BoardItem } from "../../../mocks/courses";

interface CourseDetailModalProps {
  open: boolean;
  onClose: () => void;
  type: "notice" | "qa";
  item: BoardItem | null;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  open,
  onClose,
  type,
  item,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  if (!item) return null;

  const footer = (
    <div className="w-full flex items-center justify-between">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-bold border border-border-main bg-surface-main text-text-sub hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer rounded-lg"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 2L5 7l4 5" />
        </svg>
        이전 글
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-bold border border-border-main bg-surface-main text-text-sub hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer rounded-lg"
      >
        다음 글
        <svg
          width="11"
          height="11"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 2l4 5-4 5" />
        </svg>
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth={576}
      footer={footer}
    >
      {/* Custom header inside body */}
      <div className="-mx-5 -mt-4 px-5 py-3.5 border-b border-border-main bg-surface-alt/45 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[10px] font-black px-2 py-0.5 rounded border uppercase",
              type === "notice"
                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                : "bg-primary-light text-primary border-primary/20",
            )}
          >
            {type === "notice" ? "공지" : "Q&A"}
          </span>
          <span className="text-[12px] font-extrabold text-text-sub">
            {item.course}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg hover:bg-border-main/60 flex items-center justify-center text-text-sub hover:text-text-main transition-colors cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Title & meta */}
        <div>
          <h3 className="text-[17px] font-extrabold text-text-main leading-snug">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-text-muted mt-2 font-semibold">
            <span className="text-text-sub">{item.author}</span>
            <span>·</span>
            <span>{item.date}</span>
            <span>·</span>
            <span>조회 {item.views}</span>
          </div>
        </div>

        {/* Body text */}
        <div className="text-[13px] text-text-main leading-relaxed whitespace-pre-wrap py-2.5 border-t border-b border-border-main/50">
          {item.content}
        </div>

        {/* Attachments */}
        {item.files && item.files.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-extrabold text-text-muted">
              첨부파일 ({item.files.length})
            </div>
            <div className="space-y-1">
              {item.files.map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => showToast(`[${file}] 다운로드를 시작합니다.`)}
                  className="flex items-center justify-between p-2 rounded-lg bg-surface-alt border border-border-main hover:border-primary/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-text-main">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 1h5l4 4v8H3V1z" />
                      <path d="M8 1v4h4" />
                    </svg>
                    {file}
                  </div>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M7 2v8M4 7l3 3 3-3" />
                    <path d="M2 12h10" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Replies */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-extrabold text-text-muted">
            답변 / 댓글 ({item.replies?.length || 0})
          </div>
          {item.replies && item.replies.length > 0 ? (
            <div className="space-y-2">
              {item.replies.map((reply, idx) => (
                <div
                  key={idx}
                  className="bg-surface-alt border border-border-main p-3 rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-extrabold">
                    <span className="text-primary">{reply.author}</span>
                    <span className="text-text-muted">{reply.date}</span>
                  </div>
                  <p className="text-[12.5px] text-text-main leading-relaxed whitespace-pre-wrap">
                    {reply.txt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[12px] text-text-muted font-medium text-center py-4 bg-surface-alt/40 border border-dashed border-border-main rounded-xl">
              등록된 답변이 없습니다.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
