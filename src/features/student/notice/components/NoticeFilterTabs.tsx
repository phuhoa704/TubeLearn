import React from "react";
import { cn } from "../../../../lib/utils";
import { NOTICE_FILTER_TABS } from "../../../../mocks/notice";
import type { NoticeFilter } from "../../../../types/notice";
import { Button } from "../../../../components/ui";

interface NoticeFilterTabsProps {
  active: NoticeFilter;
  onChange: (f: NoticeFilter) => void;
}

export const NoticeFilterTabs: React.FC<NoticeFilterTabsProps> = ({
  active,
  onChange,
}) => (
  <div className="flex gap-2 flex-wrap mb-5">
    {NOTICE_FILTER_TABS.map(({ key, label }) => (
      <Button
        key={key}
        onClick={() => onChange(key)}
        // className={cn(
        //   "px-4.5 py-2 rounded-full border text-[13px] font-semibold cursor-pointer transition-all duration-150",
        //   active === key
        //     ? "bg-primary border-primary text-white"
        //     : "bg-surface-main border-border-main text-text-sub hover:border-border-alt hover:bg-surface-alt",
        // )}
        size="sm"
        variant={active === key ? "primary" : "outline"}
        className={cn(
          "rounded-full text-sm! font-semibold cursor-pointer transition-all duration-150 py-2 px-4.5",
          active === key
            ? ""
            : "text-text-sub border-border-main bg-surface-main! hover:bg-surface-alt!",
        )}
      >
        {label}
      </Button>
    ))}
  </div>
);
