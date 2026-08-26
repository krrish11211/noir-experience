import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-4.jpg";
import dish4 from "@/assets/dish-5.jpg";
import exterior from "@/assets/exterior.jpg";
import bar from "@/assets/bar.jpg";
import kitchen from "@/assets/kitchen.jpg";
import diningRoom from "@/assets/dining-room.jpg";
import { SectionIndex } from "./primitives";
import { CinemaBackdrop, SceneProgress } from "./CinemaBackdrop";
import { useReducedMotion, useScrollProgress } from "@/hooks/use-noir";

/** Four acts of the ritual — plate, backdrop and typography move together. */
const ACTS = [
  {
    n: "01",
    kicker: "Arrival",
    title: "The evening begins.",
    meta: "Unmarked door · Corridor · Room",
    copy: "A short corridor, then the room. Coats taken, the noise of the street left behind.",
    plate: dish1,
    scene: { image: exterior, alt: "The unmarked entrance at night" },
  },
  {
    n: "02",
    kicker: "Aperitivo",
    title: "The first pour.",
    meta: "Champagne · Bitter · Cold glass",
    copy: "Something cold and bitter while the kitchen finds its rhythm. Low light, low voices.",
    plate: dish2,
    scene: { image: bar, alt: "Amber cocktail being finished at the bar" },
  },
  {
    n: "03",
    kicker: "Dinner",
    title: "The table becomes the stage.",
    meta: "Ember · Bone marrow · Jus",
    copy: "Fire does the work. Plates arrive warm from the pass and are finished at the table.",
    plate: dish3,
    scene: { image: kitchen, alt: "Chef plating under warm kitchen light" },
  },
  {
    n: "04",
    kicker: "Midnight",
    title: "Stay for the last pour.",
    meta: "Dark chocolate · Salt · Silence",
    copy: "Candles low, the room quieter, no one asking you to leave.",
    plate: dish4,
    scene: { image: diningRoom, alt: "Candlelit dining room late in the evening" },
  },
];

const SCENES = ACTS.map((a) => a.scene);

export function DiningRitual() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = useReducedMotion();
  const active = Math.min(ACTS.length - 1, Math.floor(progress * (ACTS.length - 0.001)));
  const act = ACTS[active]!;
  const rotation = reduced ? 0 : progress * 300;
  const scale = reduced ? 1 : 0.94 + Math.sin(progress * Math.PI) * 0.1;

  return (
    <section id="ritual" className="bg-background relative">
      <div ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Layers 1–3: cinematic footage, light, texture */}
          <CinemaBackdrop scenes={SCENES} progress={progress} dim={0.7} drift={0.2} />

          {/* Layer 4: the plate */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="plate-shadow relative aspect-square w-[74vw] max-w-[540px] rounded-full will-change-transform md:w-[36vw]"
              style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
            >
              {ACTS.map((a, i) => (
                <img
                  key={a.n}
                  src={a.plate}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={1200}
                  className="absolute inset-0 h-full w-full rounded-full object-cover"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transition: "opacity 1s var(--ease-noir)",
                  }}
                />
              ))}
              <div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "inset 0 0 130px 26px oklch(0.185 0.008 60 / 0.72)" }}
              />
              <div
                className="absolute -inset-6 rounded-full"
                style={{ border: "1px solid oklch(0.775 0.052 88 / 0.16)" }}
              />
            </div>
          </div>

          {/* Layers 5–6: typography + progress */}
          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-24 md:px-12">
            <div className="flex items-start justify-between gap-6">
              <SectionIndex index="03" label="The Dining Ritual" />
              <SceneProgress index={active} total={ACTS.length} progress={progress} />
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-md">
                <span className="eyebrow block">{act.kicker}</span>
                <h3 className="display text-ivory mt-5 text-[clamp(2.1rem,5.4vw,4.4rem)]">
                  {act.title}
                </h3>
                <p className="body-copy text-ivory/70 mt-5">{act.copy}</p>
                <span className="meta-label text-champagne mt-6 block">{act.meta}</span>
              </div>

              <ol className="flex items-center gap-3 md:flex-col md:items-end">
                {ACTS.map((a, i) => (
                  <li key={a.n} className="flex items-center gap-3">
                    <span
                      className="meta-label transition-colors duration-500"
                      style={{ color: i === active ? "var(--ivory)" : "var(--muted-foreground)" }}
                    >
                      {a.kicker}
                    </span>
                    <span
                      className="block h-px transition-all duration-700"
                      style={{
                        width: i === active ? 56 : 20,
                        background: i === active ? "var(--champagne)" : "var(--border)",
                      }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
