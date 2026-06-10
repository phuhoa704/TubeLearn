import { Button } from "../../../../components/ui";
import { COMP_QUESTIONS, COMP6 } from "../../../../mocks/competency";
import type { CompQuestion } from "../../../../types/competency";
import { cn } from "../../../../lib/utils";

const SCALE_LABELS = [
  "전혀\n그렇지 않다",
  "그렇지\n않다",
  "보통이다",
  "그렇다",
  "매우\n그렇다",
];
const TOTAL = COMP_QUESTIONS.length;

interface Props {
  currentQ: number;
  currentQuestion: CompQuestion;
  answers: Record<number, number>;
  progress: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (qIndex: number) => void;
  onAnswer: (qId: number, val: number) => void;
  onFinish: () => void;
}

export function CompetencyTest({
  currentQ,
  currentQuestion,
  answers,
  progress,
  onPrev,
  onNext,
  onJump,
  onAnswer,
  onFinish,
}: Props) {
  const comp = COMP6.find((c) => c.id === currentQuestion.compId);
  const isLast = currentQ === TOTAL - 1;
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="max-w-170 mx-auto flex flex-col gap-4">
      <div>
        <div className="pg-title">K-CESA 역량 진단</div>
        <div className="pg-sub">각 문항을 읽고 해당하는 점수를 선택하세요</div>
      </div>

      <div className="bg-surface-main border border-border-main rounded-r2 px-4 py-3.5">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[13px] font-bold text-text-main">
            {currentQuestion.compName} 역량
          </div>
          <div className="text-xs text-text-muted font-semibold">
            {currentQ + 1} / {TOTAL}
          </div>
        </div>
        <div className="h-1.5 bg-surface-alt rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-[width] duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {COMP6.map((c, i) => {
          const starts = [0, 3, 6, 9, 12, 15];
          const compQs = COMP_QUESTIONS.slice(starts[i], starts[i] + 3);
          const isDone = compQs.every((q) => !!answers[q.id]);
          const isActive = currentQuestion.compId === c.id;

          return (
            <button
              key={c.id}
              onClick={() => onJump(starts[i])}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] text-[12px] font-semibold cursor-pointer transition-all duration-150 shrink-0",
                isActive
                  ? "border-primary text-primary bg-primary-light"
                  : isDone
                    ? "border-ok text-ok bg-ok-bg"
                    : "border-border-main bg-surface-main text-text-muted",
              )}
            >
              <div className="w-1.75 h-1.75 rounded-full bg-current shrink-0" />
              {c.name.split("·")[0].trim()}
            </button>
          );
        })}
      </div>

      <div className="bg-surface-main border border-border-main rounded-r3 p-6 flex flex-col gap-3">
        <span
          className="inline-flex items-center text-[12px] font-bold rounded-full px-3.25 py-1.25 border self-start"
          style={{
            background: comp ? `${comp.color}12` : undefined,
            color: comp?.color,
            borderColor: comp ? `${comp.color}28` : undefined,
          }}
        >
          {currentQuestion.compName} 역량
        </span>

        <div
          className="text-xs font-semibold text-text-muted tracking-wider"
          id="q-num"
        >
          문항 {currentQuestion.id}
        </div>

        <div
          className="text-base font-bold text-text-main leading-relaxed"
          id="q-text"
        >
          {currentQuestion.text}
        </div>

        <div className="flex justify-between text-[11px] text-text-muted">
          <span>전혀 그렇지 않다</span>
          <span>매우 그렇다</span>
        </div>

        <div className="flex gap-2" id="scale-opts">
          {[1, 2, 3, 4, 5].map((val) => {
            const isSelected = currentAnswer === val;
            return (
              <button
                key={val}
                id={`scale-opt-${val}`}
                onClick={() => onAnswer(currentQuestion.id, val)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-r2 border-[1.5px] cursor-pointer transition-all duration-150",
                  isSelected
                    ? "text-white"
                    : "border-border-main bg-surface-main text-text-main hover:bg-primary-light",
                )}
                style={
                  isSelected && comp
                    ? { backgroundColor: comp.color, borderColor: comp.color }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (!isSelected && comp) {
                    e.currentTarget.style.borderColor = comp.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "";
                  }
                }}
              >
                <span className="text-base font-black leading-none">{val}</span>
                <span
                  className={cn(
                    "text-[9px] font-semibold text-center whitespace-pre-line",
                    isSelected ? "opacity-90" : "opacity-70",
                  )}
                >
                  {SCALE_LABELS[val - 1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          id="comp-prev-btn"
          onClick={onPrev}
          className="font-bold"
          style={{ visibility: currentQ === 0 ? "hidden" : "visible" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M8 2L4 6l4 4" />
          </svg>
          이전
        </Button>

        <div className="text-xs text-text-muted font-medium" id="test-nav-i">
          {currentAnswer ? `선택: ${currentAnswer}점` : "문항을 선택해주세요"}
        </div>

        {isLast ? (
          <Button
            variant="primary"
            size="sm"
            id="comp-finish-btn"
            onClick={onFinish}
          >
            진단 완료
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M2 6l3 3 5-5" />
            </svg>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            id="comp-next-btn"
            onClick={onNext}
          >
            다음
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M4 2l4 4-4 4" />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}
