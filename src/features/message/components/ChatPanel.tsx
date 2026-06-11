import { Button } from "../../../components/ui";
import { cn } from "../../../lib/utils";
import type { ChatMessage, Conversation } from "../../../types/message";
import type { RefObject } from "react";

function ChatBubble({
  msg,
  showAvatar,
  showName,
  isGroup,
}: {
  msg: ChatMessage;
  showAvatar: boolean;
  showName: boolean;
  isGroup: boolean;
}) {
  const isMe = msg.sender === "me";
  return (
    <div>
      {showName && isGroup && (
        <div className="text-[11px] font-semibold text-text-muted ml-11 mb-0.5">
          {msg.name}
        </div>
      )}
      <div
        className={cn(
          "flex items-end gap-2 mb-2",
          isMe ? "flex-row-reverse" : "flex-row",
        )}
      >
        {!isMe && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-base bg-surface-alt shrink-0 self-end"
            style={{ visibility: showAvatar ? "visible" : "hidden" }}
          >
            {msg.avatar}
          </div>
        )}
        <div
          className={cn(
            "max-w-[68%] px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed",
            isMe
              ? "bg-primary text-white rounded-br-sm"
              : "bg-surface-main text-text-main border border-border-main rounded-bl-sm",
          )}
        >
          {msg.text}
        </div>
        <div className="text-[10.5px] text-text-muted self-end mb-0.5 shrink-0">
          {msg.time}
        </div>
      </div>
    </div>
  );
}

interface ChatPanelProps {
  activeConv: Conversation | undefined;
  activeMsgs: ChatMessage[];
  inputText: string;
  setInputText: (v: string) => void;
  onSend: () => void;
  msgsEndRef: RefObject<HTMLDivElement | null>;
  chatInputRef: RefObject<HTMLInputElement | null>;
  onBack?: () => void;
}

export const ChatPanel = ({
  activeConv,
  activeMsgs,
  inputText,
  setInputText,
  onSend,
  msgsEndRef,
  chatInputRef,
  onBack,
}: ChatPanelProps) => {
  if (!activeConv) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          stroke="var(--bd2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M48 8H8a4 4 0 00-4 4v28a4 4 0 004 4h12l8 8 8-8h12a4 4 0 004-4V12a4 4 0 00-4-4z" />
          <circle cx="20" cy="26" r="2" fill="var(--bd2)" stroke="none" />
          <circle cx="28" cy="26" r="2" fill="var(--bd2)" stroke="none" />
          <circle cx="36" cy="26" r="2" fill="var(--bd2)" stroke="none" />
        </svg>
        <div>
          <div className="text-[16px] font-bold text-text-main mb-1.5">
            대화를 선택해주세요
          </div>
          <div className="text-[13px] text-text-muted leading-relaxed">
            좌측 목록에서 대화를 선택하거나
            <br />새 메시지를 작성해보세요
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border-main shrink-0">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden mr-1 w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-alt text-text-sub transition-colors shrink-0"
            title="이전으로"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0",
            activeConv.type === "group"
              ? "bg-ok-bg border-2 border-ok/30"
              : "bg-surface-alt",
          )}
        >
          {activeConv.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-bold text-text-main">
            {activeConv.name}
          </div>
          <div className="flex items-center gap-1.5 text-[11.5px] text-text-muted">
            <span
              className={cn(
                "w-2 h-2 rounded-full inline-block",
                activeConv.online ? "bg-ok" : "bg-text-muted",
              )}
            />
            {activeConv.online ? "온라인" : "오프라인"}
            {activeConv.course && (
              <>
                <span>·</span>
                <span>📚</span>
                <span className="text-primary font-semibold truncate">
                  {activeConv.course}
                </span>
              </>
            )}
          </div>
        </div>
        <button className="w-8 h-8 rounded-r1 flex items-center justify-center text-text-muted hover:bg-surface-alt transition-colors">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="9" cy="4" r="1" fill="currentColor" stroke="none" />
            <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
            <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col scrollbar-none">
        <div className="text-center text-[11px] text-text-muted bg-border-main py-0.75 px-3 rounded-full inline-block my-2 mx-auto self-center">
          오늘
        </div>

        {activeMsgs.length === 0 ? (
          <div className="text-center text-text-muted text-[13px] py-8">
            대화를 시작해보세요! 👋
          </div>
        ) : (
          activeMsgs.map((msg, i) => {
            const isMe = msg.sender === "me";
            const isGroup = activeConv.type === "group";
            const showAv =
              !isMe &&
              (i === 0 ||
                activeMsgs[i - 1].sender === "me" ||
                activeMsgs[i - 1].name !== msg.name);
            return (
              <ChatBubble
                key={i}
                msg={msg}
                showAvatar={showAv}
                showName={showAv}
                isGroup={isGroup}
              />
            );
          })
        )}
        <div ref={msgsEndRef} />
      </div>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-border-main bg-surface-main shrink-0">
        <button
          className="w-8 h-8 rounded-r1 flex items-center justify-center text-text-muted hover:bg-surface-alt transition-colors shrink-0"
          title="파일 첨부"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15.5 8.5l-7.5 7.5a4.5 4.5 0 01-6.4-6.3L8.6 3a3 3 0 014.2 4.2L6 13.7a1.5 1.5 0 01-2.1-2.1L10 5.4" />
          </svg>
        </button>
        <button className="w-8 h-8 rounded-r1 flex items-center justify-center text-lg hover:bg-surface-alt transition-colors shrink-0">
          😊
        </button>
        <input
          ref={chatInputRef}
          className="flex-1 px-3.5 py-2.5 bg-input-bg border border-border-main rounded-full text-[13.5px] text-text-main placeholder:text-text-muted outline-none focus:border-primary transition-colors"
          placeholder="메시지를 입력하세요..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <Button
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors bg-primary text-white hover:bg-primary-hover",
          )}
          onClick={onSend}
          disabled={!inputText.trim()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2L2 7l4 3 2 5 2-5 4-8z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
