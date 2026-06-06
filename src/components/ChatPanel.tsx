import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui";
import { cn } from "../lib/utils";
import { useAppSelector } from "../store";
import { BOT_QR, BOT_REMINDERS, BOT_FAQ, BOT_COURSES } from "../mocks/bot";
import type { ChatMessage } from "../types/chat";

export const ChatPanel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<ChatMessage>>([
    {
      id: 1,
      text: "안녕하세요! AI 학습 튜터 tubeLearn입니다. 어떤 도움이 필요하신가요?",
      sender: "bot",
      time: "오후 8:53",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasStartedFlow = useRef(false);

  const showToast = (msg: string) => {
    const t = document.createElement("div");
    t.className =
      "fixed bottom-8 left-1/2 -translate-x-1/2 translate-y-5 bg-text-main text-surface-main px-6 py-3 rounded-full text-sm font-semibold z-[9999] opacity-0 transition-all duration-300 shadow-lg whitespace-nowrap";
    t.textContent = msg;
    document.body.appendChild(t);

    setTimeout(() => {
      t.classList.remove("opacity-0", "translate-y-5");
      t.classList.add("opacity-100", "translate-y-0");
    }, 10);

    setTimeout(() => {
      t.classList.remove("opacity-100", "translate-y-0");
      t.classList.add("opacity-0", "translate-y-5");
      setTimeout(() => {
        if (document.body.contains(t)) {
          document.body.removeChild(t);
        }
      }, 300);
    }, 2500);
  };

  const startBotFlow = () => {
    const now = new Date();
    const timeStr = `${now.getHours() >= 12 ? "오후" : "오전"} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`;

    setMessages([
      {
        id: 1,
        text: "안녕하세요, 김학생님! 오늘 챙겨야 할 것들을 정리했어요.",
        sender: "bot",
        time: timeStr,
      },
    ]);

    BOT_REMINDERS.forEach((reminder, index) => {
      setTimeout(
        () => {
          const reminderTime = new Date();
          const rTimeStr = `${reminderTime.getHours() >= 12 ? "오후" : "오전"} ${reminderTime.getHours() % 12 || 12}:${String(reminderTime.getMinutes()).padStart(2, "0")}`;

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + index * 10,
              text: "",
              sender: "bot",
              time: rTimeStr,
              isReminderCard: true,
              reminderData: reminder,
            },
          ]);
        },
        600 + index * 800,
      );
    });

    setTimeout(
      () => {
        const footerTime = new Date();
        const fTimeStr = `${footerTime.getHours() >= 12 ? "오후" : "오전"} ${footerTime.getHours() % 12 || 12}:${String(footerTime.getMinutes()).padStart(2, "0")}`;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 100,
            text: `총 ${BOT_REMINDERS.length}개의 마감 항목이 있어요. 추가로 도움이 필요하시면 말씀해주세요!`,
            sender: "bot",
            time: fTimeStr,
            isQuickReplyOptions: true,
            quickReplyOptions: [
              { label: "추천 과정 보기", action: "recommend" },
              { label: "질문하기", action: "qa_prompt" },
              { label: "할 일 전체 보기", action: "todo" },
            ],
          },
        ]);
      },
      600 + BOT_REMINDERS.length * 800 + 400,
    );
  };

  useEffect(() => {
    if (
      isAuthenticated &&
      user?.role === "student" &&
      !hasStartedFlow.current
    ) {
      hasStartedFlow.current = true;
      setChatOpen(true);
      startBotFlow();
    }
  }, [isAuthenticated, user]);

  const handleQuickReplyClick = (action: string, label: string) => {
    const now = new Date();
    const timeStr = `${now.getHours() >= 12 ? "오후" : "오전"} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: label,
        sender: "me",
        time: timeStr,
      },
    ]);

    if (action === "contact") {
      setTimeout(() => {
        const t = `${new Date().getHours() >= 12 ? "오후" : "오전"} ${new Date().getHours() % 12 || 12}:${String(new Date().getMinutes()).padStart(2, "0")}`;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "담당자 연결 요청이 접수됐어요. 영업일 기준 1~2일 내에 연락드릴게요. 📞",
            sender: "bot",
            time: t,
          },
        ]);
      }, 600);
    } else if (action === "recommend") {
      setTimeout(() => {
        const timeStrRecommend = `${new Date().getHours() >= 12 ? "오후" : "오전"} ${new Date().getHours() % 12 || 12}:${String(new Date().getMinutes()).padStart(2, "0")}`;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "추천 과정을 준비했습니다!",
            sender: "bot",
            time: timeStrRecommend,
          },
        ]);

        BOT_COURSES.forEach((course, index) => {
          setTimeout(
            () => {
              const timeStrCourse = `${new Date().getHours() >= 12 ? "오후" : "오전"} ${new Date().getHours() % 12 || 12}:${String(new Date().getMinutes()).padStart(2, "0")}`;
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now() + 10 + index,
                  text: "",
                  sender: "bot",
                  time: timeStrCourse,
                  isCourseCard: true,
                  courseData: course,
                },
              ]);
            },
            300 + index * 400,
          );
        });
      }, 600);
    } else if (action === "qa_prompt") {
      setTimeout(() => {
        const timeStrQa = `${new Date().getHours() >= 12 ? "오후" : "오전"} ${new Date().getHours() % 12 || 12}:${String(new Date().getMinutes()).padStart(2, "0")}`;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "무엇이든 물어보세요! 학습 관련 질문에 답해드릴게요.",
            sender: "bot",
            time: timeStrQa,
          },
        ]);
      }, 600);
    } else if (action === "todo") {
      navigate("/todo");
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  };

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const getTimeStr = () => {
    const now = new Date();
    return `${now.getHours() >= 12 ? "오후" : "오전"} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  const triggerRecommendFlow = () => {
    const t = getTimeStr();
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: "추천 과정을 준비했습니다!",
        sender: "bot" as const,
        time: t,
      },
    ]);
    BOT_COURSES.forEach((course, index) => {
      setTimeout(
        () => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 10 + index,
              text: "",
              sender: "bot" as const,
              time: getTimeStr(),
              isCourseCard: true,
              courseData: course,
            },
          ]);
        },
        300 + index * 400,
      );
    });
  };

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: textToSend,
      sender: "me" as const,
      time: getTimeStr(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const lower = textToSend.toLowerCase();

    const isRecommendTrigger = lower.includes("추천") || lower.includes("강의");
    if (isRecommendTrigger) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        triggerRecommendFlow();
      }, 800);
      return;
    }

    if (lower.includes("안녕")) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "안녕하세요! 똑똑한 학습 동반자 tubeLearn입니다. 무엇이든 물어보세요!",
            sender: "bot" as const,
            time: getTimeStr(),
          },
        ]);
      }, 800);
      return;
    }

    const matchedFaq = BOT_FAQ.find((faq) =>
      faq.q.some((keyword) => lower.includes(keyword.toLowerCase())),
    );

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const t = getTimeStr();

      if (matchedFaq) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "FAQ에서 찾았어요! 🎉",
            sender: "bot" as const,
            time: t,
          },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 2,
              text: "",
              sender: "bot" as const,
              time: getTimeStr(),
              isFaqCard: true,
              faqData: { a: matchedFaq.a, src: matchedFaq.src },
            },
          ]);
        }, 300);

        if (lower.includes("수료") || lower.includes("과정")) {
          setTimeout(() => {
            const t2 = getTimeStr();
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 3,
                text: "관련 과정도 추천해드릴까요? 📚",
                sender: "bot" as const,
                time: t2,
                isQuickReplyOptions: true,
                quickReplyOptions: [
                  { label: "추천 과정 보기", action: "recommend" },
                  { label: "괜찮아요", action: "back_home" },
                ],
              },
            ]);
          }, 2000);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "정확한 답변을 찾지 못했어요. 담당자에게 연결해드릴까요?",
            sender: "bot" as const,
            time: t,
            isQuickReplyOptions: true,
            quickReplyOptions: [
              { label: "담당자 연결", action: "contact" },
              { label: "다시 질문하기", action: "qa_prompt" },
            ],
          },
        ]);
      }
    }, 1200);
  };
  return (
    <>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-12.5 h-12.5 rounded-full bg-primary text-white border-none cursor-pointer flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-150",
          chatOpen && "scale-0",
        )}
      >
        <div className="relative">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="8" width="18" height="13" rx="3" />
            <path d="M8 8V6a4 4 0 018 0v2" />
            <circle cx="9.5" cy="14.5" r="1.5" fill="#fff" stroke="none" />
            <circle cx="14.5" cy="14.5" r="1.5" fill="#fff" stroke="none" />
          </svg>
          <span className="absolute -top-3.5 -right-3.5 w-5 h-5 bg-err text-[8.5px] font-black border-2 border-surface-main rounded-full flex items-center justify-center text-white">
            4
          </span>
        </div>
      </button>

      <div
        className={cn(
          `fixed bottom-22 right-6 w-110 max-w-[calc(100vw-32px)] h-145 bg-surface-main rounded-r4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] z-50 flex flex-col overflow-hidden border border-border-main transition-all duration-300 transform origin-bottom-right ${
            chatOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`,
          chatExpanded && "w-150! h-175!",
        )}
      >
        <div className="p-4 flex items-center justify-between gap-3 shrink-0 bg-primary">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm transition-colors duration-200">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="7" width="14" height="10" rx="3" />
                <path d="M7 7V5a3 3 0 016 0v2" />
                <circle cx="8" cy="12" r="1" fill="#fff" stroke="none" />
                <circle cx="12" cy="12" r="1" fill="#fff" stroke="none" />
                <path d="M8 15h4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>tubeBot</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 bg-ok rounded-full"></span>
                <div className="text-[11px] text-white/80 flex items-center gap-1">
                  <span>온라인 · AI 학습 도우미</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-7.5 h-7.5 flex! p-0! transition-all border-none rounded-sm bg-white/20 text-white"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="7" y="2" width="6" height="10" rx="3" />
                <path d="M4 10a6 6 0 0012 0M10 16v3M7 19h6" />
              </svg>
            </Button>
            <Button
              onClick={() => setChatExpanded(!chatExpanded)}
              variant="ghost"
              size="sm"
              className="w-7.5 h-7.5 flex! p-0! transition-all border-none rounded-sm bg-white/20 text-white"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="14" height="14" rx="2" />
                <path d="M8 3v14M3 8h5" />
              </svg>
            </Button>
            <Button
              onClick={() => setChatOpen(false)}
              variant="ghost"
              size="sm"
              className="w-7.5 h-7.5 flex! p-0! transition-all border-none rounded-sm bg-white/20 text-white"
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
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background-main/50">
          {messages.map((m) => {
            if (m.isReminderCard && m.reminderData) {
              return (
                <div
                  key={m.id}
                  className="flex gap-2.5 items-end justify-start animate-fade-up"
                >
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm opacity-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    >
                      <rect x="3" y="7" width="14" height="10" rx="3" />
                      <path d="M7 7V5a3 3 0 016 0v2" />
                      <circle
                        cx="8"
                        cy="12"
                        r="1.2"
                        fill="#fff"
                        stroke="none"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="1.2"
                        fill="#fff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                  <div
                    className={cn(
                      "w-65 p-4 bg-surface-main rounded-r-md border border-border-main flex flex-col transition-all duration-300",
                      m.reminderData.type === "urgent" &&
                        "border-l-2 border-l-err",
                      m.reminderData.type === "warn" &&
                        "border-l-2 border-l-[#f59e0b]",
                      m.reminderData.type === "info" &&
                        "border-l-2 border-l-primary",
                      m.isDismissed && "opacity-40 pointer-events-none",
                    )}
                  >
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          m.reminderData.type === "urgent" &&
                            "bg-err-bg text-err",
                          m.reminderData.type === "warn" &&
                            "bg-warn-bg text-[#d97706]",
                          m.reminderData.type === "info" &&
                            "bg-primary-light text-primary",
                        )}
                      >
                        {m.reminderData.badge}
                      </span>
                    </div>
                    <div className="text-[13px] font-bold text-text-main mb-1 leading-snug">
                      {m.reminderData.title}
                    </div>
                    <div className="text-xs text-text-sub mb-3 leading-relaxed">
                      {m.reminderData.sub}
                    </div>
                    <div className="flex gap-1.5">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          showToast(`${m.reminderData?.course} 강의실로 이동!`)
                        }
                        className="font-semibold rounded-r2"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        >
                          <path d="M2 7h10M8 3l4 4-4 4" />
                        </svg>
                        바로 이동
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === m.id
                                ? { ...msg, isDismissed: true }
                                : msg,
                            ),
                          );
                          showToast("나중에 다시 알려드릴게요!");
                        }}
                        className="font-semibold rounded-r2"
                      >
                        나중에
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            if (m.isFaqCard && m.faqData) {
              return (
                <div
                  key={m.id}
                  className="flex gap-2.5 items-start justify-start animate-fade-up"
                >
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    >
                      <rect x="3" y="7" width="14" height="10" rx="3" />
                      <path d="M7 7V5a3 3 0 016 0v2" />
                      <circle
                        cx="8"
                        cy="12"
                        r="1.2"
                        fill="#fff"
                        stroke="none"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="1.2"
                        fill="#fff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 max-w-[82%] p-4 bg-surface-main rounded-xl border border-border-main shadow-sm">
                    <div className="text-xs text-text-main leading-relaxed mb-3">
                      {m.faqData.a}
                    </div>
                    <div className="mb-3">
                      <span className="text-[10.5px] text-text-sub font-semibold bg-surface-alt px-2.5 py-1 rounded border border-border-main inline-block shadow-xs">
                        {m.faqData.src}
                      </span>
                    </div>
                    {!m.faqData.feedbackDone ? (
                      <div className="flex items-center gap-2 pt-2 border-t border-border-main">
                        <span className="text-[10px] text-text-muted flex-1">
                          도움이 됐나요?
                        </span>
                        <button
                          onClick={() =>
                            setMessages((prev) =>
                              prev.map((msg) =>
                                msg.id === m.id
                                  ? {
                                      ...msg,
                                      faqData: {
                                        ...msg.faqData!,
                                        feedbackDone: true,
                                        feedbackPositive: true,
                                      },
                                    }
                                  : msg,
                              ),
                            )
                          }
                          className="text-[11px] px-2.5 py-1 rounded-full bg-ok-bg text-ok font-semibold border border-ok/20 hover:bg-ok hover:text-white transition-all cursor-pointer"
                        >
                          👍 도움돼요
                        </button>
                        <button
                          onClick={() =>
                            setMessages((prev) =>
                              prev.map((msg) =>
                                msg.id === m.id
                                  ? {
                                      ...msg,
                                      faqData: {
                                        ...msg.faqData!,
                                        feedbackDone: true,
                                        feedbackPositive: false,
                                      },
                                    }
                                  : msg,
                              ),
                            )
                          }
                          className="text-[11px] px-2.5 py-1 rounded-full bg-surface-alt text-text-sub font-semibold border border-border-main hover:bg-err-bg hover:text-err transition-all cursor-pointer"
                        >
                          👎 아쉬워요
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-border-main">
                        {m.faqData.feedbackPositive ? (
                          <span className="text-[11px] text-ok font-semibold">
                            도움이 됐다니 다행이에요! 😊
                          </span>
                        ) : (
                          <span className="text-[11px] text-text-sub">
                            더 자세히 알고 싶은 부분을 입력해주세요.
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (m.isCourseCard && m.courseData) {
              return (
                <div
                  key={m.id}
                  className="flex gap-2.5 items-end justify-start animate-fade-up"
                >
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm opacity-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    >
                      <rect x="3" y="7" width="14" height="10" rx="3" />
                      <path d="M7 7V5a3 3 0 016 0v2" />
                      <circle
                        cx="8"
                        cy="12"
                        r="1.2"
                        fill="#fff"
                        stroke="none"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="1.2"
                        fill="#fff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                  <div className="w-70 p-4 bg-surface-main rounded-xl border border-border-main flex flex-col">
                    <div className="mb-2">
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          m.courseData.required
                            ? "bg-err-bg text-err"
                            : "bg-primary-light text-primary",
                        )}
                      >
                        {m.courseData.required ? "필수" : m.courseData.badge}
                      </span>
                    </div>

                    <div className="flex gap-3 items-center mb-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center text-text-sub border border-border-main shrink-0">
                        <span className="text-base font-bold font-sans">
                          {m.courseData.icon.includes("python")
                            ? "🐍"
                            : m.courseData.icon.includes("shield")
                              ? "🛡️"
                              : "🎨"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-text-main truncate">
                          {m.courseData.name}
                        </div>
                        <div className="text-[10.5px] text-text-muted truncate mt-0.5">
                          {m.courseData.reason}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        showToast(`${m.courseData?.name} 수강 시작!`)
                      }
                      className="w-full inline-flex items-center justify-center py-1.5 px-3 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all duration-150 cursor-pointer shadow-sm"
                    >
                      수강하기
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col gap-2 animate-fade-up",
                  m.sender === "me" ? "items-end" : "items-start",
                )}
              >
                <div
                  className={cn(
                    "flex gap-2.5 items-end",
                    m.sender === "me" && "flex-row-reverse",
                  )}
                >
                  {m.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      >
                        <rect x="3" y="7" width="14" height="10" rx="3" />
                        <path d="M7 7V5a3 3 0 016 0v2" />
                        <circle
                          cx="8"
                          cy="12"
                          r="1.2"
                          fill="#fff"
                          stroke="none"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="1.2"
                          fill="#fff"
                          stroke="none"
                        />
                      </svg>
                    </div>
                  )}
                  {m.text && (
                    <div
                      className={cn(
                        "max-w-[78%] p-3 text-xs leading-relaxed",
                        m.sender === "me"
                          ? "bg-primary text-white rounded-t-sm rounded-bl-sm rounded-br-sm"
                          : "bg-surface-main text-text-main rounded-t-sm rounded-br-sm rounded-bl-sm border border-border-main",
                      )}
                      dangerouslySetInnerHTML={{ __html: m.text }}
                    />
                  )}
                </div>

                {m.isQuickReplyOptions && m.quickReplyOptions && (
                  <div className="w-full pl-9 pr-4 pt-1.5 space-y-2">
                    <div className="flex flex-wrap gap-1.5 items-start">
                      {m.quickReplyOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleQuickReplyClick(opt.action, opt.label)
                          }
                          className="text-left text-xs bg-surface-main hover:bg-primary-light hover:text-primary hover:border-primary/30 text-text-sub font-semibold py-2 px-3.5 rounded-full border border-border-main transition-all cursor-pointer shadow-sm"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 items-end justify-start animate-fade-up">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <rect x="3" y="7" width="14" height="10" rx="3" />
                  <path d="M7 7V5a3 3 0 016 0v2" />
                  <circle cx="8" cy="12" r="1.2" fill="#fff" stroke="none" />
                  <circle cx="12" cy="12" r="1.2" fill="#fff" stroke="none" />
                </svg>
              </div>
              <div className="bg-surface-main border border-border-main rounded-t-sm rounded-br-sm rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:300ms]"></span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        <div className="flex flex-wrap gap-1.5 py-2.5 px-3.5 border border-border-main bg-surface-main shrink-0">
          {BOT_QR.map((item, index) => (
            <Button
              variant="outline"
              key={index}
              size="sm"
              className="text-[10px]! rounded-lg text-text-main border-border-main transition-colors hover:border-primary hover:text-primary cursor-pointer"
              onClick={() => handleSendMessage(item.val)}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </div>

        <div className="p-3 border-t border-border-main bg-surface-main flex gap-2 items-end shrink-0">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={handleTextareaChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="무엇이든 물어보세요..."
            className="flex-1 max-h-25 min-h-9.5 bg-background-main border border-border-main rounded-r4 py-2 px-4 text-xs font-sans text-text-main outline-none placeholder:text-text-muted resize-none focus:border-primary transition-all leading-normal"
          />
          <Button
            className="rounded-full h-9.5! w-9.5! p-0! shrink-0"
            onClick={() => handleSendMessage()}
            variant="primary"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#fff"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 8L2 2.5 5 8 2 13.5 14 8Z" />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
};
