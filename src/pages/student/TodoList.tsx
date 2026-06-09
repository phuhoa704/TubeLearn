import { useTodo } from "../../features/student/todo/hooks/useTodo";
import {
  TodoStatCards,
  TodoFilterTabs,
  TodoGroup,
  UrgentIcon,
  OngoingIcon,
  DoneIcon,
} from "../../features/student/todo/components";

export default function TodoList() {
  const { filter, setFilter, toggleTask, stats, groups, isEmpty } = useTodo();

  return (
    <div className="space-y-0">
      {/* Page header */}
      <header style={{ marginBottom: 22 }}>
        <h1 className="text-[22px] font-extrabold tracking-tight text-text-main flex items-center gap-2">
          할 일 <span className="text-[20px]">✅</span>
        </h1>
        <p className="text-[13px] text-text-sub mt-1">
          모든 강의의 과제와 마감일을 한눈에 확인하세요
        </p>
      </header>

      {/* 4 stat cards */}
      <TodoStatCards stats={stats} />

      {/* Filter tabs */}
      <TodoFilterTabs active={filter} onChange={setFilter} />

      {/* Task list */}
      {isEmpty ? (
        <div className="py-12 text-center text-text-muted">
          <div className="text-[36px] mb-3">🎉</div>
          <div className="text-[15px] font-bold text-text-main mb-1">
            해당 항목이 없어요
          </div>
          <div className="text-[13px]">다른 필터를 선택해보세요</div>
        </div>
      ) : (
        <div>
          <TodoGroup
            label="긴급"
            icon={<UrgentIcon />}
            variant="urgent"
            items={groups.urgent}
            onToggle={toggleTask}
          />
          <TodoGroup
            label="진행 중"
            icon={<OngoingIcon />}
            variant="ongoing"
            items={groups.ongoing}
            onToggle={toggleTask}
          />
          <TodoGroup
            label="완료"
            icon={<DoneIcon />}
            variant="done"
            items={groups.done}
            onToggle={toggleTask}
          />
        </div>
      )}
    </div>
  );
}
