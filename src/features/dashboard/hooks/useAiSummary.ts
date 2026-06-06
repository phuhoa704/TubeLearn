import { useState } from "react";

export function useAiSummary() {
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

  return { aiSummary, aiLoading, generateSummary };
}
