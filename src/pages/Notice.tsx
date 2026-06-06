import { Button } from "../components/ui";
import { useNotice } from "../features/notice/hooks/useNotice";
import {
  NoticeFilterTabs,
  NoticeCard,
  NoticeDetailModal,
  NoticeWriteModal,
} from "../features/notice/components";

export default function Notice() {
  const {
    filter,
    changeFilter,
    visible,
    hasMore,
    remaining,
    loadMore,
    detailNotice,
    detailIdx,
    openDetail,
    closeDetail,
    navDetail,
    writeOpen,
    editingNotice,
    openWrite,
    openEdit,
    closeWrite,
    submitNotice,
    deleteNotice,
  } = useNotice();

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
        <div>
          <h1 className="text-[22px] font-extrabold tracking-tight text-text-main mb-1">
            공지사항
          </h1>
          <p className="text-[13px] text-text-sub">
            강의별 공지사항을 한눈에 확인하세요
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={openWrite}
          className="font-bold shrink-0"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l2 2-8.5 8.5L3 13l.5-2.5L12 2z" />
            <path d="M10.5 3.5l2 2" />
          </svg>
          글쓰기
        </Button>
      </div>

      <NoticeFilterTabs active={filter} onChange={changeFilter} />

      {visible.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <div className="text-[36px] mb-3">📭</div>
          <div className="text-[15px] font-bold text-text-main mb-1">
            공지사항이 없어요
          </div>
          <div className="text-[13px]">다른 필터를 선택해보세요</div>
        </div>
      ) : (
        <>
          {visible.map((n, idx) => (
            <NoticeCard key={n.id} notice={n} onClick={() => openDetail(idx)} />
          ))}

          {hasMore && (
            <div className="text-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={loadMore}
                className="font-bold shrink-0"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v10M3 8l5 5 5-5" />
                </svg>
                더보기
                <span className="text-text-muted text-[11px] font-extrabold ml-1">
                  {remaining}개 더보기
                </span>
              </Button>
            </div>
          )}
        </>
      )}

      <NoticeDetailModal
        open={detailNotice !== null}
        notice={detailNotice}
        onClose={closeDetail}
        onPrev={() => navDetail(-1)}
        onNext={() => navDetail(1)}
        hasPrev={(detailIdx ?? 0) > 0}
        hasNext={(detailIdx ?? 0) < visible.length - 1}
        onEdit={openEdit}
        onDelete={deleteNotice}
      />

      <NoticeWriteModal
        open={writeOpen}
        onClose={closeWrite}
        onSubmit={submitNotice}
        editingNotice={editingNotice}
      />
    </div>
  );
}
