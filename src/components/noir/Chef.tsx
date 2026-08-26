import chef from "@/assets/chef.jpg";
import kitchen from "@/assets/kitchen.jpg";
import { FadeIn, RevealLines, SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

export function Chef() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="chef" className="bg-background relative">
      <div ref={ref} className="relative">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-[14vh] md:grid-cols-2 md:px-12">
          <div className="md:sticky md:top-[18vh] md:h-fit">
            <SectionIndex index="12" label="Chef" />
            <RevealLines
              lines={["Precision", "without excess."]}
              className="text-ivory mt-8 text-[clamp(2.2rem,5.4vw,4.6rem)]"
            />
            <FadeIn delay={0.1} className="mt-8 max-w-sm">
              <p className="body-copy">
                Chef Adrian Vale approaches every plate as a study in balance — restrained
                ingredients, precise technique and flavors that unfold slowly.
              </p>
              <div className="hairline my-8" />
              <p className="text-ivory text-[0.6875rem] tracking-[0.28em] uppercase">
                Chef Adrian Vale
              </p>
              <p className="text-champagne mt-2 text-[0.625rem] tracking-[0.26em] uppercase">
                Executive Chef
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-6">
            <div className="h-[70vh] overflow-hidden">
              <img
                src={chef}
                alt="Portrait of Chef Adrian Vale"
                loading="lazy"
                width={1088}
                height={1360}
                className="h-full w-full object-cover will-change-transform"
                style={{ transform: `scale(${1.08 - progress * 0.06})` }}
              />
            </div>
            <div className="h-[38vh] overflow-hidden md:ml-[22%]">
              <img
                src={kitchen}
                alt="Plating detail on the pass"
                loading="lazy"
                width={1600}
                height={1000}
                className="h-full w-full object-cover will-change-transform"
                style={{ transform: `translateY(${(0.5 - progress) * 60}px) scale(1.1)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
