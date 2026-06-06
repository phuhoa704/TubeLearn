import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import { Button } from "../../../components/ui";
import type { Notice, NoticeWriteForm } from "../../../types/notice";

interface NoticeWriteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: NoticeWriteForm) => void;
  editingNotice?: Notice | null;
}

const TITLE_MAX = 100;
const CONTENT_MAX = 2000;

export const NoticeWriteModal: React.FC<NoticeWriteModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingNotice,
}) => {
  const isEdit = !!editingNotice;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    if (editingNotice) {
      setTitle(editingNotice.title);
      setContent(editingNotice.content);
      setImportant(editingNotice.important ?? false);
      setFiles(editingNotice.files ? [...editingNotice.files] : []);
    } else {
      setTitle("");
      setContent("");
      setImportant(false);
      setFiles([]);
    }
  }, [editingNotice, open]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []).map((f) => f.name);
    setFiles((prev) => [...prev, ...picked]);
    e.target.value = "";
  };

  const removeFile = (i: number) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      important,
      files,
    });
  };

  const EditIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M14 2L2 7l4 3 2 5 2-5 4-8z" />
    </svg>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth={600}
      title={undefined}
      footer={
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="text-xs text-text-muted">
            <svg
              className="align-middle"
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="7" cy="7" r="6" />
              <path d="M7 6v4M7 4.5v.5" />
            </svg>
            등록된 공지는 수강생에게 즉시 공개됩니다
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              취소
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              <EditIcon />
              {isEdit ? "수정 완료" : "등록하기"}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex items-center gap-2 text-[16px] font-bold text-text-main mb-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M14 2l2 2-9.5 9.5L3 14l.5-2.5L14 2z" />
          <path d="M12 4l2 2" />
        </svg>
        공지사항 작성
      </div>

      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-[13px] font-semibold text-text-sub">
          제목 <span className="text-err">*</span>
        </label>
        <input
          type="text"
          maxLength={TITLE_MAX}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="w-full px-3.5 py-2.5 border border-border-main rounded-r2 text-[13.5px] text-text-main bg-input-bg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-text-muted transition-all"
        />
        <div className="text-[11px] text-text-muted text-right">
          {title.length} / {TITLE_MAX}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-[13px] font-semibold text-text-sub">
          내용 <span className="text-err">*</span>
        </label>
        <textarea
          rows={8}
          maxLength={CONTENT_MAX}
          placeholder={`공지사항 내용을 입력하세요${"\n\n"}■ 항목 1${"\n"}■ 항목 2`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-border-main rounded-r2 text-[13.5px] text-text-main bg-input-bg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-text-muted transition-all resize-none leading-relaxed"
        />
        <div className="text-[11px] text-text-muted text-right">
          {content.length} / {CONTENT_MAX}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-text-sub">
          첨부파일
        </label>
        <div
          onClick={() => document.getElementById("nwFileInput")?.click()}
          className="flex flex-col items-center justify-center gap-1.5 py-5 border-2 border-dashed border-border-main rounded-r2 cursor-pointer text-text-muted hover:border-primary hover:bg-primary-light transition-all"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div className="text-sm font-semibold text-text-sub mt-1.5">
            클릭하여 파일 첨부
          </div>
          <span className="text-xs text-text-muted mt-0.75">
            PDF, DOC, XLS, PPT, 이미지 (최대 10MB)
          </span>
        </div>
        <input
          id="nwFileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />

        {files.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-1">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 bg-surface-alt rounded-r2 border border-border-main"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="var(--p)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M3 1h5l4 4v8H3V1z" />
                  <path d="M8 1v4h4" />
                </svg>
                <span className="flex-1 text-[12.5px] text-text-sub truncate">
                  {f}
                </span>
                <button
                  onClick={() => removeFile(i)}
                  className="w-5 h-5 flex items-center justify-center text-text-muted hover:bg-err hover:text-white rounded transition-colors text-[12px] font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
