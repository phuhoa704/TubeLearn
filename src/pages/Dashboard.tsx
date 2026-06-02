import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button, Card, Badge, StatCard, ProgressBar } from '../components/ui';

interface Course {
  id: number;
  name: string;
  category: string;
  pct: number;
  color: string;
}

interface Task {
  id: number;
  name: string;
  meta: string;
  tag: string;
  badgeVariant: 'ok' | 'error' | 'primary';
  done: boolean;
}

/* ── SVG Icons ── */
const IconFire   = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2c0 4-4 5-4 9a4 4 0 008 0c0-3-2-5-2-7-1 2-2 3-2 5a2 2 0 004 0c0-3-4-5-4-7z"/></svg>;
const IconClock  = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l2.5 2.5"/></svg>;
const IconTrophy = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8v6a4 4 0 01-8 0V3z"/><path d="M6 6H3a2 2 0 002 2M14 6h3a2 2 0 01-2 2M10 13v4M7 17h6"/></svg>;
const IconGem    = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7-5 7 5-7 9-7-9z"/><path d="M3 8h14"/></svg>;
const IconChart  = () => <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="2" y="12" width="3" height="6"/><rect x="8" y="8" width="3" height="10"/><rect x="14" y="4" width="3" height="14"/></svg>;
const IconTarget = () => <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="4"/><circle cx="10" cy="10" r="1" fill="currentColor"/></svg>;
const IconBook   = () => <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 3h8a2 2 0 012 2v11a2 2 0 01-2 2H4V3z"/><path d="M14 5h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/><path d="M8 7h4M8 10h4M8 13h2"/></svg>;
const IconCheck  = () => <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 10l4 4 8-8"/></svg>;
const IconArrow  = () => <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 10h12M11 5l5 5-5 5"/></svg>;

