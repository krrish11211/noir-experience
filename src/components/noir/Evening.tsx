import lunch from "@/assets/lunch.jpg";
import aperitivo from "@/assets/aperitivo.jpg";
import diningRoom from "@/assets/dining-room.jpg";
import midnight from "@/assets/midnight.jpg";
import tableDetail from "@/assets/table-detail.jpg";
import { SectionIndex } from "./primitives";
import { CinemaBackdrop } from "./CinemaBackdrop";
import { useIsMobile, useReducedMotion, useScrollProgress } from "@/hooks/use-noir";

const PHASES = [
  {
    label: "Arrival",
    time: "17:00",
    note: "The room softens as the light leaves it.",
    scene: { image: lunch, alt: "Late afternoon light across linen tables" },
  },
  {
    label: "Aperitivo",
    time: "18:30",
    note: "Cold glass, low light, the first bitter sip.",
    scene: { image: aperitivo, alt: "Amber cocktail in a crystal coupe" },
  },
  {
    label: "Dinner",
    time: "20:00",
    note: "One course at a time, never in a hurry.",
    scene: { image: diningRoom, alt: "Candlelit dining room mid service" },
  },
  {
    label: "Midnight",
    time: "00:00",
    note: "Stay for another pour.",
    scene: { image: midnight, alt: "A single candle burning low" },
  },
];

const SCENES = PHASES.map((p) => p.scene);

/** Warm ivory → amber → bronze → espresso → midnight charcoal. */
function eveningTint(progress: number) {
  const l = 0.34 - progress * 0.2;
  const c = 0.055 - progress * 0.045;
  const h = 82 - progress * 34;
  return `linear-gradient(180deg, oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)} / 0.5) 0%, oklch(0.14 0.006 60 / 0.75) 100%)`;
}

export function Evening() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const radius = mobile ? 108 : 224;
  const turn = reduced ? 0 : progress * 360;
  const active = Math.min(PHASES.length - 1, Math.floor(progress * (PHASES.length - 0.001)));
  const phase = PHASES[active]!;

  return (
    <section id="evening" className="bg-background relative">
      <div ref={ref} className="relative h-[380vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <CinemaBackdrop scenes={SCENES} progress={progress} dim={0.66} drift={0.16} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: eveningTint(progress) }}
          />

          <div className="relative mx-auto w-full max-w-[1600px] px-6 pt-28 md:px-12">
            <div className="flex items-start justify-between gap-6">
              <SectionIndex index="04" label="The Evening" />
              <span className="font-display text-champagne text-lg">{phase.time}</span>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <div className="relative" style={{ width: radius * 2 + 48, height: radius * 2 + 48 }}>
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid var(--border)" }}
              />
              <div
                className="absolute inset-[14%] rounded-full"
                style={{ border: "1px solid oklch(0.775 0.052 88 / 0.1)" }}
              />

              <div
                className="plate-shadow absolute top-1/2 left-1/2 aspect-square w-[36%] overflow-hidden rounded-full will-change-transform"
                style={{ transform: `translate(-50%, -50%) rotate(${-turn * 0.6}deg)` }}
              >
                <img
                  src={tableDetail}
                  alt="Table setting at the centre of the evening"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "inset 0 0 60px 18px oklch(0.185 0.008 60 / 0.7)" }}
                />
              </div>

              {PHASES.map((p, i) => {
                const angle = ((i / PHASES.length) * 360 + turn - 90) * (Math.PI / 180);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = i === active;
                return (
                  <div
                    key={p.label}
                    className="absolute top-1/2 left-1/2 text-center will-change-transform"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isActive ? 1 : 0.7})`,
                      opacity: isActive ? 1 : 0.32,
                      transition: "opacity .8s var(--ease-noir)",
                    }}
                  >
                    <span
                      className="display block text-[clamp(1.1rem,2.6vw,2.2rem)] whitespace-nowrap"
                      style={{ color: isActive ? "var(--ivory)" : "var(--muted-foreground)" }}
                    >
                      {p.label}
                    </span>
                    <span className="text-champagne text-[0.5625rem] tracking-[0.28em]">
                      {p.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-12">
            <div className="hairline mb-6" />
            <p className="display text-ivory max-w-2xl text-[clamp(1.3rem,3.2vw,2.6rem)]">
              {phase.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
