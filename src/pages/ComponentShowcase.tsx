import React, { useState } from 'react';
import {
  Button, Card, Badge, StatCard, ProgressBar, Input, Avatar, Modal,
} from '../components/ui';

/* ── icons ── */
const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h12v13H4z"/><path d="M8 4V2M12 4V2"/><path d="M7 9h6M7 12h4"/>
  </svg>
);
const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2l2 5h5l-4 3 1.5 5L10 12l-4.5 3L7 10 3 7h5z"/>
  </svg>
);
const IconTick = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 8l3.5 3.5L13 4"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 7l8 5 8-5"/>
  </svg>
);
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/>
  </svg>
);
const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

/* ── Section wrapper ── */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-[13px] font-bold text-[var(--tx3)] uppercase tracking-widest mb-4">{title}</h2>
    {children}
  </section>
);

export default function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-extrabold text-[var(--tx)] tracking-tight mb-1">
          UI Component Library
        </h1>
        <p className="text-[14px] text-[var(--tx2)]">
          Shared primitives built on tubeLearn design tokens
        </p>
      </div>

      {/* ── Buttons ── */}
      <Section title="Button">
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="primary" icon={<IconStar />}>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="success" icon={<IconTick />}>Success</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button loading variant="primary">Loading…</Button>
          <Button disabled variant="ghost">Disabled</Button>
          <Button variant="primary" iconRight={<IconArrow />}>With Right Icon</Button>
        </div>
      </Section>

      {/* ── Badges ── */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" dot>Primary</Badge>
          <Badge variant="ok" dot>완료</Badge>
          <Badge variant="error" dot>오류</Badge>
          <Badge variant="warn" dot>경고</Badge>
          <Badge variant="neutral">중립</Badge>
        </div>
      </Section>

      {/* ── Avatars ── */}
      <Section title="Avatar">
        <div className="flex items-end gap-4">
          <Avatar size="xs" name="Kim Jisoo" />
          <Avatar size="sm" name="Lee Minho" online />
          <Avatar size="md" name="Park Soyeon" online={false} />
          <Avatar size="lg" name="Choi Yuna" online />
          <Avatar size="xl" name="Jo Hyunwoo" />
        </div>
      </Section>

      {/* ── Inputs ── */}
      <Section title="Input">
        <div className="grid grid-cols-1 gap-4 max-w-md">
          <Input
            label="이메일"
            placeholder="you@example.com"
            icon={<IconMail />}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Input
            label="검색"
            placeholder="강의 검색..."
            icon={<IconSearch />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            helper="강의명, 교수명으로 검색하세요"
          />
          <Input
            label="오류 상태"
            placeholder="입력하세요"
            error="이 항목은 필수입니다"
          />
        </div>
      </Section>

      {/* ── ProgressBar ── */}
      <Section title="ProgressBar">
        <div className="max-w-sm flex flex-col gap-3">
          <ProgressBar value={78} height={6} />
          <ProgressBar value={45} color="var(--ok)" height={6} />
          <ProgressBar value={20} color="var(--err)" height={6} />
          <ProgressBar value={60} color="var(--warn)" height={8} />
        </div>
      </Section>

      {/* ── StatCards ── */}
      <Section title="StatCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={<IconBook />}
            label="수강 중 강의"
            value="12"
            unit="개"
            sub={<><span style={{ color: 'var(--ok)' }}>▲ 2</span> 지난달 대비</>}
          />
          <StatCard
            icon={<IconStar />}
            label="역량 점수"
            value="87.4"
            unit="점"
            accent="--ok"
            sub={<><span style={{ color: 'var(--p)' }}>▲ 3.1</span> 이번 달</>}
          />
          <StatCard
            icon={<IconTick />}
            label="완료 과제"
            value="34"
            unit="건"
            accent="--warn"
            sub="이번 학기 누적"
          />
        </div>
      </Section>

      {/* ── Cards ── */}
      <Section title="Card (compound)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Plain card */}
          <Card hover>
            <Card.Body>
              <Card.Header
                icon={<IconBook />}
                title="학습 진도"
                action={<>더보기 <IconArrow /></>}
              />
              <div className="flex flex-col gap-3">
                {[
                  { name: 'React 심화 과정', pct: 78, color: 'var(--p)' },
                  { name: 'TypeScript 기초', pct: 55, color: 'var(--ok)' },
                  { name: 'Node.js 백엔드', pct: 30, color: 'var(--warn)' },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-[13px] text-[var(--tx)] flex-1 truncate">{c.name}</span>
                    <ProgressBar value={c.pct} color={c.color} height={4} className="flex-[2] max-w-[120px]" />
                    <span className="text-[12.5px] font-bold text-[var(--tx)] w-9 text-right">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Card with footer */}
          <Card>
            <Card.Body>
              <Card.Header icon={<IconStar />} title="최근 공지" />
              <div className="flex flex-col gap-2">
                {[
                  { text: '2025년 2학기 수강신청 안내', badge: 'ok' as const },
                  { text: 'AI 챗봇 기능 업데이트', badge: 'primary' as const },
                  { text: '도서관 이용 시간 변경', badge: 'warn' as const },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--bd)] last:border-none">
                    <span className="text-[13px] text-[var(--tx)] flex-1 mr-3 truncate">{n.text}</span>
                    <Badge variant={n.badge}>새글</Badge>
                  </div>
                ))}
              </div>
            </Card.Body>
            <Card.Footer>
              <span className="text-[12px] text-[var(--tx3)]">3개 공지</span>
              <Button size="sm" variant="ghost" iconRight={<IconArrow />}>전체 보기</Button>
            </Card.Footer>
          </Card>
        </div>
      </Section>

      {/* ── Modal ── */}
      <Section title="Modal">
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          모달 열기
        </Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="강의 등록"
          subtitle="새 강의를 추가합니다"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>취소</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>저장</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <Input label="강의명" placeholder="React 심화 과정" />
            <Input label="담당 교수" placeholder="홍길동" />
            <Input label="강의실" placeholder="공학관 301호" />
          </div>
        </Modal>
      </Section>
    </div>
  );
}
