import { useState } from "react";
import { showToast } from "../../../../lib/toast";
import { KpiCard } from "../KpiCard";
import { Block } from "./Block";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../../components/ui";

export const StatusTab = () => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const generateSummary = () => {
    if (aiLoading) return;
    setAiLoading(true);
    setAiSummary(null);
    setTimeout(() => {
      setAiSummary(
        "이번 주 학습 참여율 64%로 정상 범위를 유지하고 있으며, 과제 2건을 제때 제출했습니다. 5월 초 무학습 공백(6일) 이후 빠르게 회복한 점이 긍정적이나, 남은 과제 1건(D-2)을 놓치지 않도록 주의가 필요합니다.",
      );
      setAiLoading(false);
    }, 1800);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 items-start flex-wrap">
        <div>
          <div className="text-[18px] font-extrabold text-text-main mb-1">
            안녕하세요, 김학생님 👋
          </div>
          <div className="text-[12.5px] text-text-sub">
            시스템이 당신을 어떻게 읽고 있는지 — 5개 블록으로 모두 공개합니다.
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-normal-bg text-normal">
            ● Normal
          </span>
          <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-recover-bg text-recover">
            ● 회복 +1건
          </span>
          <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-surface-alt text-text-sub border border-border-main">
            이번 주
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-5 bg-surface-main border border-border-main rounded-r3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-r2 bg-primary-light flex items-center justify-center text-primary shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 2L11.5 7H17L12.5 10L14.5 16L10 13L5.5 16L7.5 10L3 7H8.5L10 2Z" />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-bold text-text-main flex items-center gap-1.5 mb-0.5">
              오늘의 코파일럿 한 줄
              <span className="text-[9px] font-black bg-primary text-white px-1.5 py-0.5 rounded-r3">
                AI
              </span>
            </div>
            {!aiSummary && !aiLoading && (
              <div className="text-[11.5px] text-text-muted">
                KPI·신호 데이터를 종합해 한 단락 요약을 만들어 드릴게요.
              </div>
            )}
            {aiSummary && (
              <div className="text-[11px] text-text-main leading-relaxed mt-2 p-2.5 bg-primary-light rounded-r2 border-l border-l-primary">
                {aiSummary}
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={generateSummary}
          disabled={aiLoading}
          variant="primary"
        >
          {!aiSummary && !aiLoading ? (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M7 1L8.2 5H13L9.4 7.3L10.9 12L7 9.5L3.1 12L4.6 7.3L1 5H5.8L7 1Z" />
              </svg>
              한 줄 요약 생성
            </>
          ) : aiLoading ? (
            "생성 중..."
          ) : (
            <>
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
                <path d="M7 1L8.2 5H13L9.4 7.3L10.9 12L7 9.5L3.1 12L4.6 7.3L1 5H5.8L7 1Z" />
              </svg>{" "}
              재생성
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <KpiCard
          label="학습 참여"
          value="64"
          unit="%"
          sub="↗ +12%p · 지난주 대비"
          subVariant="ok"
          chart={
            <svg
              className="w-full h-9 mt-1"
              viewBox="0 0 80 30"
              preserveAspectRatio="none"
            >
              <polyline
                points="0,25 15,20 30,22 45,15 60,10 80,5"
                fill="none"
                stroke="var(--ok)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,25 15,20 30,22 45,15 60,10 80,5 80,30 0,30"
                fill="var(--ok)"
                fillOpacity="0.08"
                stroke="none"
              />
            </svg>
          }
        />
        <KpiCard
          label="과제 제출"
          value="2"
          unit="/ 3"
          sub="→ 마감 D-2 1건 남음"
          subVariant="warn"
        />
        <KpiCard
          label="무학습 공백"
          value="0"
          unit="일"
          sub="↗ 4/20부터 학습 재개"
          subVariant="ok"
        />
        <KpiCard
          label="회복 사례"
          value="1"
          sub="✨ 4/20 공백 종료"
          subVariant="ok"
          badge={
            <span className="text-[9px] font-black bg-recover-bg text-recover px-1.5 py-0.5 rounded-r2">
              R03
            </span>
          }
        />
      </div>

      <Block
        title="블록 A · 현재 상태"
        titleIcon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M2 12V4M6 12V2M10 12V6M14 12V9" />
          </svg>
        }
        badge={
          <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-normal-bg text-normal">
            ● Normal
          </span>
        }
      >
        <div className="text-xl font-bold text-text-main mb-1">
          이번 주 <span className="text-ok">정상</span> 상태입니다.
        </div>
        <div className="text-[12px] text-text-sub mb-4">
          판정 기준일 5/13 04:00 KST · 다음 갱신 5/14 04:00
        </div>
        <div className="flex flex-wrap gap-6">
          {[
            {
              label: "학습 참여",
              value: "64%",
              badge: "정상 범위",
              cls: "bg-normal-bg text-ok border-none",
            },
            {
              label: "과제 제출",
              value: "2/3",
              badge: "D-2",
              cls: "bg-[#fef3c7] text-[#92400e] border-none",
            },
            {
              label: "추세",
              value: "↗ 향상",
              badge: "지난주 대비",
              cls: "text-text-sub border-none",
              ok: true,
            },
          ].map((m, i) => (
            <div key={i}>
              <div className="text-[11px] text-text-muted font-semibold mb-1.5">
                {m.label}
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-lg font-bold", m.ok && "text-ok")}>
                  {m.value}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                    m.cls,
                  )}
                >
                  {m.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block
        title="블록 B · 판정의 근거"
        titleIcon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="12" height="12" rx="2" />
            <path d="M5 8h6M5 5h6M5 11h3" />
          </svg>
        }
        action={
          <div className="text-[11px] text-primary font-bold">
            원본 활동 기록 3건{" "}
            <span className="text-text-muted font-normal ">
              (xAPI Statement)
            </span>
            {`>`}
          </div>
        }
      >
        <div className="text-[12px] text-text-sub mb-3">
          "정상" 판정은 다음 활동 로그에 근거합니다:
        </div>
        <div className="space-y-1">
          {[
            {
              type: "ok",
              check: "✓",
              title: "이번 주 강의 시스템 접속 8회",
              note: "(목표 5회 이상)",
              sub: "활동: 강의 영상 시청 · 5/7 ~ 5/13",
              badge: "충족",
            },
            {
              type: "ok",
              check: "✓",
              title: "과제 2건 정시 제출",
              note: "",
              sub: "활동: 과제 제출 · 5/09 14:30, 5/11 09:15",
              badge: "충족",
            },
            {
              type: "recover",
              check: "✨",
              title: "5/01~5/06 무학습 공백 → 5/07 학습 재개",
              note: "R03 회복",
              sub: "공백 6일 후 다시 시작한 활동 (가중 0.25)",
              badge: "회복",
            },
          ].map((ev, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 p-3 rounded-r2 border",
                ev.type === "ok"
                  ? "bg-surface-alt border-surface-alt"
                  : "bg-[#faf5ff] border-[#e9d5ff]",
              )}
            >
              <span
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5",
                  ev.type === "ok"
                    ? "bg-normal-bg text-text-normal"
                    : "bg-recover-bg text-recover",
                )}
              >
                {ev.check}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-text-main">
                  {ev.title}
                  {ev.note && (
                    <span
                      className={cn(
                        "ml-1.5 text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full",
                        ev.type === "recover"
                          ? "bg-recover-bg text-recover"
                          : "text-text-muted",
                      )}
                    >
                      {ev.note}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-text-muted mt-0.5">
                  {ev.sub}
                </div>
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0",
                  ev.type === "ok"
                    ? "bg-normal-bg text-normal border-normal-bg"
                    : "bg-recover-bg text-recover border-recover-bg",
                )}
              >
                {ev.badge}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-main flex-wrap">
          <span className="text-[12px] text-text-sub font-semibold">
            분석에 사용된 데이터 영역
          </span>
          {["● 수업 (LMS)", "● 비교과 (BeCome)", "● 전자출결"].map((tag, i) => (
            <span
              key={i}
              className="text-[10.5px] font-semibold text-text-sub bg-surface-alt px-2 py-0.5 rounded-full border-border-main"
            >
              {tag}
            </span>
          ))}
        </div>
      </Block>

      <Block
        title="블록 C · 받은 안내·메시지"
        titleIcon={
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h12a1 1 0 011 1v7a1 1 0 01-1 1H6L2 14V4a1 1 0 011-1z" />
          </svg>
        }
        subTitle="최근 4주"
        action={
          <button className="text-[11px] font-bold text-primary bg-transparent border-none cursor-pointer hover:underline">
            모두 보기 (12)
          </button>
        }
      >
        <div className="divide-y divide-border-main">
          {[
            {
              dot: "bg-primary",
              title: '"CSS Grid 퀴즈 마감 24시간 전"',
              meta: "5/12 09:00 · 자동 발송 (코파일럿) · 채널: LMS 쪽지",
              confirmed: true,
            },
            {
              dot: "bg-[#f59e0b]",
              title: '"보충 동영상 추천드립니다"',
              meta: "5/10 14:30 · 박○○ 교수 · 채널: 이메일",
              confirmed: true,
            },
            {
              dot: "bg-border-main",
              title: '"일주일간 학습 활동이 없어요"',
              meta: "5/06 09:00 · 자동 발송 (코파일럿) · 정보성 메시지",
              confirmed: false,
            },
          ].map((msg, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <div className={cn("w-2 h-2 rounded-full shrink-0", msg.dot)} />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-text-main truncate">
                  {msg.title}
                </div>
                <div className="text-[10.5px] text-text-muted mt-0.5">
                  {msg.meta}
                </div>
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0",
                  msg.confirmed
                    ? "bg-normal-bg text-normal border-normal-bg"
                    : "bg-surface-alt text-text-muted border-border-main",
                )}
              >
                {msg.confirmed ? "확인 ✓" : "미확인"}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block
        title="블록 E · 이의 제기"
        titleIcon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 1l1.5 4.5H14L10.3 7.8l1.4 4.7L8 9.5l-3.7 3 1.4-4.7L2 5.5h4.5L8 1z" />
          </svg>
        }
        footer={
          <div className="text-[10px] text-text-muted text-center py-2.5 px-4 bg-surface-alt border-t border-border-main">
            🔒 이 페이지의 모든 데이터는 가명 처리되어 안전하게 보호됩니다 ·
            학생 본인만 볼 수 있어요
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[13px] font-bold text-text-main mb-1">
              이 판단이 잘못됐다고 생각되면 알려주세요.
            </div>
            <div className="text-[11px] text-text-muted">
              특정 신호 메시지·근거에 이의를 제기할 수 있어요. 24시간 안에
              제품팀이 확인하고 답변드립니다.
            </div>
          </div>
          <Button
            onClick={() =>
              showToast(
                "이의 제기가 접수되었습니다. 24시간 내 답변드릴게요. 📋",
              )
            }
            variant="ghost"
            size="sm"
            className="text-[11px]! bg-surface-alt border-border-main text-text-sub"
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
              <rect x="2" y="2" width="10" height="10" rx="2" />
              <path d="M5 7h4M7 5v4" />
            </svg>
            이의 제기하기
          </Button>
        </div>
      </Block>
    </div>
  );
};
