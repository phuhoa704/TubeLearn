import { useEvidenceToggle } from "../../hooks/useEvidenceToggle";
import { showToast } from "../../../../lib/toast";
import { REC_ITEMS } from "../../../../mocks/dashboard";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../../components/ui";

export const RecommendTab = () => {
  const { isOpen, toggleEvidence } = useEvidenceToggle();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 flex-wrap">
        <div>
          <div className="text-xl font-extrabold text-text-main mb-1 flex items-center gap-2">
            이번 주 추천
            <span className="text-xl font-bold text-primary">3가지</span>
          </div>
          <div className="text-[12px] text-text-sub">
            김학생님의 학습 활동 로그를 근거로, 이 순서로 진행하면 가장
            효과적이에요.
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="text-xs! font-semibold">
            순서 직접 정렬
          </Button>
          <Button
            onClick={() => showToast("추천 목록을 새로 불러왔어요! ✨")}
            variant="ghost"
            size="sm"
            className="text-xs! font-semibold"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4H8" />
              <path d="M2 12v-4h4" />
              <path d="M12 6A5 5 0 007 2a5 5 0 00-4.6 3M2 8a5 5 0 005 4 5 5 0 004.6-3" />
            </svg>
            새로고침
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-5 bg-primary-light border border-primary rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
            <svg
              width="17"
              height="17"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="10" r="8" />
              <path d="M6.5 10l2.5 2.5 4.5-4.5" />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-extrabold text-primary mb-1">
              Next Best Action
            </div>
            <div className="text-[12px] text-text-sub leading-relaxed">
              이번 주 이 3개를 <strong>① 보충 영상</strong> →{" "}
              <strong>② 연습 문제</strong> → <strong>③ 비교과 신청</strong>{" "}
              순서로 진행하세요. 약 1시간 15분 소요.
            </div>
          </div>
        </div>
        <Button
          onClick={() => showToast("전체 학습을 시작합니다! 🚀")}
          size="sm"
          variant="primary"
          className="font-bold"
        >
          전체 시작
        </Button>
      </div>

      <div className="space-y-3">
        {REC_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-surface-main border border-border-main rounded-xl p-4 flex gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-primary-light text-text-sub font-extrabold text-[14px] flex items-center justify-center shrink-0 border border-primary/20">
              {item.num}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="text-[13px] font-bold text-text-main">
                  {item.title}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="flex items-center gap-1 text-[10.5px] font-semibold text-text-muted bg-surface-alt px-2 py-0.5 rounded-full border border-border-main">
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <circle cx="7" cy="7" r="6" />
                      <path d="M7 4v3l2 1.5" />
                    </svg>
                    {item.duration}
                  </span>
                  <span
                    className={cn(
                      "text-[10.5px] font-bold px-2 py-0.5 rounded-full border",
                      item.badgeType === "priority"
                        ? "bg-primary-light text-primary border-primary"
                        : item.badgeType === "deadline"
                          ? "bg-danger-bg text-danger border-danger"
                          : "bg-recover-bg text-recover border-recover",
                    )}
                  >
                    {item.priority}
                  </span>
                </div>
              </div>
              <div className="text-[12px] text-text-sub leading-relaxed mb-3">
                {item.desc}
              </div>
              {item.evidence.length > 0 && (
                <div className="mb-3">
                  <button
                    onClick={() => toggleEvidence(item.id)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      className={cn(
                        "transition-transform duration-200",
                        isOpen(item.id) && "rotate-180",
                      )}
                    >
                      <path d="M2 3l3 4 3-4" />
                    </svg>
                    근거 활동 로그 {item.evidence.length}건
                  </button>
                  {isOpen(item.id) && (
                    <div className="mt-2 pl-3 space-y-1 border-l-2 border-border-main">
                      {item.evidence.map((e, i) => (
                        <div key={i} className="text-[11px] text-text-muted">
                          · {e}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => showToast(item.primaryToast)}
                  className={cn(
                    "text-[11.5px]! font-bold",
                    item.badgeType === "become"
                      ? "bg-recover text-white hover:opacity-90"
                      : "bg-primary text-white hover:bg-primary-hover",
                  )}
                  variant="primary"
                  size="sm"
                >
                  {item.primaryBtn}
                </Button>
                <Button
                  onClick={() => showToast(item.ghostToast)}
                  variant="ghost"
                  size="sm"
                >
                  {item.ghostBtn}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-3 border-t border-border-main text-[10.5px] text-text-muted text-center">
        이 추천은 claude-sonnet-4 · 캐시 적중 · semantic-layer v2026.05-b1a2
        으로 생성되었습니다.
      </div>
    </div>
  );
};
