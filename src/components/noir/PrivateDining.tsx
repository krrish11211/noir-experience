import privateDining from "@/assets/private-dining.jpg";
import { FadeIn, MagneticButton, RevealLines, SectionIndex } from "./primitives";
import { useScrollProgress, useScrollTo } from "@/hooks/use-noir";

const OFFERS = ["Private dinners", "Celebrations", "Corporate evenings", "Chef's table"];

export function PrivateDining() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const scrollTo = useScrollTo();

  return (
    <section id="private" className="relative bg-[oklch(0.155_0.007_60)]">
      <div ref={ref} className="relative h-[190vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src={privateDining}
            alt="Private dining room with candlelit table"
            loading="lazy"
            width={1600}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ transform: `scale(${1.05 + progress * 0.12})`, opacity: 0.62 }}
          />
          <div className="veil absolute inset-0" />

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-28 md:px-12">
            <SectionIndex index="14" label="Private Dining" />

            <div>
              <RevealLines
                lines={["Your table.", "Your evening."]}
                className="text-ivory text-[clamp(2.4rem,7.5vw,6.5rem)]"
              />
              <FadeIn delay={0.1} className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
                {OFFERS.map((o) => (
                  <span
                    key={o}
                    className="text-muted-foreground text-[0.6875rem] tracking-[0.24em] uppercase"
                  >
                    {o}
                  </span>
                ))}
              </FadeIn>
              <FadeIn delay={0.2} className="mt-10">
                <MagneticButton variant="ghost" onClick={() => scrollTo("reserve")}>
                  Plan a private dining experience
                </MagneticButton>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
