import architecture from "@/assets/architecture.jpg";
import { RevealLines, SectionIndex, FadeIn } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

export function Philosophy() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reveal = 30 + progress * 70;
  const scale = 1.18 - progress * 0.18;

  return (
    <section id="philosophy" className="relative bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-[16vh] md:px-12">
        <SectionIndex index="03" label="Philosophy" />
        <RevealLines
          as="h2"
          lines={["Dining is not", "a moment.", "It is a ritual."]}
          className="text-ivory mt-10 text-[clamp(2.4rem,6.6vw,6rem)]"
        />
        <FadeIn delay={0.15} className="mt-10 max-w-sm md:ml-auto">
          <p className="body-copy">
            Twelve tables. One room. A menu written each morning and finished at your table. NOIR is
            built around the pace of an evening rather than the speed of a service.
          </p>
        </FadeIn>
      </div>

      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div
            className="relative h-[78vh] w-full overflow-hidden"
            style={{
              clipPath: `inset(0 ${(100 - reveal) / 2}% round 2px)`,
              transition: "clip-path .12s linear",
            }}
          >
            <img
              src={architecture}
              alt="Warm light grazing a curved travertine wall"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover will-change-transform"
              style={{ transform: `scale(${scale})` }}
            />
            <div className="bg-background/25 absolute inset-0" />
            <div
              className="absolute inset-x-0 bottom-0 p-6 md:p-12"
              style={{ opacity: Math.max(0, (progress - 0.45) / 0.35) }}
            >
              <p className="display text-ivory max-w-xl text-[clamp(1.4rem,3vw,2.6rem)] leading-tight">
                Stone, linen and low light — the room is designed to disappear around the table.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
