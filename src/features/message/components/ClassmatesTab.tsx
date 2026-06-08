import type { Classmate } from "../../../types/message";

interface ClassmatesTabProps {
  classmates: Classmate[];
  onAddFriend: (id: string) => void;
  onMessage: (name: string) => void;
}

export function ClassmatesTab({
  classmates,
  onAddFriend,
  onMessage,
}: ClassmatesTabProps) {
  return (
    <div className="overflow-y-auto p-5 flex-1">
      <div className="flex items-start gap-2.5 bg-primary-light rounded-r2 px-4 py-3.5 mb-5">
        <span className="text-lg shrink-0">💡</span>
        <div>
          <div className="text-[13.5px] font-bold text-primary mb-0.5">
            같이 수강하는 학생들과 소통해보세요!
          </div>
          <div className="text-[12.5px] text-text-sub">
            같은 강의를 듣는 친구들과 학습 정보를 공유하고 질문도 나눠보세요.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3.5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {classmates.map((c) => (
          <div
            key={c.id}
            className="bg-surface-main border border-border-main rounded-r3 p-4 flex flex-col items-center text-center gap-2 shadow-sh1"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-surface-alt flex items-center justify-center text-3xl">
                {c.avatar}
              </div>
              {c.online && (
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-ok rounded-full border-2 border-surface-main" />
              )}
            </div>
            <div className="text-[13.5px] font-bold text-text-main">
              {c.name}
            </div>
            <div className="text-[11.5px] text-primary font-medium">
              📚 {c.course}
            </div>

            <div className="flex gap-1.5 mt-1 w-full">
              {c.isFriend ? (
                <button
                  className="flex-1 text-[12px] font-bold py-1.5 rounded-r1 border border-ok/40 text-ok bg-ok-bg cursor-not-allowed"
                  disabled
                >
                  ✓ 친구
                </button>
              ) : (
                <button
                  className="flex-1 text-[12px] font-semibold py-1.5 rounded-r1 border border-border-main text-text-sub hover:border-primary hover:text-primary transition-colors"
                  onClick={() => onAddFriend(c.id)}
                >
                  + 친구
                </button>
              )}
              <button
                className="flex-1 flex items-center justify-center gap-1 text-[12px] font-semibold py-1.5 rounded-r1 bg-primary text-white hover:bg-primary-hover transition-colors"
                onClick={() => onMessage(c.name)}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2H1a1 1 0 00-1 1v7a1 1 0 001 1h4l3 3 3-3h2a1 1 0 001-1V3a1 1 0 00-1-1z" />
                </svg>
                메시지
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
