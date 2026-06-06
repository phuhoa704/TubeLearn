import { useState, useMemo } from "react";
import { TASKS_MOCK } from "../../../mocks/todo/todo";
import type { Task, FilterKey, TodoStats } from "../../../types/todo/todo";

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getWeekEnd(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

export function useTodo() {
  const [tasks, setTasks] = useState<Task[]>(TASKS_MOCK);
  const [filter, setFilter] = useState<FilterKey>("all");

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const stats: TodoStats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const ongoing = total - done;
    const urgent = tasks.filter((t) => !t.done && t.priority === "high").length;
    return { total, urgent, ongoing, done };
  }, [tasks]);

  const filteredTasks = useMemo<Task[]>(() => {
    const today = getTodayStr();
    const weekEnd = getWeekEnd();
    let list = [...tasks];

    if (filter === "today") return list.filter((t) => t.date === today && !t.done);
    if (filter === "week") return list.filter((t) => t.date >= today && t.date <= weekEnd && !t.done);
    if (filter === "high") return list.filter((t) => t.priority === "high" && !t.done);
    if (filter === "done") return list.filter((t) => t.done);
    return list;
  }, [tasks, filter]);

  const groups = useMemo(() => ({
    urgent: filteredTasks.filter((t) => !t.done && t.priority === "high"),
    ongoing: filteredTasks.filter((t) => !t.done && t.priority !== "high"),
    done: filteredTasks.filter((t) => t.done),
  }), [filteredTasks]);

  const isEmpty = filteredTasks.length === 0;

  return { tasks, filter, setFilter, toggleTask, stats, filteredTasks, groups, isEmpty };
}
