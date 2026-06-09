import { useState, useEffect } from "react";
import { showToast } from "../../../../lib/toast";
import { Button, Input } from "../../../../components/ui";

interface NewMsgModalProps {
  open: boolean;
  initialTo: string;
  onClose: () => void;
}

export const NewMsgModal = ({ open, initialTo, onClose }: NewMsgModalProps) => {
  const [to, setTo] = useState(initialTo);
  const [text, setText] = useState("");

  useEffect(() => {
    setTo(initialTo);
  }, [initialTo, open]);

  const handleSend = () => {
    if (!to.trim()) {
      alert("받는 사람을 입력해주세요.");
      return;
    }
    if (!text.trim()) {
      alert("메시지를 입력해주세요.");
      return;
    }
    onClose();
    showToast("메시지를 보냈습니다! ✉️");
    setText("");
    setTo("");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-main rounded-r3 shadow-sh3 w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-main">
          <div className="flex items-center gap-2 text-[16px] font-extrabold text-text-main">
            <svg
              width="17"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2l2 2-9.5 9.5-2.5.5.5-2.5L14 2z" />
            </svg>
            새 메시지
          </div>
          <button
            className="w-7 h-7 rounded-r1 flex items-center justify-center text-text-sub hover:bg-surface-alt transition-colors border border-border-main bg-surface-alt"
            onClick={onClose}
          >
            <svg
              width="13"
              height="13"
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

        <div className="px-5 py-4 border-b border-border-main">
          <div className="text-[12.5px] font-semibold text-text-sub mb-1.5">
            받는 사람
          </div>
          <Input
            placeholder="이름 검색..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            autoFocus
          />
        </div>

        <div className="px-5 py-4">
          <div className="text-[12.5px] font-semibold text-text-sub mb-1.5">
            메시지
          </div>
          <textarea
            className="w-full px-3 py-2 bg-input-bg border border-border-main rounded-r2 text-[13.5px] text-text-main placeholder:text-text-muted outline-none focus:border-primary transition-colors resize-none"
            rows={4}
            placeholder="메시지를 입력하세요..."
            style={{ minHeight: 100 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border-main">
          <Button
            size="sm"
            variant="ghost"
            className="px-4 py-2 rounded-r2 text-[13px] font-semibold text-text-sub bg-surface-alt hover:bg-border-main transition-colors"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5 px-4 py-2 rounded-r2 text-[13px] font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
            onClick={handleSend}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2L2 7l4 3 2 5 2-5 4-8z" />
            </svg>
            보내기
          </Button>
        </div>
      </div>
    </div>
  );
};
