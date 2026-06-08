import { Button } from "../../../components/ui";

interface Props {
  onStart: () => void;
}

export function CompetencyBanner({ onStart }: Props) {
  return (
    <div className="flex gap-5 items-center bg-surface-main border border-border-main rounded-r3 p-6 mb-5">
      <div className="w-13 h-13 rounded-r2 bg-primary-light text-primary flex items-center justify-center shrink-0">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="16" cy="21" r="8" />
          <path d="M11 13L9 5h14l-2 8" />
          <circle cx="16" cy="21" r="3" />
          <path d="M16 18v-5" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary-light rounded-full px-3 py-1 mb-2 border border-primary-accent">
          <svg
            width="11"
            height="11"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
          >
            <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" />
          </svg>
          K-CESA · 교육부 · 한국직업능력연구원(KRIVET)
        </div>
        <div className="text-xl font-extrabold text-text-main mb-1.5">
          K-CESA 대학생 핵심역량 진단
        </div>
        <div className="text-sm text-text-sub leading-relaxed">
          직업세계에서 요구되는 <b>6대 핵심역량</b>을 국가 표준 도구로
          진단합니다.
          <br />
          진단 결과로 강점·약점을 파악하고 AI 맞춤 학습 경로를 제안받으세요.
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0">
        <div className="text-center">
          <div className="text-[26px] font-black text-primary leading-none">
            18
          </div>
          <div className="text-xs text-text-muted mt-0.5">총 문항 수</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black text-primary leading-none">
            약 15분
          </div>
          <div className="text-xs text-text-muted mt-0.5">소요 시간</div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={onStart}
          id="comp-start-btn"
          className="text-sm font-bold"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M8 2v12M2 8h12" />
          </svg>
          진단 시작하기
        </Button>
      </div>
    </div>
  );
}
