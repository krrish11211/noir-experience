import architecture from "@/assets/architecture.jpg";
import dish3 from "@/assets/dish-3.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dish4 from "@/assets/dish-4.jpg";
import tableDetail from "@/assets/table-detail.jpg";
import chef from "@/assets/chef.jpg";
import { FadeIn, SectionIndex } from "./primitives";
import { SceneProgress } from "./CinemaBackdrop";
import { useIsMobile, useReducedMotion, useScrollProgress } from "@/hooks/use-noir";

const STAGES = [
  {
    label: "Ingredient",
    copy: "Chosen at dawn, never more than a day old.",
    image: architecture,
  },
  { label: "Preparation", copy: "Cut once, cleanly, in silence.", image: dish3 },
  { label: "Fire", copy: "Vine embers, cast iron, a single turn.", image: kitchen },
  { label: "Plating", copy: "Nothing added that cannot be tasted.", image: dish4 },
  { label: "Table", copy: "Sauced in front of you, warm from the pass.", image: tableDetail },
];

/** Pinned horizontal sequence: ingredient → table, with the chef as its closing note. */
export function KitchenToTable() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const active = Math.min(STAGES.length - 1, Math.floor(progress * (STAGES.length - 0.001)));
  const shift = reduced ? active * (100 / STAGES.length) : progress * (100 - 100 / STAGES.length);

  return (
    <section id="kitchen" className="bg-background relative">
      <div ref={ref} className="relative h-[440vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Layer 1 — the moving filmstrip */}
          <div
            className="absolute inset-0 flex will-change-transform"
            style={{
              width: `${STAGES.length * 100}%`,
              transform: `translate3d(-${shift}%, 0, 0)`,
              transition: reduced ? "transform .5s var(--ease-noir)" : undefined,
            }}
          >
            {STAGES.map((s, i) => (
              <div key={s.label} className="relative h-full flex-1 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.label}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover will-change-transform"
                  style={{
                    transform: `scale(${i === active ? 1.1 : 1.02})`,
                    transition: "transform 1.6s var(--ease-noir)",
                  }}
                />
                <div className="bg-background/55 absolute inset-0" />
              </div>
            ))}
          </div>
          <div className="veil pointer-events-none absolute inset-x-0 bottom-0 h-2/3" />
          <div className="grain pointer-events-none absolute inset-0" />

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-24 md:px-12">
            <div className="flex items-start justify-between gap-6">
              <SectionIndex index="05" label="From Kitchen to Table" />
              <SceneProgress index={active} total={STAGES.length} progress={progress} />
            </div>

            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <ol className="flex flex-col gap-1">
                  {STAGES.map((s, i) => (
                    <li key={s.label} className="flex items-center gap-4">
                      <span
                        className="block h-px transition-all duration-700"
                        style={{
                          width: i === active ? 72 : 18,
                          background: i === active ? "var(--champagne)" : "var(--border)",
                        }}
                      />
                      <span
                        className="display text-[clamp(1.5rem,4.6vw,3.6rem)] transition-colors duration-700"
                        style={{
                          color: i === active ? "var(--ivory)" : "oklch(0.945 0.016 85 / 0.2)",
                        }}
                      >
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="body-copy text-ivory/70 mt-8 max-w-sm">{STAGES[active]!.copy}</p>
              </div>

              {/* Chef, folded into the same scene */}
              {!mobile && (
                <FadeIn delay={0.05} className="w-[16rem] shrink-0">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={chef}
                      alt="Chef Adrian Vale at the pass"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      style={{ transform: `translateY(${(0.5 - progress) * 28}px) scale(1.1)` }}
                    />
                  </div>
                  <div className="hairline my-5" />
                  <p className="body-copy text-ivory/70 text-sm">
                    “Five hands, one pass. Nothing leaves the kitchen that has not been tasted
                    twice.”
                  </p>
                  <p className="meta-label text-ivory mt-5">Chef Adrian Vale</p>
                  <p className="meta-label text-champagne mt-1">Executive Chef</p>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobile && (
        <div className="mx-auto max-w-[1600px] px-6 pb-[12vh]">
          <div className="h-72 overflow-hidden">
            <img
              src={chef}
              alt="Chef Adrian Vale at the pass"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="body-copy text-ivory/70 mt-6">
            “Five hands, one pass. Nothing leaves the kitchen that has not been tasted twice.”
          </p>
          <p className="meta-label text-ivory mt-5">Chef Adrian Vale</p>
          <p className="meta-label text-champagne mt-1">Executive Chef</p>
        </div>
      )}
    </section>
  );
}
