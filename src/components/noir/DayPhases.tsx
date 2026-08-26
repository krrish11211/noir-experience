import lunch from "@/assets/lunch.jpg";
import aperitivo from "@/assets/aperitivo.jpg";
import diningRoom from "@/assets/dining-room.jpg";
import midnight from "@/assets/midnight.jpg";
import { FadeIn, RevealLines, SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

export function Lunch() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <section id="lunch" className="bg-background relative">
      <div ref={ref} className="relative h-[170vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 px-6 md:grid-cols-2 md:px-12">
            <div>
              <SectionIndex index="07" label="Lunch" />
              <RevealLines
                lines={["A quiet", "beginning."]}
                className="text-ivory mt-8 text-[clamp(2.4rem,6vw,5rem)]"
              />
              <FadeIn delay={0.1} className="mt-8 max-w-sm">
                <p className="body-copy">
                  Afternoons at NOIR are slower. The room softens. The table becomes the
                  destination.
                </p>
              </FadeIn>
            </div>
            <div className="h-[52vh] overflow-hidden md:h-[74vh]">
              <img
                src={lunch}
                alt="Sunlit dining room with linen tables"
                loading="lazy"
                width={1600}
                height={1000}
                className="h-full w-full object-cover will-change-transform"
                style={{ transform: `translateY(${(0.5 - progress) * 90}px) scale(1.12)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Aperitivo() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const bg = `linear-gradient(160deg, oklch(${0.28 + progress * 0.1} ${0.02 + progress * 0.05} ${86 - progress * 12}) 0%, oklch(0.185 0.008 60) 78%)`;

  return (
    <section id="aperitivo" className="relative">
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ background: bg }}>
          <div
            className="absolute top-1/2 left-1/2 h-[62vh] w-[42vw] max-w-[420px] min-w-[220px] overflow-hidden will-change-transform"
            style={{
              transform: `translate(-50%, -50%) translateX(${(progress - 0.5) * 62}vw) rotate(${(progress - 0.5) * 8}deg)`,
            }}
          >
            <img
              src={aperitivo}
              alt="Amber cocktail in a crystal coupe"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-28 md:px-12">
            <SectionIndex index="08" label="Aperitivo" />
            <div className="max-w-lg">
              <h2 className="display text-ivory text-[clamp(2.6rem,8vw,7rem)]">Aperitivo</h2>
              <p className="body-copy text-ivory/70 mt-6">The evening begins before dinner.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Dinner() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <section id="dinner" className="bg-background relative">
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src={diningRoom}
            alt="Candlelit tables in the NOIR dining room"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ transform: `scale(${1.06 + progress * 0.16})` }}
          />
          <div className="bg-background/55 absolute inset-0" />
          <div className="veil absolute inset-x-0 bottom-0 h-2/3" />

          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-24 md:px-12">
            <SectionIndex index="09" label="Dinner" />
            <h2
              className="display text-ivory mt-8 text-[clamp(3rem,12vw,10rem)] will-change-transform"
              style={{ transform: `translateY(${(0.5 - progress) * 70}px)` }}
            >
              Dinner
            </h2>
            <p
              className="body-copy text-ivory/75 mt-6 max-w-md will-change-transform"
              style={{ transform: `translateY(${(0.5 - progress) * 140}px)` }}
            >
              An evening composed one course at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Midnight() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <section id="midnight" className="relative bg-[oklch(0.13_0.006_60)]">
      <div ref={ref} className="relative h-[200vh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
          <img
            src={midnight}
            alt="Single candle flame in a smoked glass holder"
            loading="lazy"
            width={1600}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.55 + progress * 0.25, transform: `scale(${1.05 + progress * 0.1})` }}
          />
          <div className="relative px-6 text-center">
            <RevealLines
              lines={["The night", "is still young."]}
              className="text-ivory text-[clamp(2.4rem,7vw,6rem)]"
            />
            <p className="body-copy text-ivory/60 mt-8">Stay for another pour.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
