import { useEffect, useState } from "react";

export function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("out"), 900);
    const t2 = window.setTimeout(() => {
      setPhase("gone");
      onDone();
    }, 1550);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className="bg-background fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transition: "opacity 0.65s var(--ease-noir)",
      }}
    >
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="relative flex flex-col items-center">
        <span
          className="display text-ivory text-[clamp(2.5rem,9vw,7rem)] tracking-[0.3em]"
          style={{
            transform: phase === "in" ? "scale(1)" : "scale(1.08)",
            opacity: 1,
            animation: "noir-open 1.1s var(--ease-noir) both",
            transition: "transform 0.9s var(--ease-noir)",
          }}
        >
          NOIR
        </span>
        <span
          className="mt-6 block h-px bg-champagne/60"
          style={{ animation: "noir-line 0.9s var(--ease-noir) 0.25s both" }}
        />
        <span
          className="eyebrow mt-5"
          style={{ animation: "noir-fade 0.8s var(--ease-noir) 0.5s both" }}
        >
          Contemporary Fine Dining
        </span>
      </div>

      <style>{`
        @keyframes noir-open {
          from { opacity: 0; transform: scale(0.55); letter-spacing: 0.6em; }
          to { opacity: 1; transform: scale(1); letter-spacing: 0.3em; }
        }
        @keyframes noir-line { from { width: 0; opacity: 0 } to { width: 180px; opacity: 1 } }
        @keyframes noir-fade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
