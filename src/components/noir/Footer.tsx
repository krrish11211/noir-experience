import { useScrollTo } from "@/hooks/use-noir";

const NAV = [
  { label: "Menu", id: "signature" },
  { label: "Experience", id: "ritual" },
  { label: "Private Dining", id: "private" },
  { label: "Reservations", id: "reserve" },
  { label: "Contact", id: "reserve" },
];

export function Footer() {
  const scrollTo = useScrollTo();

  return (
    <footer className="bg-background relative border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <span className="display text-ivory block text-3xl tracking-[0.4em]">NOIR</span>
            <span className="eyebrow mt-4 block">Contemporary Fine Dining</span>
          </div>

          <nav className="flex flex-col gap-3">
            {NAV.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.id)}
                data-cursor="link"
                className="noir-link text-muted-foreground hover:text-foreground w-fit text-[0.6875rem] tracking-[0.24em] uppercase transition-colors duration-500"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-[0.6875rem] leading-relaxed tracking-[0.16em] uppercase">
              41 Verrell Lane
              <br />
              Marlowe District
              <br />
              Aldenmoor
            </p>
            <p className="text-muted-foreground mt-4 text-[0.6875rem] tracking-[0.16em] uppercase">
              Dinner Tue – Sat · 18:00 – 00:00
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="noir-link text-champagne mt-4 w-fit text-[0.6875rem] tracking-[0.24em] uppercase"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="text-muted-foreground flex flex-wrap justify-between gap-4 text-[0.5625rem] tracking-[0.26em] uppercase">
          <span>Webonique / 001 — NOIR</span>
          <span>Fictional restaurant concept</span>
        </div>
      </div>
    </footer>
  );
}
