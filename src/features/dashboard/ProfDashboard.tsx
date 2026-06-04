import { useState } from "react";
import { showToast } from "../../lib/toast";
import { TabBar } from "./components/TabBar";
import { KpiCard } from "./components/KpiCard";
import {
  STUDENTS_TODAY,
  STUDENTS_WEEK,
  STUDENTS_WATCH,
  STUDENTS_RECOVER,
} from "../../mocks/dashboard";
import { StudentTable } from "./components/prof/StudentTable";
import { RecoverGrid } from "./components/prof/RecoverGrid";
import { SummaryPanel } from "./components/prof/SummaryPanel";
import { Button } from "../../components/ui";

type ProfTab = "today" | "week" | "watch" | "recover" | "summary";

export const ProfDashboard = () => {
  const [activeTab, setActiveTab] = useState<ProfTab>("today");

  const kpiCards: {
    id: ProfTab;
    label: string;
    value: number;
    sub: string;
    subVariant: "danger" | "ok" | "warn" | "default";
  }[] = [
    {
      id: "today",
      label: "오늘 챙기기 · 24시간 안에",
      value: 8,
      sub: "↘ 2명은 4시간 안에 임박",
      subVariant: "danger",
    },
    {
      id: "week",
      label: "이번 주 챙기기 · 3영업일",
      value: 12,
      sub: "→ 새로 들어온 3건",
      subVariant: "default",
    },
    {
      id: "watch",
      label: "지켜보기",
      value: 23,
      sub: "→ 추세 안정",
      subVariant: "default",
    },
    {
      id: "recover",
      label: "회복 사례 ✨",
      value: 5,
      sub: "↗ 이번 주 신규 2건",
      subVariant: "ok",
    },
  ];

  const tabs = [
    {
      id: "today",
      label: "오늘 처리",
      badge: 8,
      badgeVariant: "danger" as const,
    },
    { id: "week", label: "이번 주", badge: 12 },
    { id: "watch", label: "관찰", badge: 23 },
    { id: "recover", label: "회복 ✨", badge: 5, badgeVariant: "ok" as const },
    { id: "summary", label: "주간 요약" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div>
          <div className="text-[12px] text-text-muted mb-1.5 flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M7 1l6 3v4c0 3-2.5 5-6 6C3.5 13 1 11 1 8V4L7 1z" />
            </svg>
            교수자 코파일럿
          </div>
          <h1 className="text-[22px] font-extrabold tracking-tight text-text-main mb-1">
            박상우 교수님 · 대시보드
          </h1>
          <p className="text-[12px] text-text-sub">
            수강생 127명 · 학기 5주차 · AI가 학습 상태를 실시간으로 분석
            중이에요
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {[
            {
              label: "필터",
              toast: "필터를 적용할게요!",
              icon: (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 4h12M4 8h8M6 12h4" />
                </svg>
              ),
            },
            {
              label: "내보내기",
              toast: "주간 리포트를 내보내고 있어요!",
              icon: (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 10v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3M8 2v8M5 7l3 3 3-3" />
                </svg>
              ),
            },
          ].map((btn) => (
            <Button
              key={btn.label}
              onClick={() => showToast(btn.toast)}
              variant="primary"
              size="sm"
              className="font-bold"
            >
              {btn.icon}
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {kpiCards.map((card) => (
          <KpiCard
            key={card.id}
            label={card.label}
            value={card.value}
            sub={card.sub}
            subVariant={card.subVariant}
            onClick={() => setActiveTab(card.id)}
            active={activeTab === card.id}
            valueClassName="text-4xl"
            labelClassName="text-text-sub text-[11px]"
            subClassName="text-[11px]"
          />
        ))}
      </div>

      <TabBar
        tabs={tabs}
        active={activeTab}
        onChange={(id) => setActiveTab(id as ProfTab)}
        variant="underline"
      />

      {activeTab === "today" && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-err rounded-full animate-pulse" />
              <span className="text-sm font-extrabold text-text-main">
                오늘 안에 챙기기
              </span>
              <span className="text-xs text-text-muted hidden sm:inline">
                기한 4시간 미만 임박 2건은 굵게 강조
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted">정렬 · 임박순</span>
              <Button
                onClick={() => showToast("선택한 학생에게 일괄 발송!")}
                variant="primary"
                size="sm"
                className="font-bold text-xs! rounded-lg py-1.25 px-3"
              >
                일괄 메시지
              </Button>
            </div>
          </div>
          <StudentTable students={STUDENTS_TODAY} initialCount={4} />
        </div>
      )}

      {activeTab === "week" && (
        <StudentTable students={STUDENTS_WEEK} initialCount={5} />
      )}

      {activeTab === "watch" && (
        <StudentTable students={STUDENTS_WATCH} showLastSeen initialCount={5} />
      )}

      {activeTab === "recover" && <RecoverGrid entries={STUDENTS_RECOVER} />}

      {activeTab === "summary" && <SummaryPanel />}
    </div>
  );
};
