import diningRoom from "@/assets/dining-room.jpg";
import bar from "@/assets/bar.jpg";
import privateDining from "@/assets/private-dining.jpg";
import tableDetail from "@/assets/table-detail.jpg";
import exterior from "@/assets/exterior.jpg";
import architecture from "@/assets/architecture.jpg";
import { FadeIn, MagneticButton, RevealLines, SectionIndex } from "./primitives";
import { useReveal, useScrollProgress, useScrollTo } from "@/hooks/use-noir";

const OFFERS = ["Private dinners", "Celebrations", "Corporate evenings", "Chef's table"];

function MaskedImage({
  src,
  alt,
  caption,
  className,
  shift = 0,
  progress,
  delay = 0,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  shift?: number;
  progress: number;
  delay?: number;
}) {
  const { ref, inView } = useReveal<HTMLElement>(0.15);
  return (
    <figure ref={ref} className={className}>
      <div
        className="relative overflow-hidden"
        style={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          transition: `clip-path 1.3s var(--ease-noir) ${delay}s`,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover will-change-transform"
          style={{ transform: `translateY(${(0.5 - progress) * shift}px) scale(1.1)` }}
        />
        <div className="bg-background/15 absolute inset-0" />
      </div>
      <figcaption className="eyebrow mt-4">{caption}</figcaption>
    </figure>
  );
}

/** Interior, architecture, atmosphere and private dining — one overlapping composition. */
export function House() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const scrollTo = useScrollTo();

  return (
    <section id="house" className="bg-background relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 pt-[14vh] md:px-12">
        <SectionIndex index="07" label="The House" />
        <RevealLines
          lines={["Twelve tables.", "One room."]}
          className="text-ivory mt-8 text-[clamp(2.4rem,7vw,6rem)]"
        />
        <FadeIn delay={0.12} className="mt-8 max-w-md md:ml-auto">
          <p className="body-copy">
            Stone, linen and low light — the room is designed to disappear around the table.
          </p>
        </FadeIn>
      </div>

      <div ref={ref} className="mx-auto max-w-[1600px] px-6 pb-[10vh] md:px-12">
        {/* Overlapping architectural choreography */}
        <div className="relative mt-[10vh]">
          <MaskedImage
            src={diningRoom}
            alt="The dining room at night"
            caption="Dining room"
            progress={progress}
            shift={70}
            className="[&>div]:h-[52vh] md:[&>div]:h-[82vh] md:w-[78%]"
          />
          <MaskedImage
            src={tableDetail}
            alt="Linen, silver and cold glass"
            caption="Table detail"
            delay={0.12}
            progress={progress}
            shift={-120}
            className="relative z-10 mt-6 [&>div]:h-[34vh] md:absolute md:top-[46%] md:right-0 md:mt-0 md:w-[34%] md:[&>div]:h-[46vh]"
          />
        </div>

        <div className="relative mt-[10vh] flex flex-col gap-6 md:mt-[16vh] md:flex-row md:items-start">
          <MaskedImage
            src={architecture}
            alt="Warm light on a curved travertine wall"
            caption="Architecture"
            delay={0.06}
            progress={progress}
            shift={90}
            className="md:w-[30%] [&>div]:h-[46vh] md:[&>div]:h-[70vh]"
          />
          <MaskedImage
            src={bar}
            alt="The bar"
            caption="The bar"
            delay={0.14}
            progress={progress}
            shift={-70}
            className="md:mt-[14vh] md:w-[40%] [&>div]:h-[40vh] md:[&>div]:h-[52vh]"
          />
          <MaskedImage
            src={exterior}
            alt="The unmarked exterior at night"
            caption="Exterior"
            delay={0.2}
            progress={progress}
            shift={50}
            className="md:mt-[4vh] md:w-[30%] [&>div]:h-[36vh] md:[&>div]:h-[44vh]"
          />
        </div>
      </div>

      {/* Private dining, folded into The House */}
      <div className="relative mt-[6vh] h-[78vh] overflow-hidden md:h-[92vh]">
        <img
          src={privateDining}
          alt="Private dining room with a candlelit table"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ transform: `scale(${1.06 + progress * 0.1})`, opacity: 0.6 }}
        />
        <div className="veil absolute inset-0" />
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 md:px-12">
          <span className="eyebrow block">Private Dining</span>
          <RevealLines
            lines={["Your table.", "Your evening."]}
            className="text-ivory mt-6 text-[clamp(2.2rem,6.4vw,5.4rem)]"
          />
          <FadeIn delay={0.1} className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {OFFERS.map((o) => (
              <span key={o} className="meta-label text-muted-foreground">
                {o}
              </span>
            ))}
          </FadeIn>
          <FadeIn delay={0.18} className="mt-10">
            <MagneticButton variant="ghost" onClick={() => scrollTo("reserve")}>
              Plan a private evening
            </MagneticButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
