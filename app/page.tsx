import Herof from "@/components/herof";
import About from "@/components/about";
import { StatsSection } from "@/components/stats-section";
import Disciplines from "@/components/disciplines";
import { CompetitionSection } from "@/components/competetion";
import { TimelineSection } from "@/components/timeline-section";
import { CommitteePreview } from "@/components/committee-preview";
import { NewsSection } from "@/components/news-section";
import { FAQSection } from "@/components/faq";

export default function Home() {
  return (
    <main>
      <Herof />
      <About />
      <StatsSection />
      <Disciplines />
      <CompetitionSection />
      <TimelineSection />
      <CommitteePreview />
      <NewsSection />
      <FAQSection />
    </main>
  );
}