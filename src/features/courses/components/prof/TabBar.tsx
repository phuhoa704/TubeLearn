interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  extraCoursesCount: number;
}

export const TabBar = ({
  activeTab,
  setActiveTab,
  extraCoursesCount,
}: Props) => {
  return (
    <div className="flex border-b border-border-main mb-5 shrink-0 gap-1">
      <button
        className={`text-sm font-bold pb-2.5 px-4 -mb-px transition-all border-b-2 ${
          activeTab === "assigned"
            ? "border-primary text-primary"
            : "border-transparent text-text-muted hover:text-primary"
        }`}
        onClick={() => setActiveTab("assigned")}
      >
        담당 강의
      </button>
      <button
        className={`text-sm font-bold pb-2.5 px-4 -mb-px transition-all border-b-2 flex items-center gap-1.5 ${
          activeTab === "extra"
            ? "border-primary text-primary"
            : "border-transparent text-text-muted hover:text-primary"
        }`}
        onClick={() => setActiveTab("extra")}
      >
        비교과 강의
        <span className="text-[11px] font-bold bg-primary-light text-primary py-px px-2 rounded-full">
          {extraCoursesCount}
        </span>
      </button>
    </div>
  );
};
