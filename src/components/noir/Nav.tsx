import { useEffect, useState } from "react";
import { useScrollTo } from "@/hooks/use-noir";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Experience", id: "ritual" },
  { label: "Menu", id: "signature" },
  { label: "Our Story", id: "chef" },
  { label: "Private Dining", id: "private" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollTo(id), 40);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-700",
          solid ? "bg-background/80 py-4 backdrop-blur-md" : "py-7",
        )}
        style={{ borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent" }}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          <button
            onClick={() => go("hero")}
            className="display text-ivory text-xl tracking-[0.4em]"
            data-cursor="link"
          >
            NOIR
          </button>

          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-cursor="link"
                className="noir-link text-muted-foreground hover:text-foreground text-[0.6875rem] tracking-[0.26em] uppercase transition-colors duration-500"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("reserve")}
              data-cursor="reserve"
              className="border-champagne/50 text-champagne hover:bg-champagne hover:text-primary-foreground border px-6 py-3 text-[0.6875rem] tracking-[0.26em] uppercase transition-colors duration-500"
            >
              Reserve
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-ivory text-[0.6875rem] tracking-[0.26em] uppercase md:hidden"
            aria-label="Open menu"
          >
            Menu
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "bg-background fixed inset-0 z-[99] flex flex-col justify-between px-6 py-7 transition-opacity duration-500 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="display text-ivory text-xl tracking-[0.4em]">NOIR</span>
          <button
            onClick={() => setOpen(false)}
            className="text-champagne text-[0.6875rem] tracking-[0.26em] uppercase"
            aria-label="Close menu"
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="display text-ivory text-left text-[2.75rem]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `all .7s var(--ease-noir) ${0.08 * i + 0.1}s`,
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div>
          <div className="hairline mb-6" />
          <button
            onClick={() => go("reserve")}
            className="bg-champagne text-primary-foreground w-full py-4 text-[0.6875rem] tracking-[0.28em] uppercase"
          >
            Reserve a table
          </button>
        </div>
      </div>
    </>
  );
}
