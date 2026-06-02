import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  noBorder?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  noBorder = false,
  className = "",
  ...rest
}) => (
  <div
    className={[
      "bg-(--sur) rounded-(--r3) shadow-(--sh1)",
      noBorder ? "" : "border border-(--bd)",
      hover
        ? "transition-all duration-(.18s) ease-(cubic-bezier(.4,0,.2,1)) hover:shadow-(--sh2) hover:-translate-y-px cursor-pointer"
        : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

/* ─────────────────────────────────────────
   Card.Body  (padded content area)
───────────────────────────────────────── */
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

const CardBody: React.FC<CardBodyProps> = ({
  children,
  padding = "md",
  className = "",
  ...rest
}) => (
  <div
    className={[paddingMap[padding], className].filter(Boolean).join(" ")}
    {...rest}
  >
    {children}
  </div>
);

/* ─────────────────────────────────────────
   Card.Header  (section header row)
───────────────────────────────────────── */
interface CardHeaderProps {
  icon?: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  icon,
  title,
  action,
  className = "",
}) => (
  <div
    className={["flex items-center justify-between mb-3", className]
      .filter(Boolean)
      .join(" ")}
  >
    <div className="flex items-center gap-2 text-[14px] font-bold text-(--tx)">
      {icon && (
        <span className="w-(--sx) h-(--sx) rounded-(--r1) bg-(--pl) flex items-center justify-center text-(--p)">
          {icon}
        </span>
      )}
      {title}
    </div>
    {action && (
      <span className="text-[12px] font-medium text-(--p) cursor-pointer hover:underline flex items-center gap-1">
        {action}
      </span>
    )}
  </div>
);

const CardDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={["border-t border-(--bd)", className].filter(Boolean).join(" ")}
  />
);

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <div
    className={[
      "px-5 py-3 border-t border-(--bd) flex items-center justify-between",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

const CardNamespace = Object.assign(Card, {
  Body: CardBody,
  Header: CardHeader,
  Divider: CardDivider,
  Footer: CardFooter,
});

export default CardNamespace;
