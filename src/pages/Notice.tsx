export default function Notice() {
  const notices = [
    { id: 1, title: '2026학년도 1학기 종합 핵심역량 진단(KCESA) 평가 안내', cat: '학사공지', date: '2026.06.01', urgent: true },
    { id: 2, title: 'IT융합대학 소프트웨어 경진대회 및 우수작 전시회 개최 안내', cat: '행사공지', date: '2026.05.28', urgent: false },
    { id: 3, title: '여름학기 계절수업 수강신청 일정 및 수강료 납부 안내', cat: '수강공지', date: '2026.05.25', urgent: false },
    { id: 4, title: '도서관 냉난방기 배관 전면 교체 공사에 따른 임시 휴관 안내', cat: '시설공지', date: '2026.05.20', urgent: false }
  ]

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main">
          학사 공지사항
        </h1>
        <p className="text-xs text-text-sub font-medium mt-1">
          본교 학사, 교과, 장학, 행사와 관련된 중요 공식 안내 사항을 확인하실 수 있습니다.
        </p>
      </header>

      {/* Notice List Table */}
      <section className="bg-surface-main border border-border-main rounded-r3 shadow-sh1 overflow-hidden transition-colors duration-200">
        <header className="p-4 border-b border-border-main flex items-center justify-between">
          <h2 className="text-xs font-bold text-text-main">전체 공지글</h2>
          <span className="text-[11px] text-text-muted font-bold">최신 업로드 순</span>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-alt/50 select-none">
                <th className="p-3.5 font-bold text-[10px] text-text-muted uppercase tracking-wider border-b border-border-main">분류</th>
                <th className="p-3.5 font-bold text-[10px] text-text-muted uppercase tracking-wider border-b border-border-main">제목</th>
                <th className="p-3.5 font-bold text-[10px] text-text-muted uppercase tracking-wider border-b border-border-main">등록일</th>
                <th className="p-3.5 font-bold text-[10px] text-text-muted uppercase tracking-wider border-b border-border-main text-right">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main font-medium">
              {notices.map((n) => (
                <tr 
                  key={n.id} 
                  onClick={() => alert(`[${n.title}] 상세 내용을 확인하기 위한 팝업창을 불러옵니다.`)}
                  className="hover:bg-surface-alt/30 transition-colors cursor-pointer"
                >
                  <td className="p-3.5">
                    <span className="bg-surface-alt text-text-sub text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {n.cat}
                    </span>
                  </td>
                  <td className="p-3.5 text-text-main text-[12.5px] font-extrabold max-w-[400px] truncate">
                    {n.title}
                  </td>
                  <td className="p-3.5 text-text-muted">{n.date}</td>
                  <td className="p-3.5 text-right select-none">
                    {n.urgent ? (
                      <span className="bg-err-bg text-err border border-err/10 text-[9.5px] font-bold px-2 py-0.5 rounded-full">
                        필독
                      </span>
                    ) : (
                      <span className="text-text-muted text-[10px] font-semibold">
                        일반
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
