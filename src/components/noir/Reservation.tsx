import diningRoom from "@/assets/dining-room.jpg";
import midnight from "@/assets/midnight.jpg";
import { FadeIn, MagneticButton, RevealLines, SectionIndex } from "./primitives";
import { CinemaBackdrop } from "./CinemaBackdrop";
import { useScrollProgress, useScrollTo } from "@/hooks/use-noir";

const SCENES = [
  { image: diningRoom, alt: "NOIR dining room late at night" },
  { image: midnight, alt: "Candlelight on the last table of the evening" },
];

export function Reservation() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const scrollTo = useScrollTo();

  return (
    <section id="reserve" className="bg-background relative">
      <div ref={ref} className="relative h-[200vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <CinemaBackdrop scenes={SCENES} progress={progress} dim={0.72} drift={0.12} />

          <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12">
            <SectionIndex index="08" label="Reservation" />
            <RevealLines
              lines={["Your table", "awaits."]}
              className="text-ivory mt-8 text-[clamp(2.8rem,10vw,9rem)]"
            />
            <FadeIn delay={0.1} className="mt-8 max-w-sm">
              <p className="body-copy">
                An evening at NOIR begins with a reservation. Dinner Tuesday to Saturday, from
                18:00.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="mt-12 flex flex-wrap gap-4">
              <MagneticButton>Reserve a table</MagneticButton>
              <MagneticButton variant="ghost" onClick={() => scrollTo("house")}>
                Private dining
              </MagneticButton>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
