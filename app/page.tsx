import Herof from "@/components/herof";
import About from "@/components/about";
import { StatsSection } from "@/components/stats-section";
import Disciplines from "@/components/disciplines";
import { CompetitionSection } from "@/components/competetion";
import { TimelineSection } from "@/components/timeline-section";
import { NewsSection } from "@/components/news-section";
import { FAQSection } from "@/components/faq";
import { EventFilm } from "@/components/event-film";

export default function Home() {
  return (
    <main>
      <Herof />
      <EventFilm />
      <About />
      <StatsSection />
      <Disciplines />
      <CompetitionSection />
      <TimelineSection />
      <NewsSection />
      <FAQSection />
    </main>
  );
}
