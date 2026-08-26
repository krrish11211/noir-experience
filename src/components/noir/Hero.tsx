import { useEffect, useRef } from "react";
import heroPlate from "@/assets/hero-plate.jpg";
import diningRoom from "@/assets/dining-room.jpg";
import { MagneticButton } from "./primitives";
import { useReducedMotion, useScrollTo } from "@/hooks/use-noir";

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement | null>(null);
  const plate = useRef<HTMLDivElement | null>(null);
  const bg = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const scrollTo = useScrollTo();

  /* intro timeline */
  useEffect(() => {
    if (!ready || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    import("gsap").then(({ gsap }) => {
      if (cancelled || !root.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (reduced) {
          tl.to("[data-hero-el]", { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 });
          tl.set(".hero-bg", { opacity: 1 }, 0);
          tl.set(".hero-plate", { opacity: 1, scale: 1 }, 0);
          return;
        }
        tl.to(".hero-bg", { opacity: 1, duration: 1.4 }, 0)
          .to(".hero-plate", { opacity: 1, scale: 1, duration: 1.5 }, 0.25)
          .to("[data-hero-el='label']", { opacity: 1, y: 0, duration: 0.9 }, 0.6)
          .to(
            "[data-hero-el='line']",
            { opacity: 1, y: 0, duration: 1.1, stagger: 0.11 },
            0.85,
          )
          .to("[data-hero-el='support']", { opacity: 1, y: 0, duration: 1 }, 1.35)
          .to("[data-hero-el='cta']", { opacity: 1, y: 0, duration: 1 }, 1.6);
      }, root.current);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reduced]);

  /* continuous plate rotation + mouse tilt + scroll link */
  useEffect(() => {
    if (reduced) return;
    const el = plate.current;
    const bgEl = bg.current;
    if (!el) return;

    let raf = 0;
    let spin = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let scroll = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const onMove = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };

    const loop = () => {
      spin += 0.055;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      const rotX = -my * 7 - scroll * 12;
      const rotY = mx * 9;
      const scale = 1 - scroll * 0.18;
      const ty = scroll * 140;
      const tx = scroll * 90;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotate(${spin}deg) scale(${scale})`;
      el.style.opacity = String(Math.max(0, 1 - scroll * 0.85));
      if (bgEl) {
        bgEl.style.transform = `scale(${1.04 + scroll * 0.12}) translateY(${scroll * -40}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    if (!coarse) window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={root}
      className="grain relative min-h-[100svh] overflow-hidden"
      aria-label="NOIR — an evening worth remembering"
    >
      <div ref={bg} className="hero-bg absolute inset-0 opacity-0 will-change-transform">
        <img
          src={diningRoom}
          alt="Candlelit dining room at NOIR"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
        <div className="bg-background/70 absolute inset-0" />
        <div className="veil absolute inset-x-0 bottom-0 h-2/3" />
      </div>

      <div className="glow pointer-events-none absolute inset-0" />

      {/* plate object */}
      <div
        ref={plate}
        className="hero-plate plate-shadow pointer-events-none absolute top-[30%] left-1/2 aspect-square w-[64vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 will-change-transform md:top-1/2 md:left-[68%] md:w-[42vw]"
        style={{ transform: "scale(0.92)" }}
      >
        <img
          src={heroPlate}
          alt="Signature plated dish on dark stone"
          width={1280}
          height={1280}
          className="h-full w-full rounded-full object-cover"
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "inset 0 0 120px 30px oklch(0.185 0.008 60 / 0.6)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-6 pt-32 pb-20 md:px-12 md:pb-24">
        <div className="max-w-[42rem]">
          <span data-hero-el="label" className="eyebrow block translate-y-4 opacity-0">
            Contemporary Fine Dining
          </span>

          <h1 className="display text-ivory mt-8 text-[clamp(2.9rem,8.4vw,7.5rem)]">
            {["An evening", "worth", "remembering."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-hero-el="line" className="block translate-y-full opacity-0">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-el="support"
            className="body-copy mt-8 max-w-md translate-y-4 text-base opacity-0 md:text-lg"
          >
            Where precise cuisine meets atmosphere, ritual and quiet indulgence.
          </p>

          <div data-hero-el="cta" className="mt-12 flex flex-wrap gap-4 translate-y-4 opacity-0">
            <MagneticButton onClick={() => scrollTo("reserve")}>Reserve a table</MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollTo("philosophy")}>
              Explore NOIR
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[0.5625rem] tracking-[0.32em] uppercase md:block">
        Scroll
      </div>
    </section>
  );
}
