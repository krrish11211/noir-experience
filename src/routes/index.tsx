import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Loader } from "@/components/noir/Loader";
import { Cursor } from "@/components/noir/Cursor";
import { Nav } from "@/components/noir/Nav";
import { Hero } from "@/components/noir/Hero";
import { Philosophy } from "@/components/noir/Philosophy";
import { PlateJourney } from "@/components/noir/PlateJourney";
import { Ritual } from "@/components/noir/Ritual";
import { Orbit } from "@/components/noir/Orbit";
import { Lunch, Aperitivo, Dinner, Midnight } from "@/components/noir/DayPhases";
import { Kitchen } from "@/components/noir/Kitchen";
import { Signature } from "@/components/noir/Signature";
import { Chef } from "@/components/noir/Chef";
import { Space } from "@/components/noir/Space";
import { PrivateDining } from "@/components/noir/PrivateDining";
import { Reservation } from "@/components/noir/Reservation";
import { Footer } from "@/components/noir/Footer";
import { useReducedMotion, useSmoothScroll } from "@/hooks/use-noir";

const TITLE = "NOIR — Contemporary Fine Dining";
const DESCRIPTION =
  "NOIR is an intimate contemporary fine dining room in Aldenmoor. Twelve tables, one menu, an evening composed one course at a time.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const onDone = useCallback(() => setReady(true), []);

  useSmoothScroll(ready && !reduced);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Loader onDone={onDone} />
      <Cursor />
      <Nav />

      <main>
        <Hero ready={ready} />
        <Philosophy />
        <PlateJourney />
        <Ritual />
        <Orbit />
        <Lunch />
        <Aperitivo />
        <Dinner />
        <Midnight />
        <Kitchen />
        <Signature />
        <Chef />
        <Space />
        <PrivateDining />
        <Reservation />
      </main>

      <Footer />
    </div>
  );
}
