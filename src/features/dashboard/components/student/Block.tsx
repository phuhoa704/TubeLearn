import { cn } from "../../../../lib/utils";

export const Block = ({
  title,
  titleIcon,
  subTitle,
  badge,
  action,
  children,
  className,
  footer,
}: {
  title: string;
  titleIcon?: React.ReactNode;
  subTitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "bg-surface-main border border-border-main rounded-r3 overflow-hidden mb-4",
        className,
      )}
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-main">
        <div className="flex items-center gap-2 text-sm font-bold text-text-main">
          {titleIcon}
          {title}
          {subTitle && (
            <span className="text-xs text-text-muted font-normal ml-1">
              {subTitle}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {badge}
          {action}
        </div>
      </div>
      <div className="p-5">{children}</div>
      {footer}
    </div>
  );
};