export default function Dashboard() {
  const navigate = useNavigate();
  const { role } = useOutletContext<{ role: 'student' | 'prof' }>();

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'KCESA 역량 진단 사전 설문', meta: '학습역량 진단 전 필수 참여 항목', tag: '완료', badgeVariant: 'ok', done: true },
    { id: 2, name: 'Python 프로그래밍 13주차 과제 제출', meta: '제출 마감: 오늘 23:59까지', tag: 'D-Day', badgeVariant: 'error', done: false },
    { id: 3, name: 'AI 추천 비교과 [창업 기업가정신] 수강신청', meta: '신청 기간: ~ 06월 05일 금요일', tag: 'D-4', badgeVariant: 'primary', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextDone = !t.done;
      return {
        ...t,
        done: nextDone,
        tag: nextDone ? '완료' : (t.id === 2 ? 'D-Day' : 'D-4'),
        badgeVariant: nextDone ? 'ok' : (t.id === 2 ? 'error' : 'primary'),
      };
    }));
  };

  const doneCount = tasks.filter(t => t.done).length;

  const courses: Course[] = [
    { id: 1, name: 'Python 기초 핵심 프로그래밍', category: '컴퓨터공학과 · 전공핵심', pct: 92, color: 'var(--p)' },
    { id: 2, name: '빅데이터의 이해와 실무 통계학', category: '컴퓨터공학과 · 전공핵심', pct: 68, color: 'var(--p)' },
    { id: 3, name: '글로벌 리더십 비즈니스 세미나', category: '인문학부 · 전공선택', pct: 45, color: 'var(--p)' },
    { id: 4, name: '창의융합 디자인사고 워크숍', category: '교양교육원 · 일반교양', pct: 10, color: 'var(--p)' },
  ];

  const competencies = [
    { name: '자기주도적 학습역량', score: 85, change: '+5' },
    { name: '대인관계 학습역량', score: 72, change: '-1' },
    { name: '창의융합 학습역량', score: 80, change: '+4' },
    { name: '글로벌 소통역량', score: 64, change: '0' },
    { name: '정보분석 학습역량', score: 79, change: '+3' },
  ];

  const weeklyData = [
    { day: '월', min: 45 }, { day: '화', min: 90 }, { day: '수', min: 30 },
    { day: '목', min: 75 }, { day: '금', min: 60 }, { day: '토', min: 120 },
    { day: '일', min: 80, today: true },
  ];
  const totalMin = weeklyData.reduce((a, d) => a + d.min, 0);
  const avgMin   = Math.round(totalMin / weeklyData.length);

  return (
    <div className="space-y-6">

      {/* ── 페이지 헤더 ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold tracking-tight text-[var(--tx)]">
            {role === 'prof' ? '홍길동 교수님, 반갑습니다!' : '홍길동님, 오늘 스마트 학습 현황입니다!'}
          </h1>
          <p className="text-[13px] text-[var(--tx2)] mt-1">
            {role === 'prof'
              ? '비교과 강좌 관리와 소속 학생들의 역량 종합 진단 통계를 파악해보세요.'
              : 'AI 학습 튜터가 진단 결과를 기반으로 오늘의 권장 학습을 맞춤 설계했습니다.'}
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          iconRight={<IconArrow />}
          onClick={() => navigate('/competency')}
        >
          🎯 역량 진단 바로가기
        </Button>
      </header>

      {/* ── 통계 카드 4개 ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<IconFire />}
          label="학습 참여율"
          value="84"
          unit="%"
          sub={<><span style={{ color: 'var(--ok)' }}>▲ 3.4%</span> 전주 대비 증가</>}
        />
        <StatCard
          icon={<IconClock />}
          label="주간 학습 시간"
          value="8.3"
          unit="시간"
          sub={<><span style={{ color: 'var(--warn)' }}>● 대기 중</span> 금주 목표 10시간 중</>}
          accent="--warn"
        />
        <StatCard
          icon={<IconTrophy />}
          label="진단 역량 지수"
          value="76"
          unit="점"
          accent="--ok"
          sub={<><span style={{ color: 'var(--ok)' }}>우수</span> 전체 평균 68점 대비</>}
        />
        <StatCard
          icon={<IconGem />}
          label="획득 마일리지"
          value="380"
          unit="M"
          sub={<><span style={{ color: 'var(--p)' }}>D-120</span> 다음 실버 등급까지</>}
        />
      </section>

      {/* ── 중단: 주간 차트 + 역량 현황 ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* 주간 학습 시간 차트 */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <Card.Body>
            <Card.Header icon={<IconChart />} title="주간 학습 시간 추이 (분)" action="최근 7일 기준" />
            <div className="flex items-end justify-between h-[150px] gap-2 md:gap-4 px-2">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 group">
                  <div className="w-full flex flex-col items-center justify-end flex-1 pb-1 relative h-[120px]">
                    <div className={[
                      'absolute -top-7 scale-0 group-hover:scale-100 transition-all duration-150',
                      'text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10',
                      d.today
                        ? 'bg-[var(--p)] text-white'
                        : 'bg-[var(--sur2)] text-[var(--tx)] border border-[var(--bd)]',
                    ].join(' ')}>
                      {d.min}분
                    </div>
                    <div
                      className="w-full rounded-t-sm transition-all duration-300 cursor-pointer"
                      style={{
                        height: `${(d.min / 140) * 100}%`,
                        minHeight: 4,
                        background: d.today ? 'var(--p)' : 'var(--bd)',
                      }}
                    />
                  </div>
                  <span className={`text-[11px] mt-1 font-bold ${d.today ? 'text-[var(--p)]' : 'text-[var(--tx3)]'}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </Card.Body>
          <Card.Divider />
          <div className="grid grid-cols-3 py-4 text-center select-none">
            <div>
              <div className="text-[16px] font-black text-[var(--tx)]">{totalMin}분</div>
              <div className="text-[10px] text-[var(--tx3)] font-semibold mt-1">총 수강 시간</div>
            </div>
            <div>
              <div className="text-[16px] font-black text-[var(--tx)]">{avgMin}분</div>
              <div className="text-[10px] text-[var(--tx3)] font-semibold mt-1">일 평균 수강</div>
            </div>
            <div>
              <div className="text-[16px] font-black text-[var(--p)]">92%</div>
              <div className="text-[10px] text-[var(--tx3)] font-semibold mt-1">목표 달성률</div>
            </div>
          </div>
        </Card>

        {/* 핵심 역량 현황 */}
        <Card className="flex flex-col">
          <Card.Body className="flex-1 flex flex-col">
            <Card.Header
              icon={<IconTarget />}
              title="핵심 역량 분석 현황"
              action={
                <button
                  onClick={() => navigate('/competency')}
                  className="text-[11px] text-[var(--p)] hover:underline bg-transparent border-none cursor-pointer font-bold"
                >
                  자세히 보기
                </button>
              }
            />
            <div className="flex-1 flex flex-col justify-center space-y-3">
              {competencies.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-[11.5px] font-semibold mb-1">
                    <span className="text-[var(--tx2)]">{c.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--tx)] font-black">{c.score}점</span>
                      {c.change !== '0' && (
                        <span className="text-[10px] font-bold text-[var(--ok)]">{c.change}</span>
                      )}
                    </div>
                  </div>
                  <ProgressBar value={c.score} height={5} />
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

      </section>

      {/* ── 하단: 강의 진도 + 오늘의 할 일 ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* 강의 진도율 */}
        <Card>
          <Card.Body>
            <Card.Header icon={<IconBook />} title="수강 강의 진도 현황" action="정규 4개 교과" />
            <div className="divide-y divide-[var(--bd)]">
              {courses.map(c => (
                <div
                  key={c.id}
                  onClick={() => alert(`[${c.name}] 강의실로 이동합니다!`)}
                  className="py-3.5 flex items-center justify-between gap-3 group cursor-pointer hover:bg-[var(--sur2)]/50 rounded px-1 -mx-1 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-bold text-[var(--tx)] group-hover:text-[var(--p)] transition-colors truncate">{c.name}</div>
                    <div className="text-[10.5px] text-[var(--tx3)] mt-0.5 font-medium">{c.category}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar value={c.pct} color={c.color} height={4} className="hidden sm:block w-[120px]" />
                    <span className="text-[12px] font-black text-[var(--tx)] w-10 text-right">{c.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* 오늘의 할 일 */}
        <Card>
          <Card.Body>
            <Card.Header
              icon={<IconCheck />}
              title={`오늘의 학습 목표 (${doneCount}/${tasks.length})`}
              action="목표 달성 체크"
            />
            <div className="divide-y divide-[var(--bd)]">
              {tasks.map(t => (
                <div key={t.id} className="py-3 flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => toggleTask(t.id)}
                    className={[
                      'w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-150',
                      t.done
                        ? 'bg-[var(--p)] border-[var(--p)] text-white shadow-sm'
                        : 'border-[var(--bd2)] bg-[var(--sur)] text-transparent hover:border-[var(--p)]/50',
                    ].join(' ')}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                    </svg>
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className={[
                      'text-[12.5px] font-bold transition-all duration-150',
                      t.done ? 'text-[var(--tx3)] line-through' : 'text-[var(--tx)]',
                    ].join(' ')}>
                      {t.name}
                    </div>
                    <div className="text-[10.5px] text-[var(--tx3)] mt-0.5 font-medium">{t.meta}</div>
                  </div>

                  <Badge variant={t.badgeVariant} dot>{t.tag}</Badge>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

      </section>
    </div>
  );
}
