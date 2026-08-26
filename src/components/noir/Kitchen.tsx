import kitchen from "@/assets/kitchen.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import tableDetail from "@/assets/table-detail.jpg";
import architecture from "@/assets/architecture.jpg";
import { SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

const STAGES = [
  { label: "Ingredient", image: architecture },
  { label: "Preparation", image: dish3 },
  { label: "Fire", image: kitchen },
  { label: "Plating", image: dish4 },
  { label: "Table", image: tableDetail },
];

export function Kitchen() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const active = Math.min(STAGES.length - 1, Math.floor(progress * (STAGES.length - 0.001)));

  return (
    <section id="kitchen" className="bg-background relative">
      <div ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            {STAGES.map((s, i) => (
              <img
                key={s.label}
                src={s.image}
                alt={s.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: i === active ? 0.85 : 0,
                  clipPath: i === active ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  transition: "opacity 1s var(--ease-noir), clip-path 1.2s var(--ease-noir)",
                }}
              />
            ))}
            <div className="bg-background/60 absolute inset-0" />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-28 md:px-12">
            <div className="flex items-start justify-between">
              <SectionIndex index="10" label="The Kitchen" />
              <span className="font-display text-champagne text-sm">
                0{active + 1} / 0{STAGES.length}
              </span>
            </div>

            <ol className="flex flex-col gap-1 md:gap-2">
              {STAGES.map((s, i) => (
                <li key={s.label} className="flex items-center gap-5">
                  <span
                    className="block h-px transition-all duration-700"
                    style={{
                      width: i === active ? 96 : 24,
                      background: i === active ? "var(--champagne)" : "var(--border)",
                    }}
                  />
                  <span
                    className="display text-[clamp(1.9rem,6vw,5rem)] transition-colors duration-700"
                    style={{
                      color: i === active ? "var(--ivory)" : "oklch(0.945 0.016 85 / 0.22)",
                    }}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>

            <p className="body-copy max-w-sm">
              Five hands, one pass. Nothing leaves the kitchen that has not been tasted twice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
