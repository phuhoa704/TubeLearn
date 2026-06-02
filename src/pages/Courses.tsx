export default function Courses() {
  const courses = [
    { id: 1, name: 'Python 기초 핵심 프로그래밍', cat: '전공핵심 · 3학점', prof: '김민준 교수', room: 'IT관 302호 · 월 3,4 / 수 2', pct: 92, status: '수강 중' },
    { id: 2, name: '빅데이터의 이해와 실무 통계학', cat: '전공핵심 · 3학점', prof: '이서윤 교수', room: 'IT관 405호 · 화 1,2 / 목 3', pct: 68, status: '수강 중' },
    { id: 3, name: '글로벌 리더십 비즈니스 세미나', cat: '전공선택 · 2학점', prof: 'James Park', room: '국제관 101호 · 수 5,6', pct: 45, status: '수강 중' },
    { id: 4, name: '창의융합 디자인사고 워크숍', cat: '일반교양 · 2학점', prof: '박다은 교수', room: '인문학관 204호 · 금 3,4', pct: 10, status: '수강 중' }
  ]

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main">
          나의 수강 강의실
        </h1>
        <p className="text-xs text-text-sub font-medium mt-1">
          현재 수강하고 있는 정규 학사 강의와 교수 정보, 강의실 배치 정보 및 주차별 학습 진도를 조회합니다.
        </p>
      </header>

      {/* Grid structure of course cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <div 
            key={c.id}
            onClick={() => alert(`[${c.name}] 사이버 강의실로 입장합니다!`)}
            className="bg-surface-main border border-border-main rounded-r3 p-5 shadow-sh1 hover:shadow-sh2 hover:border-border-alt cursor-pointer transition-all duration-150 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <header className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-bold text-primary tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-primary-light border border-primary-accent select-none">
                  {c.cat}
                </span>
                <span className="bg-ok/10 text-ok border border-ok/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {c.status}
                </span>
              </header>

              <h2 className="text-[14px] font-extrabold text-text-main leading-snug">
                {c.name}
              </h2>

              <div className="text-[11px] text-text-sub font-medium space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <span>👤 담당교수:</span>
                  <span className="text-text-main font-bold">{c.prof}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>📍 강의실 정보:</span>
                  <span className="text-text-main font-semibold">{c.room}</span>
                </div>
              </div>
            </div>

            {/* Course progress footer */}
            <div className="border-t border-border-main/50 mt-5 pt-4 space-y-2 select-none">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-text-muted">학습 진도율</span>
                <span className="text-text-main">{c.pct}% 수강 완료</span>
              </div>
              <div className="h-1.5 w-full bg-surface-alt rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </section>

    </div>
  )
}
