import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import { SectionIndex } from "./primitives";
import { useReducedMotion, useScrollProgress } from "@/hooks/use-noir";

const DISHES = [
  {
    n: "01",
    name: "Charred scallop",
    category: "Raw & Cold",
    copy: "Hand-dived scallop, burnt butter emulsion, a single blistered crown.",
    image: dish1,
  },
  {
    n: "02",
    name: "Black garlic ravioli",
    category: "Pasta",
    copy: "Squid-ink dough, aged garlic, brown butter and toasted crumb.",
    image: dish2,
  },
  {
    n: "03",
    name: "Truffle risotto",
    category: "Grain",
    copy: "Carnaroli finished with cold butter, shaved black truffle at the table.",
    image: dish3,
  },
  {
    n: "04",
    name: "Embered wagyu",
    category: "Fire",
    copy: "Cooked over vine embers, rested in its own jus, sliced thin.",
    image: dish4,
  },
  {
    n: "05",
    name: "Dark chocolate",
    category: "Dessert",
    copy: "72% ganache, olive oil crumb, a line of sour cherry.",
    image: dish5,
  },
];

/** Full-bleed editorial campaign: one dish at a time, revealed through masks. */
export function SignatureMenu() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = useReducedMotion();
  const active = Math.min(DISHES.length - 1, Math.floor(progress * (DISHES.length - 0.001)));
  const local = progress * DISHES.length - active;
  const dish = DISHES[active]!;

  return (
    <section id="menu" className="bg-background relative">
      <div ref={ref} className="relative h-[500vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Full-bleed food photography, mask revealed */}
          <div className="absolute inset-0">
            {DISHES.map((d, i) => (
              <img
                key={d.n}
                src={d.image}
                alt={d.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
                style={{
                  clipPath:
                    i === active
                      ? "inset(0% 0% 0% 0%)"
                      : i < active
                        ? "inset(0% 0% 100% 0%)"
                        : "inset(100% 0% 0% 0%)",
                  transform: reduced
                    ? undefined
                    : `scale(${i === active ? 1.04 + local * 0.08 : 1.14}) translate3d(${i === active ? (local - 0.5) * -30 : 0}px, 0, 0)`,
                  transition: "clip-path 1.1s var(--ease-noir), transform 1.4s var(--ease-noir)",
                }}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, oklch(0.185 0.008 60 / 0.9) 0%, oklch(0.185 0.008 60 / 0.3) 62%, oklch(0.14 0.006 60 / 0.7) 100%)",
              }}
            />
            <div className="grain absolute inset-0" />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-24 md:px-12">
            <div className="flex items-start justify-between gap-6">
              <SectionIndex index="06" label="Signature Menu" />
              <span className="font-display text-champagne text-lg">
                {dish.n} / 0{DISHES.length}
              </span>
            </div>

            <div className="max-w-xl">
              <span className="eyebrow block">{dish.category}</span>
              <h3
                className="display text-ivory mt-6 text-[clamp(2.4rem,7.4vw,6.4rem)] will-change-transform"
                style={{ transform: reduced ? undefined : `translateY(${(0.5 - local) * 26}px)` }}
              >
                {dish.name}
              </h3>
              <p className="body-copy text-ivory/75 mt-6 max-w-md">{dish.copy}</p>
            </div>

            <div className="flex gap-2">
              {DISHES.map((d, i) => (
                <span
                  key={d.n}
                  className="block h-px flex-1 transition-colors duration-700"
                  style={{ background: i <= active ? "var(--champagne)" : "var(--border)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
