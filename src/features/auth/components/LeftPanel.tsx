export const LeftPanel = () => {
  return (
    <section className="lg:w-[44%] bg-primary lg:flex flex-col hidden justify-center relative overflow-hidden transition-colors shrink-0 px-13 py-12 lg:lg-left">
      <div className="flex items-center gap-3 mb-13 relative z-1">
        <div className="w-10.5 h-10.5 bg-white/20 rounded-r2 flex items-center justify-center shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#fff"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 2L12.5 8H18L13.5 11.5L15.5 18L10 14.5L4.5 18L6.5 11.5L2 8H7.5L10 2Z" />
          </svg>
        </div>
        <span className="text-xl font-extrabold text-white tracking-tighter">
          tubeLearn4U
        </span>
      </div>

      <div className="lg-headline">
        <div className="lg-badge">
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            stroke="rgba(255,255,255,.8)"
            stroke-width="1.5"
          >
            <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" />
          </svg>
          AI 기반 스마트 학습 플랫폼
        </div>
        <div className="lg-title">
          학습의 모든 것을
          <br />한 곳에서
        </div>
        <div className="lg-desc">
          LMS와 AI가 결합된 인튜브의 지능형 학습 관리 시스템으로
          <br />
          맞춤형 학습 경험을 시작하세요.
        </div>
        <div className="lg-features">
          <div className="lg-feat">
            <div className="lg-feat-ic">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#fff"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="10" cy="13" r="5" />
                <path d="M7.5 8.5L6 3h8l-1.5 5.5" />
                <circle cx="10" cy="13" r="2" />
              </svg>
            </div>
            <div>
              <div className="lg-feat-t">K-CESA 역량 진단</div>
              <div className="lg-feat-s">6대 핵심역량 AI 분석 및 맞춤 추천</div>
            </div>
          </div>
          <div className="lg-feat">
            <div className="lg-feat-ic">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#fff"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="14" height="14" rx="3" />
                <path d="M7 10l2.5 2.5L13 8" />
              </svg>
            </div>
            <div>
              <div className="lg-feat-t">스마트 학습 리마인더</div>
              <div className="lg-feat-s">마감일 기반 자동 할 일 관리</div>
            </div>
          </div>
          <div className="lg-feat">
            <div className="lg-feat-ic">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#fff"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="7" width="14" height="10" rx="3" />
                <path d="M7 7V5a3 3 0 016 0v2" />
                <circle cx="8.5" cy="12" r="1" fill="#fff" stroke="none" />
                <circle cx="11.5" cy="12" r="1" fill="#fff" stroke="none" />
              </svg>
            </div>
            <div>
              <div className="lg-feat-t">AI tubeBot</div>
              <div className="lg-feat-s">24시간 학습 도우미 챗봇</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
