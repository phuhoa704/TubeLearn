import { Button } from "../../../../components/ui";
import { showToast } from "../../../../lib/toast";
import { cn } from "../../../../lib/utils";
import { STUDENT_COURSES } from "../../../../mocks/dashboard";
import { KpiCard } from "../KpiCard";

export const SubjectsTab = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 flex-wrap">
        <div>
          <div className="text-xl font-extrabold text-text-main mb-1 flex items-center gap-2">
            이번 학기 과목
            <span className="text-lg font-bold text-primary">5개</span>
          </div>
          <div className="text-[12px] text-text-sub">
            과목별 학습 데이터 분석 — 위험·정상·향상 흐름이 한눈에.{" "}
            <strong>분석 결과만</strong> 보여드려요 (강의 시청·과제 제출 같은
            학습 행위는 LMS에서).
          </div>
        </div>
        <span className="w-fit md:w-auto text-[11px] font-bold px-2.5 py-1 rounded-full bg-surface-alt text-text-sub border border-border-main shrink-0">
          학기 · 2026-1
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <KpiCard
          label="전체 평균 참여"
          value="71"
          unit="%"
          sub="↗ +6%p / 전주"
          subVariant="ok"
        />
        <KpiCard
          label="전체 평균 이해도"
          value="68"
          unit="%"
          sub="→ 안정"
          subVariant="default"
        />
        <KpiCard
          label="주의 과목"
          value="1"
          sub="⚠ 선형대수 추세 ↓"
          subVariant="warn"
        />
        <KpiCard
          label="회복 과목 ✨"
          value="1"
          sub="↗ 미분적분학 +12p"
          subVariant="ok"
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-[13.5px] font-extrabold text-text-main">
          과목별 분석
        </div>
        <span className="text-[11.5px] text-primary font-semibold">
          정렬 · 위험순
        </span>
      </div>

      <div className="space-y-3">
        {STUDENT_COURSES.map((course) => (
          <div
            key={course.id}
            className={cn(
              "bg-surface-main border rounded-r3 p-5 border-l-[3px]",
              course.state === "danger"
                ? "border-border-main border-l-err"
                : course.state === "recover"
                  ? "border-border-main border-l-primary"
                  : "border-border-main border-l-ok",
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-extrabold text-text-main">
                  {course.name}
                </span>
                {course.state === "recover" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-recover-bg text-recover border border-primary/20">
                    회복 ✨
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-[10.5px] font-bold px-2.5 py-1 rounded-full border",
                    course.state === "danger"
                      ? "bg-danger-bg text-danger border-danger-bg"
                      : course.state === "recover"
                        ? "bg-recover-bg text-recover border-recover-bg"
                        : "bg-normal-bg text-normal border-normal-bg",
                  )}
                >
                  {course.state === "danger"
                    ? "● 주의"
                    : course.state === "recover"
                      ? "● 회복"
                      : "● 정상"}
                </span>
                <span className="text-[11px] text-text-muted">
                  위험도{" "}
                  <strong className="text-text-main">{course.riskScore}</strong>
                </span>
              </div>
            </div>
            <div className="text-[11.5px] text-text-muted mb-4">
              {course.professor} · {course.code} · {course.schedule}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-[10.5px] text-text-muted font-semibold mb-1">
                  참여율
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-lg font-bold text-text-main">
                    {course.participation}%
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                      course.participationDelta > 0
                        ? "bg-normal-bg text-normal"
                        : course.participationDelta < 0
                          ? "bg-danger-bg text-danger"
                          : "bg-surface-alt text-text-muted",
                    )}
                  >
                    {course.participationDelta > 0
                      ? `↗ +${course.participationDelta}%p`
                      : course.participationDelta < 0
                        ? `↓ ${course.participationDelta}%p`
                        : "→ 안정"}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10.5px] text-text-muted font-semibold mb-1">
                  이해도
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-lg font-bold text-text-main">
                    {course.understanding}%
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                      course.state === "danger"
                        ? "bg-danger-bg text-danger"
                        : "bg-surface-alt text-text-muted",
                    )}
                  >
                    {course.state === "danger"
                      ? `↓ 평균 -${Math.abs(course.understandingDelta)}%p`
                      : "→ 안정"}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10.5px] text-text-muted font-semibold mb-1">
                  {course.signals
                    ? "활성 신호"
                    : course.recover
                      ? "회복 패턴"
                      : course.strength
                        ? "강점"
                        : course.weak
                          ? "개념 영역"
                          : "최근 활동"}
                </div>
                <div className="flex flex-wrap gap-1">
                  {course.signals?.map((s, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold bg-danger-bg text-danger px-1.5 py-0.5 rounded border border-err/20"
                    >
                      {s}
                    </span>
                  ))}
                  {course.recover && (
                    <span className="text-[11px] text-recover font-semibold">
                      {course.recover.badge} {course.recover.desc}
                    </span>
                  )}
                  {course.strength && (
                    <span className="text-[11px] text-ok font-semibold">
                      {course.strength}
                    </span>
                  )}
                  {course.weak && (
                    <span className="text-[11px] text-[#d97706] font-semibold">
                      {course.weak}
                    </span>
                  )}
                  {course.lastUpdate && (
                    <span className="text-[11px] text-text-muted">
                      {course.lastUpdate} 분석 갱신
                    </span>
                  )}
                </div>
              </div>
            </div>

            {course.state === "danger" && (
              <div className="flex gap-2 flex-wrap pt-3 border-t border-border-main">
                <Button
                  onClick={() => showToast("분석에 따른 추천을 확인합니다!")}
                  variant="primary"
                  size="sm"
                  className="text-xs! font-bold"
                >
                  분석에 따른 추천 보기
                </Button>
                <Button
                  onClick={() => showToast("학습 패턴을 분석합니다!")}
                  variant="ghost"
                  size="sm"
                  className="text-xs! font-bold"
                >
                  학습 패턴 분석
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
