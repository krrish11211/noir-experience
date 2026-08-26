import type { ReactNode } from "react";
import { useMagnetic, useReveal } from "@/hooks/use-noir";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow block", className)}>{children}</span>;
}

export function MagneticButton({
  children,
  variant = "solid",
  onClick,
  className,
}: {
  children: ReactNode;
  variant?: "solid" | "ghost";
  onClick?: () => void;
  className?: string;
}) {
  const ref = useMagnetic<HTMLButtonElement>(0.18);
  return (
    <button
      ref={ref}
      onClick={onClick}
      data-cursor="reserve"
      className={cn(
        "group inline-flex items-center gap-3 px-8 py-4 text-[0.6875rem] tracking-[0.28em] uppercase transition-colors duration-500",
        variant === "solid"
          ? "bg-champagne text-primary-foreground hover:bg-ivory"
          : "border border-border text-foreground hover:border-champagne hover:text-champagne",
        className,
      )}
    >
      <span>{children}</span>
      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
        &#8594;
      </span>
    </button>
  );
}

/** Line-by-line reveal driven by viewport entry. */
export function RevealLines({
  lines,
  className,
  as = "h2",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.25);
  const Tag = as;
  return (
    <div ref={ref}>
      <Tag className={cn("display", className)}>
        {lines.map((line, i) => (
          <span key={line + i} className="block overflow-hidden">
            <span
              className="block will-change-transform"
              style={{
                transform: inView ? "translateY(0)" : "translateY(110%)",
                opacity: inView ? 1 : 0,
                transition: `transform 1.1s var(--ease-noir) ${delay + i * 0.11}s, opacity 1.1s var(--ease-noir) ${delay + i * 0.11}s`,
              }}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 1s var(--ease-noir) ${delay}s, transform 1s var(--ease-noir) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionIndex({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-champagne text-sm">{index}</span>
      <span className="bg-border h-px w-10" />
      <Eyebrow>{label}</Eyebrow>
    </div>
  );
}
