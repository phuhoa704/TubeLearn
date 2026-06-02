import { useState } from 'react'

interface TodoItem {
  id: number
  title: string
  course: string
  due: string
  completed: boolean
  priority: 'High' | 'Mid' | 'Low'
  priorityClass: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: 'Python 프로그래밍 13주차 연습 과제 제출', course: 'Python 기초 핵심 프로그래밍', due: '오늘 23:59', completed: false, priority: 'High', priorityClass: 'bg-err-bg text-err border border-err/20' },
    { id: 2, title: '빅데이터 중간 실기 프로젝트 계획서 업로드', course: '빅데이터의 이해와 실무 통계학', due: '내일 18:00', completed: false, priority: 'High', priorityClass: 'bg-err-bg text-err border border-err/20' },
    { id: 3, title: '어학 점수 사본 및 자격증 업로드', course: '글로벌 리더십 비즈니스 세미나', due: 'D-3일 전까지', completed: true, priority: 'Mid', priorityClass: 'bg-warn-bg text-warn border border-warn/20' },
    { id: 4, title: '창의융합 교과서 5장 사전 예습 동영상 수강', course: '창의융합 디자인사고 워크숍', due: 'D-5일 전까지', completed: false, priority: 'Low', priorityClass: 'bg-primary/10 text-primary border border-primary/20' }
  ])

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main">
          학습 할 일 관리 (To-Do)
        </h1>
        <p className="text-xs text-text-sub font-medium mt-1">
          금주 마감되는 교과 과제 및 동영상 수강 목록을 관리하여 체계적으로 일정을 학습하세요.
        </p>
      </header>

      {/* Todo Summary Card */}
      <section className="bg-surface-main border border-border-main rounded-r3 p-5 shadow-sh1 transition-colors duration-200 flex flex-col sm:flex-row items-center gap-5 justify-between">
        <div className="flex items-center gap-4.5">
          <div className="w-12 h-12 rounded-r2 bg-primary-light flex items-center justify-center text-primary text-xl">
            📝
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-text-main">학습 목표 진행 현황</h2>
            <p className="text-[11.5px] text-text-sub font-medium mt-0.5">총 {todos.length}개의 일정 중 {completedCount}건 완료됨</p>
          </div>
        </div>

        {/* Progress visual bar */}
        <div className="flex-1 max-w-[280px] w-full space-y-1.5 select-none">
          <div className="flex justify-between text-[11px] font-bold text-text-muted">
            <span>목표 달성도</span>
            <span>{Math.round((completedCount / todos.length) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / todos.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* Todo List Group */}
      <section className="bg-surface-main border border-border-main rounded-r3 shadow-sh1 overflow-hidden transition-colors duration-200 divide-y divide-border-main">
        {todos.map((t) => (
          <div key={t.id} className="p-4 flex items-center gap-3.5 hover:bg-surface-alt/25 transition-colors">
            
            {/* Checkbox button */}
            <button
              onClick={() => toggleTodo(t.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors duration-150 ${
                t.completed 
                  ? 'bg-primary border-primary text-white shadow-sm' 
                  : 'border-border-alt bg-surface-main text-transparent hover:border-primary/50'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>

            <div className="flex-1 min-w-0">
              <div className={`text-[12.5px] font-extrabold transition-all duration-150 ${
                t.completed ? 'text-text-muted line-through decoration-text-muted/60' : 'text-text-main'
              }`}>
                {t.title}
              </div>
              <div className="text-[10.5px] text-text-muted mt-0.5 font-medium">
                {t.course} · 마감기한: <span className="font-bold text-text-sub">{t.due}</span>
              </div>
            </div>

            {/* Priority Badge */}
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${t.priorityClass} select-none`}>
              {t.completed ? '완료' : t.priority}
            </span>
          </div>
        ))}
      </section>

    </div>
  )
}
