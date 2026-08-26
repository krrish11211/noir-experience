import tableDetail from "@/assets/table-detail.jpg";
import { SectionIndex } from "./primitives";
import { useIsMobile, useScrollProgress } from "@/hooks/use-noir";

const PHASES = [
  { label: "Lunch", time: "12:00", note: "The room softens." },
  { label: "Aperitivo", time: "18:00", note: "Cold glass, low light." },
  { label: "Dinner", time: "20:00", note: "One course at a time." },
  { label: "Midnight", time: "00:00", note: "Stay for another pour." },
];

export function Orbit() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const mobile = useIsMobile();
  const radius = mobile ? 118 : 230;
  const turn = progress * 360;
  const active = Math.min(PHASES.length - 1, Math.floor(progress * (PHASES.length - 0.001)));

  return (
    <section id="orbit" className="bg-background relative">
      <div ref={ref} className="relative h-[360vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="mx-auto w-full max-w-[1600px] px-6 pt-28 md:px-12">
            <SectionIndex index="06" label="The Hours" />
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <div
              className="glow absolute inset-0"
              style={{ opacity: 0.35 + progress * 0.5 }}
            />
            <div
              className="relative"
              style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}
            >
              {/* orbit ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid var(--border)" }}
              />

              {/* centre object */}
              <div
                className="plate-shadow absolute top-1/2 left-1/2 aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full will-change-transform"
                style={{ transform: `translate(-50%, -50%) rotate(${-turn * 0.6}deg)` }}
              >
                <img
                  src={tableDetail}
                  alt="Table setting detail"
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "inset 0 0 60px 18px oklch(0.185 0.008 60 / 0.7)" }}
                />
              </div>

              {/* orbiting labels */}
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
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isActive ? 1 : 0.72})`,
                      opacity: isActive ? 1 : 0.34,
                      transition: "opacity .8s var(--ease-noir)",
                    }}
                  >
                    <span
                      className="display block text-[clamp(1.1rem,2.4vw,2.1rem)] whitespace-nowrap"
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

          <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-12">
            <div className="hairline mb-6" />
            <p className="display text-ivory text-[clamp(1.3rem,3vw,2.4rem)]">
              {PHASES[active]?.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
