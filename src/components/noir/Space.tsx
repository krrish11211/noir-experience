import diningRoom from "@/assets/dining-room.jpg";
import bar from "@/assets/bar.jpg";
import privateDining from "@/assets/private-dining.jpg";
import tableDetail from "@/assets/table-detail.jpg";
import exterior from "@/assets/exterior.jpg";
import architecture from "@/assets/architecture.jpg";
import { RevealLines, SectionIndex } from "./primitives";
import { useScrollProgress } from "@/hooks/use-noir";

export function Space() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const p = (mult: number) => `translateY(${(0.5 - progress) * mult}px)`;

  return (
    <section id="space" className="bg-background relative">
      <div className="mx-auto max-w-[1600px] px-6 pt-[14vh] md:px-12">
        <SectionIndex index="13" label="The Space" />
        <RevealLines
          lines={["Twelve tables.", "One room."]}
          className="text-ivory mt-8 text-[clamp(2.2rem,6vw,5.4rem)]"
        />
      </div>

      <div ref={ref} className="mx-auto max-w-[1600px] px-6 py-[12vh] md:px-12">
        <div className="grid gap-6 md:grid-cols-12">
          <figure className="overflow-hidden md:col-span-8">
            <img
              src={diningRoom}
              alt="The dining room"
              loading="lazy"
              width={1920}
              height={1088}
              className="h-[46vh] w-full object-cover will-change-transform md:h-[70vh]"
              style={{ transform: `${p(60)} scale(1.06)` }}
            />
            <figcaption className="eyebrow mt-4">Dining room</figcaption>
          </figure>

          <figure className="overflow-hidden md:col-span-4 md:mt-[16vh]">
            <img
              src={bar}
              alt="The bar"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-[40vh] w-full object-cover will-change-transform md:h-[52vh]"
              style={{ transform: `${p(-100)} scale(1.06)` }}
            />
            <figcaption className="eyebrow mt-4">The bar</figcaption>
          </figure>

          <figure className="overflow-hidden md:col-span-5">
            <img
              src={tableDetail}
              alt="Table detail"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-[38vh] w-full object-cover will-change-transform md:h-[56vh]"
              style={{ transform: `${p(80)} scale(1.06)` }}
            />
            <figcaption className="eyebrow mt-4">Table detail</figcaption>
          </figure>

          <figure className="overflow-hidden md:col-span-7 md:mt-[10vh]">
            <img
              src={privateDining}
              alt="Private dining room"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-[40vh] w-full object-cover will-change-transform md:h-[58vh]"
              style={{ transform: `${p(-60)} scale(1.06)` }}
            />
            <figcaption className="eyebrow mt-4">Private room</figcaption>
          </figure>

          <figure className="overflow-hidden md:col-span-4">
            <img
              src={architecture}
              alt="Architectural detail"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-[34vh] w-full object-cover will-change-transform md:h-[46vh]"
              style={{ transform: `${p(50)} scale(1.06)` }}
            />
            <figcaption className="eyebrow mt-4">Detail</figcaption>
          </figure>

          <figure className="overflow-hidden md:col-span-8 md:mt-[6vh]">
            <img
              src={exterior}
              alt="Exterior at night"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-[40vh] w-full object-cover will-change-transform md:h-[52vh]"
              style={{ transform: `${p(-40)} scale(1.06)` }}
            />
            <figcaption className="eyebrow mt-4">Exterior</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
