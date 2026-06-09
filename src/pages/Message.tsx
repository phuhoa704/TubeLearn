import { cn } from "../lib/utils";
import { useMessage } from "../features/message/hooks/useMessage";
import {
  ConvItem,
  ChatPanel,
  ClassmatesTab,
  FriendsTab,
  NewMsgModal,
  TabBar,
} from "../features/message/components";
import type { FilterType } from "../types/message";
import { Button, Input } from "../components/ui";
import { FRIENDS } from "../mocks/message";

const filterName = (type: FilterType) => {
  switch (type) {
    case "all":
      return "전체";
    case "course":
      return "강좌";
    case "personal":
      return "개인";
    case "group":
      return "그룹";
  }
};

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

  const filterCls = (f: FilterType) =>
    cn(
      "px-3 py-1 text-[11.5px]! font-semibold rounded-full border transition-colors",
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
        <Button
          variant="primary"
          size="sm"
          className="font-bold"
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
        </Button>
      </div>

      <TabBar
        activeTab={activeTab}
        totalUnread={totalUnread}
        onTabChange={setActiveTab}
      />

      {activeTab === "messages" && (
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="w-75 shrink-0 border-r border-border-main flex flex-col min-h-0 bg-surface-main">
            <div className="px-3.5 pt-3.5 pb-2.5 border-b border-border-main">
              <Input
                icon={
                  <svg
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
                }
                className="h-9.5"
                placeholder="메시지 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex gap-1.5 mt-2.5 flex-wrap">
                {(["all", "course", "personal", "group"] as FilterType[]).map(
                  (f) => (
                    <Button
                      key={f}
                      size="sm"
                      variant={filterType === f ? "primary" : "ghost"}
                      className={filterCls(f)}
                      onClick={() => setFilterType(f)}
                    >
                      {filterName(f)}
                    </Button>
                  ),
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {showCourseSection && (
                <>
                  <div className="px-3.5 py-2 text-[11px] font-bold text-primary bg-primary-light">
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

          <div className="flex-1 flex flex-col min-h-0">
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
