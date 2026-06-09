import { useState, useMemo } from "react";
import { COMP_QUESTIONS, INITIAL_SCORES } from "../../../../mocks/competency";
import type { CompState, CompScore, ScoreLevel } from "../../../../types/competency";

const TOTAL = COMP_QUESTIONS.length;

export function useCompetency() {
  const [compState, setCompState] = useState<CompState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<CompScore[]>(INITIAL_SCORES);

  const goTest = () => {
    setAnswers({});
    setCurrentQ(0);
    setCompState("test");
  };

  const goIntro = () => setCompState("intro");

  const progress = Math.round(((currentQ + 1) / TOTAL) * 100);
  const answeredCount = Object.keys(answers).length;

  const currentQuestion = COMP_QUESTIONS[currentQ];

  const prevQ = () => setCurrentQ((p) => Math.max(0, p - 1));
  const nextQ = () => setCurrentQ((p) => Math.min(TOTAL - 1, p + 1));
  const jumpQ = (qIndex: number) => setCurrentQ(Math.min(Math.max(0, qIndex), TOTAL - 1));

  const handleAnswer = (qId: number, val: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleFinish = () => {
    if (answeredCount < TOTAL) {
      alert("모든 문항에 답변을 완료해주세요!");
      return;
    }
    const updated = INITIAL_SCORES.map((s) => {
      const qs = COMP_QUESTIONS.filter((q) => q.compId === s.compId);
      const sum = qs.reduce((acc, q) => acc + (answers[q.id] ?? 3), 0);
      const ns = Math.round((sum / qs.length) * 20);
      const level: ScoreLevel = ns >= 80 ? "High" : ns >= 60 ? "Mid" : "Low";
      return { ...s, score: ns, level };
    });
    setScores(updated);
    setCompState("result");
  };

  const totalScore = useMemo(
    () => Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length),
    [scores],
  );

  const weakScores = useMemo(
    () => scores.filter((s) => s.level === "Low"),
    [scores],
  );

  return {
    compState,
    goTest,
    goIntro,
    currentQ,
    currentQuestion,
    answers,
    answeredCount,
    progress,
    prevQ,
    nextQ,
    jumpQ,
    handleAnswer,
    handleFinish,
    scores,
    totalScore,
    weakScores,
  };
}
