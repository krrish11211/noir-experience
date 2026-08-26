import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import { SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

const DISHES = [
  {
    n: "01",
    name: "Charred scallop",
    category: "Raw & Cold",
    copy: "Hand-dived scallop, burnt butter emulsion, a single blistened crown.",
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

export function Signature() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const active = Math.min(DISHES.length - 1, Math.floor(progress * (DISHES.length - 0.001)));
  const local = progress * DISHES.length - active;

  return (
    <section id="signature" className="bg-background relative">
      <div ref={ref} className="relative h-[520vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col px-6 pt-28 pb-16 md:px-12">
            <div className="flex items-start justify-between">
              <SectionIndex index="11" label="Signature Plates" />
              <span className="font-display text-champagne text-sm">
                {DISHES[active]?.n} / 0{DISHES.length}
              </span>
            </div>

            <div className="mt-10 grid flex-1 items-center gap-10 md:grid-cols-[1.1fr_1fr]">
              <div
                className="relative h-[42vh] overflow-hidden md:h-[62vh]"
                data-cursor="drag"
              >
                {DISHES.map((d, i) => (
                  <img
                    key={d.n}
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    style={{
                      clipPath:
                        i === active
                          ? "inset(0% 0% 0% 0%)"
                          : i < active
                            ? "inset(0% 0% 100% 0%)"
                            : "inset(100% 0% 0% 0%)",
                      transform: `scale(${i === active ? 1.02 + local * 0.06 : 1.1})`,
                      transition:
                        "clip-path 1.1s var(--ease-noir), transform 1.4s var(--ease-noir)",
                    }}
                  />
                ))}
              </div>

              <div className="relative">
                {DISHES.map((d, i) => (
                  <div
                    key={d.n}
                    className="will-change-transform"
                    style={{
                      display: i === active ? "block" : "none",
                    }}
                  >
                    <span className="eyebrow">{d.category}</span>
                    <h3 className="display text-ivory mt-6 text-[clamp(2.2rem,6vw,5rem)]">
                      {d.name}
                    </h3>
                    <p className="body-copy mt-6 max-w-sm">{d.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              {DISHES.map((d, i) => (
                <span
                  key={d.n}
                  className="block h-px flex-1 transition-colors duration-700"
                  style={{
                    background: i <= active ? "var(--champagne)" : "var(--border)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
