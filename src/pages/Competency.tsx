import { useState } from 'react';
import { Button, Badge, Card, ProgressBar } from '../components/ui';

type TestState = 'before' | 'during' | 'after';
type TabType = 'diagnostic' | 'recommend' | 'history';

interface Question { id: number; cat: string; q: string }
interface ScoreDetail {
  name: string; score: number; avg: number;
  level: 'High' | 'Mid' | 'Low';
  badgeVariant: 'ok' | 'warn' | 'error';
  desc: string;
  subItems: { label: string; score: number }[];
}

const TABS: { key: TabType; label: string }[] = [
  { key: 'diagnostic', label: '역량 진단 평가' },
  { key: 'recommend',  label: 'AI 맞춤 학습 추천' },
  { key: 'history',    label: '진단 및 이수 이력' },
];

const QUESTIONS: Question[] = [
  { id: 1, cat: '자기주도 학습역량', q: '나는 새로운 정보나 지식을 학습할 때, 스스로 구체적인 목표를 세우고 계획적으로 실천하는 편이다.' },
  { id: 2, cat: '창의융합 학습역량', q: '나는 과제 해결이나 학습 과정에서 다양한 학문 분야의 아이디어를 융합하고 새로운 대안을 생각하는 것을 즐긴다.' },
  { id: 3, cat: '글로벌 소통역량', q: '나는 다국적 학생들이나 외국어 전공 서적을 접했을 때 두려움 없이 적극적으로 학습하고 소통하려고 노력한다.' },
];

const INITIAL_SCORES: ScoreDetail[] = [
  { name: '자기주도 역량', score: 85, avg: 65, level: 'High', badgeVariant: 'ok',
    desc: '자율적인 목표 수립 능력이 매우 우수하며 주도적으로 학습 계획을 성실하게 수행합니다.',
    subItems: [{ label: '계획 수립', score: 90 }, { label: '실천성', score: 80 }] },
  { name: '창의융합 역량', score: 80, avg: 60, level: 'High', badgeVariant: 'ok',
    desc: '다학제적 개념 결합 및 대안 도출 능력이 뛰어나 팀 과제 등에서 창의적인 해결책을 제안합니다.',
    subItems: [{ label: '확산적 사고', score: 85 }, { label: '융합 설계', score: 75 }] },
  { name: '글로벌 소통 역량', score: 64, avg: 70, level: 'Low', badgeVariant: 'error',
    desc: '외국어 활용 및 타문화 이해도가 상대적으로 낮아 관련 기초 교과 수강이나 비교과 체험 참여가 필요합니다.',
    subItems: [{ label: '외국어 표현', score: 58 }, { label: '글로벌 포용성', score: 70 }] },
];

const HISTORY = [
  { date: '2026.03.02', type: '신입생 진단',       score: 68, rank: '상위 34%', status: '진단 완료' },
  { date: '2026.06.01', type: '1학기 종합 진단', score: 76, rank: '상위 18%', status: '진단 완료' },
];

const LIKERT = ['전혀 아님', '아닌 편', '보통', '그런 편', '매우 그렇다'];

