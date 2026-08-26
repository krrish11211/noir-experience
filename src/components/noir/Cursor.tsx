import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-noir";

export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = dot.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setActive(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const value = target?.dataset['cursor'];
      setLabel(value && value !== "link" ? value : null);
    };
    const onLeave = () => setActive(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[95] hidden items-center justify-center rounded-full md:flex"
      style={{
        width: label ? 76 : 10,
        height: label ? 76 : 10,
        border: "1px solid var(--champagne)",
        background: label ? "oklch(0.185 0.008 60 / 0.55)" : "var(--champagne)",
        opacity: active ? 1 : 0,
        backdropFilter: label ? "blur(2px)" : undefined,
        transition:
          "width .45s var(--ease-noir), height .45s var(--ease-noir), background .45s var(--ease-noir), opacity .3s linear",
      }}
    >
      {label ? (
        <span className="text-champagne text-[0.5rem] tracking-[0.22em] uppercase">{label}</span>
      ) : null}
    </div>
  );
}
