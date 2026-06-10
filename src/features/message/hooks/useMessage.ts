import { useState, useRef, useEffect } from "react";
import type { Conversation, ChatMessage, Classmate, MsgTab, FilterType } from "../../../types/message";
import {
  INITIAL_CONVERSATIONS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_CLASSMATES,
  FRIENDS,
} from "../../../mocks/message";
import { showToast } from "../../../lib/toast";
import { useAppSelector } from "../../../store";
import { Role } from "../../../types/auth";

export function useMessage() {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<MsgTab>("messages");
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [classmates, setClassmates] = useState<Classmate[]>(INITIAL_CLASSMATES);

  const [newMsgOpen, setNewMsgOpen] = useState(false);
  const [newMsgInitialTo, setNewMsgInitialTo] = useState("");

  const msgsEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, chatMessages]);

  const filteredConversations = conversations.filter((c) => {
    const matchFilter = filterType === "all" || c.type === filterType;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.lastMsg.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const courseConvs = filteredConversations.filter((c) => c.type === "course");
  const otherConvs = filteredConversations.filter((c) => c.type !== "course");
  const showCourseSection =
    courseConvs.length > 0 && (filterType === "all" || filterType === "course");

  const totalUnread = conversations.reduce((a, c) => a + (c.unread || 0), 0);
  const activeConv = conversations.find((c) => c.id === activeChatId);
  const activeMsgs = activeChatId ? chatMessages[activeChatId] || [] : [];

  const openChat = (convId: string) => {
    setActiveChatId(convId);
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unread: 0 } : c))
    );
    setTimeout(() => chatInputRef.current?.focus(), 100);
  };

  const sendMessage = () => {
    if (!inputText.trim() || !activeChatId) return;
    const now = new Date();
    const hr = now.getHours();
    const ampm = hr < 12 ? "오전" : "오후";
    const h = hr % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, "0");
    const time = `${ampm} ${h}:${m}`;

    const isProf = user?.role === Role.PROF;

    const newMsg: ChatMessage = {
      sender: "me",
      name: "나",
      avatar: isProf ? "👩‍🏫" : "🐶",
      text: inputText.trim(),
      time,
    };
    setChatMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg],
    }));
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, lastMsg: inputText.trim(), time: "방금" } : c
      )
    );
    setInputText("");
  };

  const openNewMsg = (initialTo = "") => {
    setNewMsgInitialTo(initialTo);
    setNewMsgOpen(true);
  };

  const closeNewMsg = () => setNewMsgOpen(false);

  const addClassmateFriend = (id: string) => {
    setClassmates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFriend: true } : c))
    );
    showToast("친구 추가 완료! 🎉");
  };

  return {
    activeTab,
    setActiveTab,

    conversations,
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
    friends: FRIENDS,
    addClassmateFriend,

    newMsgOpen,
    newMsgInitialTo,
    openNewMsg,
    closeNewMsg,
  };
}
