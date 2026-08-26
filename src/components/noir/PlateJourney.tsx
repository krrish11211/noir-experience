import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-4.jpg";
import dish4 from "@/assets/dish-5.jpg";
import { SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

const COURSES = [
  {
    n: "01",
    title: "The first pour",
    meta: "Champagne · Kaolin glass",
    copy: "The evening opens quietly. Cold glass, a low pour, the room settling.",
    image: dish1,
  },
  {
    n: "02",
    title: "The first course",
    meta: "Raw · Cured · Cold",
    copy: "Three ingredients, dressed once. Nothing added that cannot be tasted.",
    image: dish2,
  },
  {
    n: "03",
    title: "The main course",
    meta: "Ember · Bone marrow · Jus",
    copy: "Fire does the work. The plate arrives warm from the pass, sauced at the table.",
    image: dish3,
  },
  {
    n: "04",
    title: "The final note",
    meta: "Dark chocolate · Salt",
    copy: "Bitter, cold, brief. The last thing you remember on the way out.",
    image: dish4,
  },
];

export function PlateJourney() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const stages = COURSES.length;
  const raw = progress * (stages - 0.001);
  const active = Math.min(stages - 1, Math.floor(raw));
  const rotation = progress * 320;
  const scale = 0.9 + Math.sin(progress * Math.PI) * 0.12;

  return (
    <section id="plate" className="bg-background relative">
      <div ref={ref} className="relative h-[400vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div
            className="glow pointer-events-none absolute inset-0"
            style={{ opacity: 0.5 + Math.sin(progress * Math.PI) * 0.5 }}
          />

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-24 md:px-12">
            <div className="flex items-start justify-between">
              <SectionIndex index="04" label="The Plate" />
              <span className="font-display text-champagne text-sm">
                {COURSES[active]?.n} / 0{stages}
              </span>
            </div>

            {/* rotating anchor plate */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="plate-shadow relative aspect-square w-[78vw] max-w-[560px] rounded-full will-change-transform md:w-[38vw]"
                style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
              >
                {COURSES.map((c, i) => (
                  <img
                    key={c.n}
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="absolute inset-0 h-full w-full rounded-full object-cover"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transition: "opacity .9s var(--ease-noir)",
                    }}
                  />
                ))}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "inset 0 0 120px 24px oklch(0.185 0.008 60 / 0.7)" }}
                />
              </div>
            </div>

            <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-sm">
                {COURSES.map((c, i) => (
                  <div
                    key={c.n}
                    className={i === active ? "block" : "hidden"}
                    style={{ animation: "none" }}
                  >
                    <h3 className="display text-ivory text-[clamp(2rem,5vw,4rem)]">{c.title}</h3>
                    <p className="body-copy mt-4">{c.copy}</p>
                    <span className="text-champagne mt-5 block text-[0.625rem] tracking-[0.26em] uppercase">
                      {c.meta}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 md:flex-col md:items-end">
                {COURSES.map((c, i) => (
                  <div key={c.n} className="flex items-center gap-3">
                    <span
                      className="text-[0.625rem] tracking-[0.26em] uppercase transition-colors duration-500"
                      style={{ color: i === active ? "var(--ivory)" : "var(--muted-foreground)" }}
                    >
                      {c.n}
                    </span>
                    <span
                      className="block h-px transition-all duration-700"
                      style={{
                        width: i === active ? 56 : 22,
                        background: i === active ? "var(--champagne)" : "var(--border)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
