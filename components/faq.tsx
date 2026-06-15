import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { BRAND } from "@/lib/brand";

const faqs = [
  {
    question: "What is the Fargʻoniy International Physics Olympiad (FIPHO)?",
    answer:
      "FIPHO is a prestigious international physics competition that brings together talented secondary school students from around the world. It promotes scientific excellence, international collaboration, and honors the legacy of Ahmad al-Fargʻoniy.",
  },
  {
    question: "When and where will the Olympiad take place?",
    answer: `FIPHO ${BRAND.year} will be held in ${BRAND.location}, from ${BRAND.dates}.`,
  },
  {
    question: "Who is eligible to participate?",
    answer:
      "Participants must be secondary school students under 18 years of age, enrolled in a regular school (not yet in full-time university studies). Each country sends one team of 4 students and 2 team leaders.",
  },
  {
    question: "How can my country participate?",
    answer: `Countries interested in participating should contact ${BRAND.email} through their national olympiad organization before the registration deadline.`,
  },
  {
    question: "Can students register individually?",
    answer:
      "No. Students must be selected through their national physics olympiad or official selection process and registered as part of a national team.",
  },
  {
    question: "How can we register for the Olympiad?",
    answer:
      "Teams register online through the official registration portal. The registration link is provided in the official invitation letter sent to participating countries.",
  },
  {
    question: "Is there a registration fee?",
    answer: "No, there is no registration fee for participating teams.",
  },
  {
    question: "What expenses are covered by the organizers?",
    answer:
      "The Organizing Committee covers accommodation, meals (breakfast, lunch, and dinner), and local transportation within Uzbekistan.",
  },
  {
    question: "What expenses must participants cover?",
    answer:
      "Participants must cover international travel costs, visa fees, and personal insurance.",
  },
  {
    question: "What is the format of the Olympiad?",
    answer:
      "The competition consists of two rounds: a Theoretical Round (5 hours, 60 points) and an Experimental Round (5 hours, 40 points).",
  },
  {
    question: "What equipment is provided during the exams?",
    answer:
      "Students receive a scientific calculator, reference materials as specified in the rules, and all necessary laboratory equipment for the experimental round.",
  },
  {
    question: "Are electronic devices allowed during the exam?",
    answer:
      "No. Phones, tablets, smartwatches, and other electronic devices are strictly prohibited during examinations. Violations may result in disqualification.",
  },
  {
    question: "How are winners determined?",
    answer:
      "The top 60% of participants receive medals in a 1 (gold): 2 (silver): 3 (bronze) ratio. Certificates of participation are awarded to all competitors.",
  },
  {
    question: "Is accommodation provided?",
    answer:
      "Yes. All participating teams are provided with hotel accommodation for the duration of the olympiad.",
  },
  {
    question: "Where can I find preparatory problems?",
    answer:
      "Official preparatory problems and solutions are available on the Preparatory Problems page and in the Info Center section of this website.",
  },
];

export function FAQSection() {
  return (
    <section className="relative w-full section-dark py-20 overflow-hidden" id="faq">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fipho-gold/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30">
            Help Center
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-white/70">
            Find answers to common questions about registration, eligibility,
            travel, accommodation, and the examination format.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 rounded-xl border-white/10"
              >
                <AccordionTrigger className="text-white hover:text-fipho-gold [&[data-state=open]>div>svg]:text-fipho-gold">
                  <div className="flex items-center gap-3 text-left">
                    <HelpCircle className="h-5 w-5 shrink-0 text-fipho-gold/70" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/65 pb-6 pl-8 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-fipho-gold hover:text-white underline underline-offset-4 transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
