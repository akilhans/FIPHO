import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Preparatory Problems | ${BRAND.fullName}`,
  description:
    "Download official FIPHO preparatory problems and solutions to prepare for the international physics olympiad.",
};

const documents = [
  {
    title: "Preparatory Problems",
    description: "Official practice problems covering all topics in the FIPHO syllabus.",
    href: "/docs/problems.pdf",
    type: "PDF",
  },
  {
    title: "Solutions",
    description: "Detailed solutions to the preparatory problems with full explanations.",
    href: "/solutions.pdf",
    type: "PDF",
  },
];

export default function PreparatoryProblemsPage() {
  return (
    <section className="relative w-full bg-fipho-light min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/5 text-fipho-blue"
          >
            Preparation Materials
          </Badge>
          <h1 className="font-heading mb-4 text-3xl font-bold tracking-tight text-fipho-navy sm:text-5xl">
            Preparatory Problems &amp; Solutions
          </h1>
          <p className="text-fipho-slate/70">
            Official practice materials to help participating teams prepare for
            FIPHO {BRAND.year}.
          </p>
        </div>

        <div className="mx-auto max-w-2xl grid gap-6">
          {documents.map((doc) => (
            <Card key={doc.title} className="border-white bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading text-fipho-navy">
                  <FileText className="h-5 w-5 text-fipho-blue" />
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-fipho-slate/70">{doc.description}</p>
                <a href={doc.href} download>
                  <Button className="bg-fipho-blue text-white hover:bg-fipho-blue/90 cursor-pointer">
                    <Download className="mr-2 h-4 w-4" />
                    Download {doc.type}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
