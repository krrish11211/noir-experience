import { useReducedMotion } from "@/hooks/use-noir";

/**
 * Layered cinematic backdrop: crossfading image sequence with slow drift,
 * atmospheric light and depth texture. Used behind every major pinned scene so
 * no section is ever a flat dark void.
 */
export function CinemaBackdrop({
  scenes,
  progress,
  dim = 0.62,
  drift = 0.14,
  className,
}: {
  scenes: { image: string; alt: string }[];
  /** 0 → 1 through the pinned scene */
  progress: number;
  /** base darkening of the footage so typography stays readable */
  dim?: number;
  /** how much the footage scales as it plays */
  drift?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const count = scenes.length;
  const pos = progress * (count - 1);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {scenes.map((s, i) => {
        const d = Math.abs(pos - i);
        const opacity = Math.max(0, 1 - d);
        const local = Math.min(1, Math.max(0, pos - i + 0.5));
        return (
          <img
            key={s.image + i}
            src={s.image}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{
              opacity,
              transform: reduced
                ? undefined
                : `scale(${1.06 + local * drift}) translate3d(0, ${(local - 0.5) * -26}px, 0)`,
              filter: `saturate(0.9) contrast(1.04) blur(${(1 - opacity) * 6}px)`,
              transition: "opacity .9s var(--ease-noir)",
            }}
          />
        );
      })}

      {/* Layer 2 — darkening + atmospheric light */}
      <div
        className="absolute inset-0"
        style={{ background: `oklch(0.185 0.008 60 / ${dim})` }}
      />
      <div
        className="glow absolute inset-0"
        style={{ opacity: 0.45 + Math.sin(progress * Math.PI) * 0.45 }}
      />
      {/* Layer 3 — depth vignette + texture */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, oklch(0.185 0.008 60 / 0) 40%, oklch(0.14 0.006 60 / 0.85) 100%)",
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}

/** Slow moving directional light — a subtle motion layer for text-only moments. */
export function LightSweep({ progress }: { progress: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{
        background:
          "linear-gradient(115deg, oklch(0.775 0.052 88 / 0) 30%, oklch(0.775 0.052 88 / 0.09) 50%, oklch(0.775 0.052 88 / 0) 70%)",
        backgroundSize: "260% 100%",
        backgroundPositionX: `${100 - progress * 130}%`,
      }}
    />
  );
}

/** Small pinned-scene progress indicator. */
export function SceneProgress({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-champagne text-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative block h-px w-24 bg-[var(--border)]">
        <span
          className="bg-champagne absolute inset-y-0 left-0 block"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </span>
      <span className="text-muted-foreground text-sm">{String(total).padStart(2, "0")}</span>
    </div>
  );
}
