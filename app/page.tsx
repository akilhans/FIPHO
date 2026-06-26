import { AboutSection } from "@/components/about-section";
import { CommitteePreview } from "@/components/committee-preview";
import { CompetitionSection } from "@/components/competetion";
import { FAQSection } from "@/components/faq";
import Hero from "@/components/hero";
import { NewsSection } from "@/components/news-section";
import { PhysicsDisciplines } from "@/components/physics-disciplines";
import { StatsSection } from "@/components/stats-section";
import { TimelineSection } from "@/components/timeline-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <PhysicsDisciplines />
      <CompetitionSection />
      <TimelineSection />
      <CommitteePreview />
      <NewsSection />
      <FAQSection />
    </>
  );
}
