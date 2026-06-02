import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import { Navbar } from "../components/Navbar";

export default function MainLayout() {
  // Layout states
  const [collapsed, setCollapsed] = useState(false);
  const [role] = useState<"student" | "prof">(() => {
    const saved = localStorage.getItem("user-role");
    return saved === "student" || saved === "prof" ? saved : "student";
  });

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: number; text: string; sender: "bot" | "me"; time: string }>
  >([
    {
      id: 1,
      text: "안녕하세요! AI 학습 튜터 tubeLearn입니다. 어떤 도움이 필요하신가요?",
      sender: "bot",
      time: "오후 8:53",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  // Send a chatbot message
  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours() >= 12 ? "오후" : "오전"} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`;

    const userMsg = {
      id: Date.now(),
      text: textToSend,
      sender: "me" as const,
      time: timeStr,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Generate smart mock response
    setTimeout(() => {
      let botResponse =
        "현재 플랫폼의 주요 메뉴를 통해 역량 진단이나 추천 강좌를 학습해보실 수 있습니다.";

      const lower = textToSend.toLowerCase();
      if (lower.includes("역량") || lower.includes("진단")) {
        botResponse =
          "역량 진단 메뉴(KCESA)에서 자신의 핵심 역량 수준을 종합적으로 평가하고 맞춤형 AI 학습 추천을 받으실 수 있습니다. 지금 진단하러 가보시겠어요?";
      } else if (lower.includes("추천") || lower.includes("공부")) {
        botResponse =
          "분석 결과 고객님께는 [빅데이터 AI 분석] 및 [글로벌 비즈니스 영어] 강좌를 추천해 드립니다. 지금 학습을 시작해 보세요!";
      } else if (lower.includes("안녕")) {
        botResponse =
          "안녕하세요! 똑똑한 학습 동반자 tubeLearn입니다. 무엇이든 물어보세요!";
      } else if (lower.includes("오늘") || lower.includes("할 일")) {
        botResponse =
          "오늘 완료해야 할 과제 1건과 동영상 강의 수강 1건이 대기 중입니다. 힘내세요!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot" as const,
          time: timeStr,
        },
      ]);
    }, 800);
  };

  // Quick recommendation replies
  const quickReplies = [
    "🔍 핵심 역량 진단은 어떻게 하나요?",
    "📚 내게 맞는 추천 강좌 확인하기",
    "⚡ 오늘 학습할 목표 알아보기",
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-main text-text-main font-sans transition-colors duration-200">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background-main p-6 md:p-8 transition-colors duration-200">
          <div className="max-w-7xl mx-auto animate-fade-up">
            <Outlet context={{ role }} />
          </div>
        </main>
      </div>

      {/* ══ Chatbot Floating action button (FAB) ══ */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 w-[50px] h-[50px] rounded-full bg-primary text-white border-none cursor-pointer flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
      >
        {chatOpen ? (
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <div className="relative">
            <svg
              className="w-[26px] h-[26px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] bg-err text-[8.5px] font-black border-2 border-primary rounded-full flex items-center justify-center text-white">
              1
            </span>
          </div>
        )}
      </button>

      {/* ══ Chatbot Fixed Panel ══ */}
      <div
        className={`fixed bottom-[88px] right-6 w-[400px] max-w-[calc(100vw-32px)] h-[580px] bg-surface-main rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] z-50 flex flex-col overflow-hidden border border-border-main transition-all duration-300 transform origin-bottom-right ${
          chatOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* Chatbot Header */}
        <div className="p-4 border-b border-border-main flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-extrabold flex-shrink-0 shadow-sm transition-colors duration-200">
            tL
          </div>
          <div>
            <div className="font-extrabold text-sm text-text-main flex items-center gap-1.5">
              <span>tubeLearn AI 튜터</span>
              <span className="w-1.5 h-1.5 bg-ok rounded-full animate-ping"></span>
            </div>
            <div className="text-[11px] text-text-muted flex items-center gap-1">
              <span>스마트 AI 분석 튜터링 · 실시간 대화 중</span>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="ml-auto w-7 h-7 bg-transparent border-none text-text-muted hover:text-text-main hover:bg-surface-alt rounded-full flex items-center justify-center cursor-pointer transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Chatbot Log Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background-main/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 items-end ${
                m.sender === "me" ? "flex-row-reverse" : ""
              }`}
            >
              {m.sender === "bot" && (
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-[78%] p-3 text-xs leading-relaxed ${
                  m.sender === "me"
                    ? "bg-primary text-white rounded-t-xl rounded-bl-xl rounded-br-sm shadow-sm transition-colors duration-200"
                    : "bg-surface-main text-text-main rounded-t-xl rounded-br-xl rounded-bl-sm border border-border-main shadow-sm"
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9.5px] text-text-muted pb-0.5 whitespace-nowrap">
                {m.time}
              </span>
            </div>
          ))}

          {/* Quick recommendations wrap */}
          {messages[messages.length - 1]?.sender === "bot" && (
            <div className="pl-9 pr-4 pt-1.5 space-y-2">
              <div className="text-[10px] text-text-muted font-bold tracking-wide">
                💡 이런 질문은 어떠세요?
              </div>
              <div className="flex flex-col gap-1.5 items-start">
                {quickReplies.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleSendMessage(q.replace(/[🔍📚⚡]/g, "").trim())
                    }
                    className="text-left text-xs bg-surface-main hover:bg-primary-light hover:text-primary hover:border-primary/30 text-text-sub font-semibold py-2 px-3.5 rounded-full border border-border-main transition-all cursor-pointer shadow-sm w-full max-w-[280px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Chatbot Form Input Footer */}
        <div className="p-3 border-t border-border-main bg-surface-main flex gap-2 items-center flex-shrink-0">
          <textarea
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="튜터에게 궁금한 학습 상담 질문을 입력하세요..."
            className="flex-1 max-h-[70px] bg-background-main border border-border-main rounded-full py-2.5 px-4 text-xs font-sans text-text-main outline-none placeholder:text-text-muted resize-none focus:border-primary transition-all leading-normal"
          />
          <button
            onClick={() => handleSendMessage()}
            className="w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-white border-none flex items-center justify-center cursor-pointer transition-colors duration-150 flex-shrink-0 shadow-sm"
          >
            <svg
              className="w-4 h-4 transform rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
