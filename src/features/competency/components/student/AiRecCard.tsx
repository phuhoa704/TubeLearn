import { showToast } from "../../../../lib/toast";

const RECS = [
  {
    tag: "강화 추천",
    t: "글로벌 영어 커뮤니케이션",
    s: "글로벌 역량 62점 → 강화 필요",
  },
  {
    tag: "취약 보완",
    t: "팀 프로젝트 협업 워크숍",
    s: "대인관계 중재 역량 집중 강화",
  },
  {
    tag: "심화 학습",
    t: "비판적 사고력 심화 과정",
    s: "종합적 사고력 80점 → 90점 목표",
  },
  {
    tag: "추천 강의",
    t: "디지털 리터러시 실습",
    s: "자원·정보·기술 활용 85점 유지",
  },
  {
    tag: "진로 연계",
    t: "글로벌 인턴십 준비",
    s: "글로벌 역량 향상으로 취업 경쟁력 ↑",
  },
  {
    tag: "특강 안내",
    t: "프레젠테이션 스킬 특강",
    s: "의사소통 말하기 역량 개선",
  },
];

export function AiRecCard() {
  return (
    <div className="bg-surface-main border border-border-main rounded-r3 p-5 mb-4">
      <div className="flex items-center gap-1.5 text-sm font-extrabold text-text-main mb-3.5">
        <div className="text-text-muted">
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
            <rect x="2" y="8" width="12" height="6" rx="2" />
            <path d="M5 8V6a3 3 0 016 0v2" />
            <circle cx="8" cy="11" r="1" />
          </svg>
        </div>
        AI 맞춤 학습 추천
        <span className="badge badge-p" style={{ fontSize: 11 }}>
          tubeBot 분석
        </span>
      </div>

      <div
        className="grid grid-cols-3 gap-2.25 max-md:grid-cols-2 max-sm:grid-cols-1"
        id="recGrid"
      >
        {RECS.map((rec) => (
          <div
            key={rec.t}
            className="ritem bg-surface-alt rounded-r2 p-3.25 border-l-[3px] border-primary cursor-pointer transition-all duration-150 hover:bg-primary-light"
            onClick={() => showToast(`${rec.t} 수강신청이 접수되었습니다! 🎉`)}
          >
            <div className="ritem-tag text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
              {rec.tag}
            </div>
            <div className="ritem-t text-[13px] font-bold text-text-main mb-0.5 leading-[1.35]">
              {rec.t}
            </div>
            <div className="ritem-s text-[11.5px] text-text-muted">{rec.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
