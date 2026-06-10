import { useState, useMemo } from "react";
import { NOTICES_MOCK, NOTICE_PER_PAGE } from "../../../mocks/notice";
import type { Notice, NoticeFilter, NoticeWriteForm } from "../../../types/notice";
import { showToast } from "../../../lib/toast";

export function useNotice(defaultAuthor?: string) {
  const [notices, setNotices] = useState<Notice[]>(NOTICES_MOCK);
  const [filter, setFilter] = useState<NoticeFilter>("all");
  const [visibleCount, setVisibleCount] = useState(NOTICE_PER_PAGE);

  const [detailIdx, setDetailIdx] = useState<number | null>(null);

  const [writeOpen, setWriteOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const filtered = useMemo<Notice[]>(() => {
    if (filter === "unread") return notices.filter((n) => n.isNew);
    if (filter === "important") return notices.filter((n) => n.important);
    return notices;
  }, [notices, filter]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleCount;
  const hasMore = remaining > 0;

  const openDetail = (idx: number) => setDetailIdx(idx);
  const closeDetail = () => setDetailIdx(null);
  const navDetail = (dir: -1 | 1) => {
    if (detailIdx === null) return;
    const ni = detailIdx + dir;
    if (ni >= 0 && ni < filtered.length) setDetailIdx(ni);
  };
  const detailNotice = detailIdx !== null ? filtered[detailIdx] : null;

  const loadMore = () => setVisibleCount((c) => c + NOTICE_PER_PAGE);

  const changeFilter = (f: NoticeFilter) => {
    setFilter(f);
    setVisibleCount(NOTICE_PER_PAGE);
  };

  const openWrite = () => {
    setEditIdx(null);
    setWriteOpen(true);
  };

  const openEdit = () => {
    if (detailIdx === null) return;
    setEditIdx(detailIdx);
    closeDetail();
    setWriteOpen(true);
  };

  const closeWrite = () => setWriteOpen(false);

  const submitNotice = (form: NoticeWriteForm) => {
    const today = new Date().toISOString().split("T")[0];
    if (editIdx !== null) {
      const original = filtered[editIdx];
      setNotices((prev) =>
        prev.map((n) =>
          n.id === original.id
            ? { ...n, title: form.title, content: form.content, important: form.important, files: form.files, date: today }
            : n,
        ),
      );
      showToast("공지사항이 수정되었습니다! ✏️");
    } else {
      const newNotice: Notice = {
        id: notices.length + 1,
        course: "공지사항",
        emoji: "📋",
        title: form.title,
        author: defaultAuthor || "김학생",
        date: today,
        views: 0,
        isNew: true,
        important: form.important,
        content: form.content,
        files: form.files,
        replies: [],
      };
      setNotices((prev) => [newNotice, ...prev]);
      showToast("공지사항이 등록되었습니다! 🎉");
    }
    setVisibleCount(NOTICE_PER_PAGE);
    closeWrite();
  };

  const deleteNotice = () => {
    if (detailIdx === null || !detailNotice) return;
    if (!window.confirm(`"${detailNotice.title}"\n\n이 공지사항을 삭제하시겠습니까?`)) return;
    setNotices((prev) => prev.filter((n) => n.id !== detailNotice.id));
    closeDetail();
    showToast("공지사항이 삭제되었습니다. 🗑️");
  };

  const editingNotice = editIdx !== null ? filtered[editIdx] : null;

  return {
    filter, changeFilter,
    visible, hasMore, remaining, loadMore,
    detailNotice, detailIdx, openDetail, closeDetail, navDetail,
    writeOpen, editingNotice, openWrite, openEdit, closeWrite, submitNotice,
    deleteNotice,
  };
}