export default function Competency() {
  const [activeTab, setActiveTab] = useState<TabType>('diagnostic');
  const [testState, setTestState] = useState<TestState>('before');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<ScoreDetail[]>(INITIAL_SCORES);

  const handleAnswer = (qId: number, val: number) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(p => p + 1), 300);
    }
  };

  const handleFinish = () => {
    if (Object.keys(answers).length < QUESTIONS.length) { alert('모든 문항에 답변을 완료해주세요!'); return; }
    setScores(prev => prev.map((s, i) => {
      const ans = answers[i + 1] || 3;
      const ns = ans * 20;
      return {
        ...s, score: ns,
        level: ns >= 80 ? 'High' : ns >= 60 ? 'Mid' : 'Low',
        badgeVariant: ns >= 80 ? 'ok' : ns >= 60 ? 'warn' : 'error',
      };
    }));
    setTestState('after');
  };

  const resetTest = () => { setAnswers({}); setCurrentQ(0); setTestState('before'); };

  return (
    <div className="space-y-6">

      {/* 헤더 */}
      <header>
        <h1 className="text-[22px] font-extrabold tracking-tight text-[var(--tx)]">핵심 역량 진단 지원 포털 (KCESA)</h1>
        <p className="text-[13px] text-[var(--tx2)] mt-1">
          국가 공인 대학생 핵심 역량 진단 도구를 통해 개인의 성장을 설계하고 AI 추천 교과를 이수하세요.
        </p>
      </header>

      {/* 탭 내비게이션 */}
      <nav className="flex border-b border-[var(--bd)] select-none">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={[
              'py-3 px-6 text-[13px] font-bold border-b-2 cursor-pointer transition-all duration-150',
              activeTab === t.key
                ? 'border-[var(--p)] text-[var(--p)]'
                : 'border-transparent text-[var(--tx2)] hover:text-[var(--tx)]',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* ── 탭 1: 역량 진단 ── */}
      {activeTab === 'diagnostic' && (
        <div className="space-y-6">

          {/* BEFORE */}
          {testState === 'before' && (
            <div className="space-y-6">
              <Card>
                <Card.Body className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-14 h-14 rounded-[var(--r2)] bg-[var(--pl)] flex items-center justify-center text-2xl flex-shrink-0">📋</div>
                  <div className="flex-1 text-center md:text-left">
                    <Badge variant="primary" className="mb-2">2026학년도 1학기 종합 핵심역량 진단</Badge>
                    <h2 className="text-[15px] font-extrabold text-[var(--tx)] tracking-tight mb-1 mt-2">대학생 핵심역량 진단 평가를 시작하세요</h2>
                    <p className="text-[12px] text-[var(--tx2)] font-medium leading-relaxed">
                      진단 결과는 학업 성취도 분석 및 AI 강의 추천 등 맞춤형 학습 피드백에 활용됩니다. (소요시간 15분)
                    </p>
                  </div>
                  <Button variant="primary" size="sm" className="flex-shrink-0" onClick={() => setTestState('during')}>
                    진단 시작하기 →
                  </Button>
                </Card.Body>
              </Card>

              <div className="text-[11px] font-bold text-[var(--tx3)] uppercase tracking-wider mb-2">진단 항목 소개</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🎓', title: '자기주도적 학습역량', desc: '학습 계획 수립부터 스스로 목표를 세워 실천하고 반성하는 역량', tags: ['목표 설정', '시간 관리'] },
                  { icon: '💡', title: '창의융합 학습역량', desc: '다양한 개념들을 결합하여 창의적이고 다각적으로 대안을 도출하는 역량', tags: ['확산적 사고', '아이디어 결합'] },
                  { icon: '🌐', title: '글로벌 소통역량', desc: '외국어 실무 능력 및 타문화에 대한 개방적이고 포용적인 마인드 역량', tags: ['어학 활용', '문화 개방성'] },
                ].map((c, i) => (
                  <Card key={i}>
                    <Card.Body>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-8 h-8 rounded-[var(--r1)] bg-[var(--pl)] flex items-center justify-center text-sm">{c.icon}</span>
                        <h3 className="text-[12px] font-bold text-[var(--tx)]">{c.title}</h3>
                      </div>
                      <p className="text-[11px] text-[var(--tx2)] leading-relaxed mb-4">{c.desc}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {c.tags.map(tag => <Badge key={tag} variant="neutral">{tag}</Badge>)}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '⚡', title: '정확한 자가진단', desc: '솔직하고 객관적인 응답이 정확한 학습 분석의 기반이 됩니다.' },
                  { icon: '⏰', title: '총 30개 항목 구성', desc: '문항 당 평균 15초가 소요되며, 한 세션에서 종료해야 합니다.' },
                  { icon: '🎁', title: '인재 마일리지 지급', desc: '진단 완료 학생 전원에게 150M 대학 통합 마일리지가 지급됩니다.' },
                ].map((c, i) => (
                  <Card key={i}>
                    <Card.Body className="text-center">
                      <div className="text-xl mb-1.5">{c.icon}</div>
                      <h4 className="text-[12px] font-bold text-[var(--tx)] mb-1">{c.title}</h4>
                      <p className="text-[11px] text-[var(--tx3)] leading-relaxed">{c.desc}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* DURING */}
          {testState === 'during' && (
            <div className="max-w-[700px] mx-auto space-y-4">
              <Card>
                <Card.Body>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-bold text-[var(--tx)]">종합역량 정밀 분석 진행 중</span>
                    <span className="text-[11px] text-[var(--tx3)] font-bold">진행도: {currentQ + 1} / {QUESTIONS.length} 문항</span>
                  </div>
                  <ProgressBar value={((currentQ + 1) / QUESTIONS.length) * 100} height={8} />
                </Card.Body>
              </Card>

              <div className="flex gap-2 pb-2 overflow-x-auto select-none">
                {QUESTIONS.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQ(i)}
                    className={[
                      'flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer',
                      currentQ === i
                        ? 'border-[var(--p)] text-[var(--p)] bg-[var(--pl)] shadow-sm'
                        : answers[q.id]
                          ? 'border-[var(--ok)] text-[var(--ok)] bg-[var(--okb)]'
                          : 'border-[var(--bd)] bg-[var(--sur)] text-[var(--tx3)]',
                    ].join(' ')}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    문항 {q.id}
                  </button>
                ))}
              </div>

              <Card>
                <Card.Body className="space-y-6 p-8">
                  <Badge variant="primary">{QUESTIONS[currentQ].cat}</Badge>
                  <div className="text-[11px] font-bold text-[var(--tx3)]">QUESTION 0{QUESTIONS[currentQ].id}</div>
                  <h3 className="text-[15px] font-extrabold text-[var(--tx)] leading-relaxed select-text">
                    {QUESTIONS[currentQ].q}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-[var(--tx3)] px-1 font-bold">
                      <span>전혀 그렇지 않다</span><span>보통이다</span><span>매우 그렇다</span>
                    </div>
                    <div className="flex gap-2 select-none">
                      {[1, 2, 3, 4, 5].map(val => {
                        const selected = answers[QUESTIONS[currentQ].id] === val;
                        return (
                          <button
                            key={val}
                            onClick={() => handleAnswer(QUESTIONS[currentQ].id, val)}
                            className={[
                              'flex-1 py-3 px-1.5 rounded-[var(--r2)] border text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center',
                              selected
                                ? 'bg-[var(--p)] border-[var(--p)] text-white shadow-sm'
                                : 'bg-[var(--sur)] border-[var(--bd)] hover:border-[var(--p)] hover:bg-[var(--pl)] text-[var(--tx)]',
                            ].join(' ')}
                          >
                            <span className="text-[15px] font-black mb-1">{val}</span>
                            <span className={`text-[9px] ${selected ? 'text-white/80 font-bold' : 'text-[var(--tx3)] font-semibold'}`}>
                              {LIKERT[val - 1]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" disabled={currentQ === 0} onClick={() => setCurrentQ(p => p - 1)}>
                  ← 이전 문항
                </Button>
                <div className="text-[12px] text-[var(--tx3)] font-medium">
                  답변: {Object.keys(answers).length} / {QUESTIONS.length} 완료
                </div>
                {currentQ === QUESTIONS.length - 1 ? (
                  <Button variant="success" size="sm" onClick={handleFinish}>진단 완료하기 ✓</Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setCurrentQ(p => p + 1)}>다음 문항 →</Button>
                )}
              </div>
            </div>
          )}

          {/* AFTER */}
          {testState === 'after' && (
            <div className="space-y-6">
              <Card>
                <Card.Body className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <Badge variant="ok" className="mb-3">✓ 핵심역량 평가 진단 완료</Badge>
                    <h2 className="text-[15px] font-extrabold text-[var(--tx)] tracking-tight mb-1.5 mt-2">
                      홍길동님의 핵심역량 정밀 분석 리포트가 나왔습니다!
                    </h2>
                    <p className="text-[12px] text-[var(--tx2)] font-medium leading-relaxed max-w-[640px]">
                      진단 결과, 자기주도 역량 및 창의융합 역량은 최상위권인 반면 글로벌 소통 능력에서 다소 보완이 필요합니다.
                    </p>
                    <div className="flex gap-2 mt-4 select-none">
                      <Button variant="ghost" size="sm" onClick={resetTest}>🔄 재평가하기</Button>
                      <Button variant="primary" size="sm" onClick={() => setActiveTab('recommend')}>⚡ AI 맞춤 추천 강좌 수강하기</Button>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-center md:border-l md:border-[var(--bd)] md:pl-10 select-none">
                    <div className="text-[40px] font-black tracking-tight text-[var(--p)] leading-none">
                      76<span className="text-[13px] font-bold text-[var(--tx3)]"> / 100</span>
                    </div>
                    <div className="text-[10px] text-[var(--tx3)] font-bold tracking-wider mt-2.5">종합 역량 지수</div>
                    <div className="text-[12px] text-[var(--ok)] font-bold mt-1">매우 우수 (상위 18%)</div>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <h3 className="text-[12px] font-bold text-[var(--tx)] mb-5 flex items-center gap-2">
                    <span>📊</span><span>역량별 진단 지수 비교 (학생 vs. 대학 평균)</span>
                  </h3>
                  <div className="space-y-4">
                    {scores.map((s, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-semibold">
                          <span className="text-[var(--tx2)] font-bold">{s.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--p)] font-extrabold">{s.score}점</span>
                            <span className="text-[var(--tx3)] text-[10px]">평균 {s.avg}점</span>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-[var(--sur2)] rounded-full overflow-hidden relative">
                          <div className="h-full bg-[var(--p)] rounded-full transition-all duration-700 absolute left-0 top-0 z-10" style={{ width: `${s.score}%` }} />
                          <div className="h-full w-[2px] bg-[var(--bd2)] absolute top-0 z-20" style={{ left: `${s.avg}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scores.map((s, i) => (
                  <Card key={i} className="flex flex-col justify-between">
                    <Card.Body className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <h4 className="text-[12px] font-extrabold text-[var(--tx)]">{s.name}</h4>
                          <Badge variant={s.badgeVariant}>{s.level}</Badge>
                        </div>
                        <div className="text-[24px] font-black text-[var(--tx)] mb-2">
                          {s.score}<span className="text-[11px] text-[var(--tx3)] font-bold">점</span>
                        </div>
                        <p className="text-[11px] text-[var(--tx2)] leading-relaxed mb-4 font-medium">{s.desc}</p>
                      </div>
                      <div className="space-y-2 border-t border-[var(--bd)] pt-3">
                        {s.subItems.map((sub, si) => (
                          <div key={si} className="flex justify-between items-center text-[10.5px] font-semibold text-[var(--tx3)]">
                            <span>{sub.label}</span><span>{sub.score}점</span>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 탭 2: AI 추천 ── */}
      {activeTab === 'recommend' && (
        <div className="space-y-6">
          <Card>
            <Card.Body className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-11 h-11 rounded-[var(--r2)] bg-[var(--pl)] flex items-center justify-center text-xl flex-shrink-0">💡</div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-[13px] font-extrabold text-[var(--tx)] mb-0.5">핵심 역량 보완을 위한 AI 맞춤 추천 강의</h2>
                <p className="text-[11.5px] text-[var(--tx2)] font-medium leading-relaxed">
                  진단 결과 취약 역량인 <em className="text-[var(--p)] font-extrabold not-italic">[글로벌 소통 역량]</em> 및 <em className="text-[var(--p)] font-extrabold not-italic">[대인관계 역량]</em>을 완벽 보완하기 위한 강의입니다.
                </p>
              </div>
              <Badge variant="primary">추천 강의 3건 대기</Badge>
            </Card.Body>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { cat: '자기주도 역량 보완 · 온라인', title: '스타트업 성공 창업 전략 실무', desc: '자기 주도적으로 비즈니스 모델을 구상하고 혁신 창업을 설계하는 역량 중심 강의', seats: '정원 100명 · 선착순' },
              { cat: '대인관계 역량 보완 · 오프라인', title: '비즈니스 프레젠테이션 스피치', desc: '효율적인 의사 표현법과 대인 협업 프레젠테이션 스킬을 함양하는 실습 과정', seats: '정원 30명 · 선착순' },
              { cat: '글로벌 소통 역량 보완 · 온라인', title: '글로벌 비즈니스 영어 이메일', desc: '해외 비즈니스 파트너와의 비영어권 협상과 메일링 문장 작성을 위한 실무 코스', seats: '정원 150명 · 선착순' },
            ].map((rec, i) => (
              <Card key={i} hover className="border-l-4 border-l-[var(--p)] flex flex-col justify-between">
                <Card.Body className="flex flex-col h-full justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[var(--p)] tracking-wide uppercase mb-1">{rec.cat}</div>
                    <h3 className="text-[13px] font-extrabold text-[var(--tx)] mb-1.5 leading-snug">{rec.title}</h3>
                    <p className="text-[11px] text-[var(--tx3)] leading-relaxed mb-4">{rec.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--bd)]">
                    <span className="text-[10.5px] font-bold text-[var(--tx2)]">{rec.seats}</span>
                    <Button variant="outline" size="sm" onClick={() => alert(`${rec.title} 수강신청이 접수되었습니다!`)}>수강 신청</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── 탭 3: 진단 이력 ── */}
      {activeTab === 'history' && (
        <Card>
          <Card.Body>
            <Card.Header title="핵심역량 진단 히스토리" action="총 2건 진단 기록" />
          </Card.Body>
          <Card.Divider />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="bg-[var(--sur2)]/50 select-none">
                  {['진단 날짜', '진단 분류', '종합 점수', '환산 석차', '진단 상태', ''].map((h, i) => (
                    <th key={i} className={`p-3.5 font-bold text-[10px] text-[var(--tx3)] uppercase tracking-wider border-b border-[var(--bd)] ${i === 5 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bd)] font-medium">
                {HISTORY.map((h, i) => (
                  <tr key={i} className="hover:bg-[var(--sur2)]/30 transition-colors">
                    <td className="p-3.5 text-[var(--tx)]">{h.date}</td>
                    <td className="p-3.5 text-[var(--tx2)]">{h.type}</td>
                    <td className="p-3.5 text-[var(--p)] font-black">{h.score}점</td>
                    <td className="p-3.5 text-[var(--tx2)]">{h.rank}</td>
                    <td className="p-3.5"><Badge variant="ok">{h.status}</Badge></td>
                    <td className="p-3.5 text-right">
                      <Button variant="ghost" size="sm" onClick={() => alert(`[${h.type}] 성적표가 이메일로 발송되었습니다!`)}>성적표 출력</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
}
