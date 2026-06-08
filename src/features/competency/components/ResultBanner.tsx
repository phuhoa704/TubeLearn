import { Button } from "../../../components/ui";
import { showToast } from "../../../lib/toast";

interface Props {
  totalScore: number;
  onRetake: () => void;
}

export function ResultBanner({ totalScore, onRetake }: Props) {
  const rank =
    totalScore >= 85
      ? "10"
      : totalScore >= 75
        ? "23"
        : totalScore >= 65
          ? "40"
          : "55";

  return (
    <div className="flex gap-6 items-center rounded-r3 p-7 mb-5 text-white bg-surface-main">
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-ok-bg text-ok rounded-full px-3 py-1.5 border border-ok self-start">
          <svg
            width="11"
            height="11"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="7" cy="7" r="6" />
            <path d="M4.5 7l2 2 3-3" />
          </svg>
          진단 완료
        </div>
        <div className="text-lg font-extrabold text-text-main">
          김학생님의 K-CESA 역량 진단 결과
        </div>
        <div className="text-sm text-text-sub">
          6대 핵심역량 진단이 완료되었습니다. AI 맞춤 학습 경로를 준비했어요.
        </div>
        <div className="text-[11px] text-text-muted">
          진단 일시:{" "}
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · 소요 시간: 약 15분
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="font-bold rounded-r2"
            onClick={() => showToast("결과 다운로드 준비 중입니다.")}
          >
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
              <path d="M8 2v10M5 9l3 3 3-3" />
              <path d="M3 14h10" />
            </svg>
            결과 다운로드
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="font-bold rounded-r2"
            onClick={onRetake}
            id="comp-retake-btn"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M14 2v5H9" />
              <path d="M2 8a6 6 0 0110-4.5L14 7" />
              <path d="M2 14v-5h5" />
              <path d="M14 8a6 6 0 01-10 4.5L2 9" />
            </svg>
            재진단
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="font-bold rounded-r2"
            onClick={() => showToast("상세 리포트를 준비 중입니다.")}
          >
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
            상세 리포트
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center shrink-0 gap-1">
        <div className="text-[52px] font-black leading-none text-primary">
          {totalScore}
        </div>
        <div className="text-xs text-text-muted">종합 점수 / 100점</div>
        <div className="text-xs font-semibold text-ok">상위 {rank}%</div>
      </div>
    </div>
  );
}
