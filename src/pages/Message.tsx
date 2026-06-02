export default function Message() {
  const messages = [
    { id: 1, sender: '이서윤 교수', dept: '빅데이터의 이해', text: '길동 학생, 과제 보완안을 잘 검토했습니다. 보강 동영상 13강을 한번 시청하면 많은 도움이 될 겁니다.', date: '오후 2:10', read: false },
    { id: 2, sender: '학습 튜터링 센터', dept: '역량 상담 부서', text: 'KCESA 종합 핵심역량 진단 미참여자 독려 안내입니다. 수강생 평가 기한은 06월 05일까지입니다.', date: '어제', read: false },
    { id: 3, sender: '김민준 교수', dept: 'Python 기초', text: '기말고사 서술형 채점이 완료되었습니다. 성적 이의 신청 기간은 이번 주 목요일까지이므로 참고하세요.', date: '3일 전', read: true }
  ]

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main">
          학습 쪽지 및 상담 메시지
        </h1>
        <p className="text-xs text-text-sub font-medium mt-1">
          수강 중인 교과목 교수님이나 AI 학습 튜터링 상담사로부터 발송된 개별 피드백 쪽지를 조회합니다.
        </p>
      </header>

      {/* Message List */}
      <section className="bg-surface-main border border-border-main rounded-r3 shadow-sh1 overflow-hidden transition-colors duration-200">
        <header className="p-4 border-b border-border-main flex items-center justify-between">
          <h2 className="text-xs font-bold text-text-main">받은 쪽지함</h2>
          <span className="text-[11px] text-text-muted font-bold">최근 쪽지순</span>
        </header>

        <div className="divide-y divide-border-main">
          {messages.map((m) => (
            <div 
              key={m.id}
              onClick={() => alert(`[${m.sender} 쪽지]\n"${m.text}"`)}
              className="p-4 flex items-start gap-4 hover:bg-surface-alt/25 transition-colors cursor-pointer relative"
            >
              {/* Profile Avatar circle */}
              <div className="w-9 h-9 rounded-full bg-primary-light text-primary flex items-center justify-center font-extrabold text-xs flex-shrink-0">
                {m.sender[0]}
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0 pr-12">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-xs font-extrabold text-text-main">{m.sender}</span>
                  <span className="text-[10px] text-text-muted font-semibold">{m.dept}</span>
                </div>
                <p className="text-xs text-text-sub leading-relaxed font-medium truncate">
                  {m.text}
                </p>
              </div>

              {/* Time and Unread dot */}
              <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5 select-none">
                <span className="text-[9.5px] text-text-muted font-bold">{m.date}</span>
                {!m.read && (
                  <span className="w-2.5 h-2.5 bg-err rounded-full border-2 border-surface-main" title="읽지 않은 메시지"></span>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
