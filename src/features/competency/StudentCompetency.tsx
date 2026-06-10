import React from "react";
import { useCompetency } from "./hooks/useCompetency";
import {
  CompetencyBanner,
  Comp6Grid,
  GuideCards,
  CompetencyTest,
  ResultBanner,
  RadarChart,
  ScoreBars,
  DetailCards,
  AiRecCard,
  HistoryTable,
} from "./components/student";
import { Button } from "../../components/ui";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 mb-3 mt-1">
      <span className="w-1 h-4 bg-primary rounded-sm inline-block mr-1" />
      <span className="text-sm font-bold text-text-main">{children}</span>
    </div>
  );
}

export const StudentCompetency: React.FC = () => {
  const {
    compState,
    goTest,
    currentQ,
    currentQuestion,
    answers,
    progress,
    prevQ,
    nextQ,
    jumpQ,
    handleAnswer,
    handleFinish,
    scores,
    totalScore,
  } = useCompetency();

  return (
    <div className="space-y-4">
      {compState === "intro" && (
        <div id="cs-intro">
          <CompetencyBanner onStart={goTest} />

          <SectionTitle>K-CESA 6대 핵심역량</SectionTitle>
          <Comp6Grid />

          <SectionTitle>진단 안내</SectionTitle>
          <GuideCards />

          <SectionTitle>진단 이력</SectionTitle>
          <div className="bg-surface-main border-[1.5px] border-dashed border-border-main rounded-r2 py-9 px-6 flex flex-col items-center text-center gap-2 mb-5">
            <div className="text-text-muted w-13 h-13 rounded-full bg-surface-alt flex items-center justify-center ">
              <svg
                width="26"
                height="26"
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="22" height="20" rx="3" />
                <path d="M9 3v3M19 3v3M3 11h22M9 16h10M9 20h6" />
              </svg>
            </div>
            <div className="text-[14px] font-bold text-text-main">
              아직 진단 이력이 없어요
            </div>
            <div className="text-xs text-text-muted leading-relaxed">
              첫 번째 K-CESA 역량 진단을 시작해보세요!
              <br />
              진단 후 AI가 맞춤형 학습 경로를 추천해 드립니다.
            </div>
            <Button
              variant="primary"
              onClick={goTest}
              className="mt-4 font-bold"
              id="comp-start-btn-2"
            >
              지금 바로 시작하기
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M3 7h8M8 4l3 3-3 3" />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {compState === "test" && (
        <div id="cs-test">
          <CompetencyTest
            currentQ={currentQ}
            currentQuestion={currentQuestion}
            answers={answers}
            progress={progress}
            onPrev={prevQ}
            onNext={nextQ}
            onJump={jumpQ}
            onAnswer={handleAnswer}
            onFinish={handleFinish}
          />
        </div>
      )}

      {compState === "result" && (
        <div id="cs-result">
          <ResultBanner totalScore={totalScore} onRetake={goTest} />

          <div className="grid grid-cols-2 gap-4 mb-5 max-sm:grid-cols-1">
            <div className="card card-p">
              <div className="sec-h">
                <div className="sec-title">
                  <div className="sec-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M8 1.5L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 1.5Z" />
                    </svg>
                  </div>
                  역량 레이더 차트
                </div>
                <span className="badge badge-n">6대 역량</span>
              </div>
              <RadarChart scores={scores} />
            </div>

            <div className="card card-p">
              <div className="sec-h">
                <div className="sec-title">
                  <div className="sec-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M2 13V7M5.5 13V4M9 13V1M12.5 13V8" />
                      <path d="M1 13h14" />
                    </svg>
                  </div>
                  역량별 점수
                </div>
              </div>
              <ScoreBars scores={scores} />
            </div>
          </div>

          <SectionTitle>역량별 세부 분석</SectionTitle>
          <DetailCards scores={scores} />

          <AiRecCard />
          <HistoryTable scores={scores} totalScore={totalScore} />
        </div>
      )}
    </div>
  );
};
