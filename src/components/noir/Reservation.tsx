import diningRoom from "@/assets/dining-room.jpg";
import { FadeIn, MagneticButton, RevealLines, SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

export function Reservation() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="reserve" className="bg-background relative">
      <div ref={ref} className="relative h-[170vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <img
            src={diningRoom}
            alt="NOIR dining room at night"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ transform: `scale(${1.08 + progress * 0.1})`, opacity: 0.42 }}
          />
          <div className="glow absolute inset-0" />

          <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12">
            <SectionIndex index="15" label="Reservation" />
            <RevealLines
              lines={["Your table", "awaits."]}
              className="text-ivory mt-8 text-[clamp(2.8rem,10vw,9rem)]"
            />
            <FadeIn delay={0.1} className="mt-8 max-w-sm">
              <p className="body-copy">An evening at NOIR begins with a reservation.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="mt-12 flex flex-wrap gap-4">
              <MagneticButton>Reserve a table</MagneticButton>
              <MagneticButton variant="ghost">Contact the restaurant</MagneticButton>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
