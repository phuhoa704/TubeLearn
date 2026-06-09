import React from "react";
import Modal from "../../../../components/ui/Modal";
import { Avatar, Button } from "../../../../components/ui";
import type { Notice } from "../../../../types/notice";
import { showToast } from "../../../../lib/toast";

interface NoticeDetailModalProps {
  notice: Notice | null;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  open,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onEdit,
  onDelete,
}) => {
  if (!notice) return null;
  const footer = (
    <div className="w-full flex items-center justify-between">
      <div className="flex gap-2 5">
        <Button
          onClick={onPrev}
          disabled={!hasPrev}
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px]! font-bold! border border-border-main bg-surface-main text-text-sub hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer rounded-r1"
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
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasNext}
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px]! font-bold! border border-border-main bg-surface-main text-text-sub hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer rounded-r1"
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
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-sm bg-primary-light"
          onClick={onEdit}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 2l2 2-7 7-2.5.5.5-2.5L10 2z" />
          </svg>
          수정
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-err text-err bg-err-bg text-sm"
          onClick={onDelete}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 4h10M5 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5a1 1 0 001 .5h4.6a1 1 0 001-.5L11 4" />
          </svg>
          삭제
        </Button>
        <Button variant="ghost" size="sm" className="text-sm">
          닫기
        </Button>
      </div>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} maxWidth={640} footer={footer}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="inline-flex text-xs font-bold text-primary bg-primary-light py-1 px-2 rounded-full border border-primary-accent">
            {notice.course}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase bg-warn-bg text-warn border-warn-bg">
            공지
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7.5 h-7.5 rounded-r1 bg-surface-alt border-border-main hover:bg-err-bg hover:border-err hover:text-err flex items-center justify-center text-text-sub transition-colors cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          >
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-[17px] font-extrabold text-text-main leading-snug">
            {notice.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-text-muted mt-2">
            <span className="flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              >
                <circle cx="7" cy="5" r="3" />
                <path d="M1 13c0-3.3 2.7-6 6-6s6 2.7 6 6" />
              </svg>
              {notice.author}
            </span>
            <span className="flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              >
                <circle cx="7" cy="7" r="6" />
                <path d="M7 4v3l2 2" />
              </svg>
              {notice.date}
            </span>
            <span className="flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              >
                <path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" />
                <circle cx="7" cy="7" r="2" />
              </svg>
              조회 {notice.views}
            </span>
          </div>
        </div>
        <div className="py-5 px-6 overflow-auto">
          <div className="text-sm text-text-sub leading-relaxed whitespace-pre-wrap py-2.5">
            {notice.content}
          </div>
          {notice.files && notice.files.length > 0 && (
            <div className="space-y-1.5 mt-3 pt-3 border-t border-border-main">
              <div className="text-[11px] font-bold text-text-muted uppercase mt-2.5">
                첨부파일
              </div>
              <div className="space-y-1">
                {notice.files.map((file, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      showToast(`[${file}] 다운로드를 시작합니다.`)
                    }
                    className="flex items-center justify-between mb-1.5 py-3 px-4 rounded-r2 bg-surface-alt border border-border-main hover:border-primary-light cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-text-main">
                      <div className="text-primary">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M3 1h5l4 4v8H3V1z" />
                          <path d="M8 1v4h4" />
                        </svg>
                      </div>
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

          <div className="space-y-2 mt-3 pt-3 border-t border-border-main">
            <div className="text-[11px] font-extrabold text-text-muted">
              댓글{" "}
              <span className="font-bold text-xs bg-primary-light text-primary py-px px-1.5 rounded-full">
                {notice.replies?.length || 0}
              </span>
            </div>
            {notice.replies && notice.replies.length > 0 && (
              <div className="space-y-2">
                {notice.replies.map((reply, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-alt border border-border-main p-3 rounded-r2 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 mt-1.5">
                      <Avatar
                        name={reply.author.charAt(0).toUpperCase()}
                        size="xs"
                      />
                      <span className="text-xs text-text-main font-bold">
                        {reply.author}
                      </span>
                      <span className="text-xs text-text-muted">
                        {reply.date}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-text-sub leading-relaxed whitespace-pre-wrap">
                      {reply.txt}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 mt-3">
              <textarea
                className="flex-1 py-2.5 px-3 border border-border-main rounded-r2 text-xs text-text-main bg-input-bg outline-none resize-none transition-all leading-normal"
                rows={2}
                placeholder="댓글을 입력하세요..."
              ></textarea>
              <Button
                onClick={onClose}
                variant="primary"
                size="sm"
                className="text-xs self-end shrink-0 font-bold"
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
