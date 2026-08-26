import architecture from "@/assets/architecture.jpg";
import tableDetail from "@/assets/table-detail.jpg";
import midnight from "@/assets/midnight.jpg";
import { RevealLines, SectionIndex, FadeIn } from "./primitives";
import { CinemaBackdrop } from "./CinemaBackdrop";
import { useScrollProgress } from "@/hooks/use-noir";

const SCENES = [
  { image: architecture, alt: "Light grazing a curved travertine wall" },
  { image: tableDetail, alt: "Linen, silver and cold glass on dark stone" },
  { image: midnight, alt: "A single candle flame in smoked glass" },
];

export function Philosophy() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="philosophy" className="bg-background relative">
      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <CinemaBackdrop scenes={SCENES} progress={progress} dim={0.68} drift={0.18} />

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-28 md:px-12">
            <SectionIndex index="02" label="The NOIR Philosophy" />

            <div className="max-w-[46rem]">
              <RevealLines
                lines={["Dining is not", "simply served."]}
                className="text-ivory text-[clamp(2.6rem,7.4vw,6.6rem)]"
              />
              <h2
                className="display text-champagne mt-2 text-[clamp(2.6rem,7.4vw,6.6rem)]"
                style={{
                  opacity: Math.min(1, Math.max(0, (progress - 0.22) / 0.22)),
                  transform: `translateY(${Math.max(0, 40 - progress * 140)}px)`,
                }}
              >
                <span className="display-accent">It unfolds.</span>
              </h2>
            </div>

            <FadeIn delay={0.1} className="max-w-md md:ml-auto">
              <p className="body-copy">
                Twelve tables. One room. A menu written each morning and finished at your table.
                NOIR is built around the pace of an evening rather than the speed of a service.
              </p>
              <div className="hairline mt-8" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
