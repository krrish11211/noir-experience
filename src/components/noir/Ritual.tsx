import exterior from "@/assets/exterior.jpg";
import aperitivoImg from "@/assets/aperitivo.jpg";
import diningRoom from "@/assets/dining-room.jpg";
import tableDetail from "@/assets/table-detail.jpg";
import { RevealLines, SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

const STEPS = [
  {
    n: "01",
    title: "The arrival",
    copy: "An unmarked door, a short corridor, and then the room.",
    image: exterior,
  },
  {
    n: "02",
    title: "The aperitivo",
    copy: "Something cold and bitter while the kitchen finds its rhythm.",
    image: aperitivoImg,
  },
  {
    n: "03",
    title: "The dinner",
    copy: "Courses arrive when they are ready, never when they are due.",
    image: diningRoom,
  },
  {
    n: "04",
    title: "The last pour",
    copy: "Candles low, the room quieter, no one asking you to leave.",
    image: tableDetail,
  },
];

export function Ritual() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const active = Math.min(STEPS.length - 1, Math.floor(progress * (STEPS.length - 0.001)));

  return (
    <section id="ritual" className="bg-background relative">
      <div className="mx-auto max-w-[1600px] px-6 pt-[14vh] md:px-12">
        <SectionIndex index="05" label="The Ritual of Dining" />
        <RevealLines
          lines={["Every detail", "has its moment."]}
          className="text-ivory mt-10 text-[clamp(2.2rem,6vw,5.5rem)]"
        />
      </div>

      <div ref={ref} className="relative mt-[10vh] h-[380vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            {STEPS.map((s, i) => (
              <img
                key={s.n}
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: `scale(${i === active ? 1.02 : 1.1})`,
                  transition: "opacity 1.1s var(--ease-noir), transform 1.6s var(--ease-noir)",
                }}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(105deg, oklch(0.185 0.008 60 / ${0.9 - active * 0.06}) 0%, oklch(0.185 0.008 60 / 0.35) 100%)`,
              }}
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1600px] items-center px-6 md:px-12">
            <div className="w-full max-w-2xl">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className="transition-all duration-[900ms]"
                  style={{
                    display: i === active ? "block" : "none",
                  }}
                >
                  <span className="font-display text-champagne block text-sm">{s.n}</span>
                  <h3 className="display text-ivory mt-6 text-[clamp(2.4rem,7vw,6rem)]">
                    {s.title}
                  </h3>
                  <p className="body-copy text-ivory/70 mt-6 max-w-md">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 left-6 flex gap-2 md:left-12">
            {STEPS.map((s, i) => (
              <span
                key={s.n}
                className="block h-px transition-all duration-700"
                style={{
                  width: i === active ? 64 : 24,
                  background: i === active ? "var(--champagne)" : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
