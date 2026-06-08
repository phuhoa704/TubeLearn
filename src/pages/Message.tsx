import { cn } from "../lib/utils";
import { useMessage } from "../features/message/hooks/useMessage";
import {
  ConvItem,
  ChatPanel,
  ClassmatesTab,
  FriendsTab,
  NewMsgModal,
} from "../features/message/components";
import { INITIAL_CLASSMATES, FRIENDS } from "../mocks/message";
import type { FilterType, MsgTab } from "../types/message";

export default function Message() {
  const {
    activeTab,
    setActiveTab,
    filteredConversations,
    courseConvs,
    otherConvs,
    showCourseSection,
    totalUnread,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    activeChatId,
    activeConv,
    activeMsgs,
    inputText,
    setInputText,
    msgsEndRef,
    chatInputRef,
    openChat,
    sendMessage,
    classmates,
    addClassmateFriend,
    openNewMsg,
    newMsgOpen,
    newMsgInitialTo,
    closeNewMsg,
  } = useMessage();

  const tabCls = (tab: MsgTab) =>
    cn(
      "flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-[2px] transition-colors whitespace-nowrap",
      activeTab === tab
        ? "border-primary text-primary"
        : "border-transparent text-text-muted hover:text-text-sub",
    );

  const filterCls = (f: FilterType) =>
    cn(
      "px-3 py-1 text-[11.5px] font-semibold rounded-full border transition-colors",
      filterType === f
        ? "bg-primary text-white border-primary"
        : "border-border-main text-text-sub hover:border-primary hover:text-primary",
    );

  return (
    <div className="flex flex-col h-full overflow-hidden -m-4 md:-m-6">
      <div className="flex items-start justify-between px-7 pt-5 pb-0 shrink-0">
        <div>
          <h1 className="pg-title flex items-center gap-2">
            메시지
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </h1>
          <div
            className={cn(
              "text-[13px] font-semibold mt-0.5",
              totalUnread > 0 ? "text-primary" : "text-ok",
            )}
          >
            {totalUnread > 0
              ? `${totalUnread}개의 안 읽은 메시지가 있어요`
              : "모든 메시지를 읽었어요 ✓"}
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-r2 text-[13px] font-bold bg-primary text-white hover:bg-primary-hover transition-colors shadow-sh1"
          onClick={() => openNewMsg()}
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
            <path d="M12 2l2 2-8.5 8.5-2.5.5.5-2.5L12 2z" />
          </svg>
          새 메시지
        </button>
      </div>

      <div className="flex gap-0 border-b-2 border-border-main px-7 mt-3.5 shrink-0">
        <button
          className={tabCls("messages")}
          onClick={() => setActiveTab("messages")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 3H2a1 1 0 00-1 1v7a1 1 0 001 1h4l3 3 3-3h2a1 1 0 001-1V4a1 1 0 00-1-1z" />
          </svg>
          메시지
          {totalUnread > 0 && (
            <span className="min-w-4.5 h-4.5 px-1 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalUnread}
            </span>
          )}
        </button>

        <button
          className={tabCls("classmates")}
          onClick={() => setActiveTab("classmates")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="5" r="2.5" />
            <path d="M1 14c0-3 2.2-5 5-5" />
            <circle cx="11" cy="5" r="2.5" />
            <path d="M16 14c0-3-2.2-5-5-5" />
            <path d="M6 9h5" />
          </svg>
          같이 수강생
          <span className="min-w-4.5 h-4.5 px-1 bg-surface-alt text-text-muted text-[10px] font-bold rounded-full flex items-center justify-center border border-border-main">
            {INITIAL_CLASSMATES.length}
          </span>
        </button>

        <button
          className={tabCls("friends")}
          onClick={() => setActiveTab("friends")}
        >
          ⭐ 친구
          <span className="min-w-4.5 h-4.5 px-1 bg-surface-alt text-text-muted text-[10px] font-bold rounded-full flex items-center justify-center border border-border-main">
            {FRIENDS.length}
          </span>
        </button>
      </div>

      {activeTab === "messages" && (
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="w-75 shrink-0 border-r border-border-main flex flex-col min-h-0">
            <div className="px-3.5 pt-3.5 pb-2.5 border-b border-border-main">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="7" cy="7" r="5" />
                  <path d="M11 11l3 3" />
                </svg>
                <input
                  className="w-full pl-8 pr-3 py-2 bg-input-bg border border-border-main rounded-r2 text-[13px] text-text-main placeholder:text-text-muted outline-none focus:border-primary transition-colors"
                  placeholder="메시지 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-1.5 mt-2.5 flex-wrap">
                {(["all", "course", "personal", "group"] as FilterType[]).map(
                  (f) => (
                    <button
                      key={f}
                      className={filterCls(f)}
                      onClick={() => setFilterType(f)}
                    >
                      {
                        {
                          all: "전체",
                          course: "강좌",
                          personal: "개인",
                          group: "그룹",
                        }[f]
                      }
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {showCourseSection && (
                <>
                  <div className="px-3.5 py-2 text-[10.5px] font-bold text-text-muted uppercase tracking-wide bg-surface-alt border-b border-border-main">
                    ⚡ 필수 확인 · 강좌 메시지
                  </div>
                  {courseConvs.map((conv) => (
                    <ConvItem
                      key={conv.id}
                      conv={conv}
                      isActive={activeChatId === conv.id}
                      onClick={() => openChat(conv.id)}
                    />
                  ))}
                </>
              )}
              {otherConvs.map((conv) => (
                <ConvItem
                  key={conv.id}
                  conv={conv}
                  isActive={activeChatId === conv.id}
                  onClick={() => openChat(conv.id)}
                />
              ))}
              {filteredConversations.length === 0 && (
                <div className="text-center py-10 text-text-muted text-[13px]">
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          </div>

          {/* Chat panel */}
          <div className="flex-1 flex flex-col min-h-0 bg-surface-main">
            <ChatPanel
              activeConv={activeConv}
              activeMsgs={activeMsgs}
              inputText={inputText}
              setInputText={setInputText}
              onSend={sendMessage}
              msgsEndRef={msgsEndRef}
              chatInputRef={chatInputRef}
            />
          </div>
        </div>
      )}

      {activeTab === "classmates" && (
        <ClassmatesTab
          classmates={classmates}
          onAddFriend={addClassmateFriend}
          onMessage={(name) => openNewMsg(name)}
        />
      )}

      {activeTab === "friends" && (
        <FriendsTab
          friends={FRIENDS}
          onMessage={(name) => openNewMsg(name)}
          onAddFriend={() => openNewMsg()}
        />
      )}

      <NewMsgModal
        open={newMsgOpen}
        initialTo={newMsgInitialTo}
        onClose={closeNewMsg}
      />
    </div>
  );
}
