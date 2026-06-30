import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

const documents = [
  {
    title: "FIPHO 2024 Final Results",
    category: "Results",
    file: "/docs/results.pdf",
    date: "July 15, 2024",
  },
  {
    title: "FIPHO 2025 Final Results",
    category: "Results",
    file: "/docs/results1.pdf",
    date: "June 4, 2025",
  },
  {
    title: "FIPHO 2025 Theory Solutions (Official)",
    category: "Problems",
    file: "/docs/theory.pdf",
    date: "FIPHO 2025",
    size: "2.1 MB",
  },
  {
    title: "FIPHO 2025 Practice Problems (Official)",
    category: "Problems",
    file: "/problems/Al-Farghani practice_Official.pdf",
    date: "FIPHO 2025",
    size: "621.0 KB",
  },
  {
    title: "FIPHO 2025 Practice Problems (Uzbek)",
    category: "Problems",
    file: "/problems/Al-Farghani_practice uzbek.pdf",
    date: "FIPHO 2025",
    size: "621.4 KB",
  },
  {
    title: "FIPHO 2025 Theory Problems (Uzbek)",
    category: "Problems",
    file: "/problems/Al-Farghani theory uzbek.pdf",
    date: "FIPHO 2025",
    size: "1.1 MB",
  },
  {
    title: "FIPHO 2025 Theory Final",
    category: "Problems",
    file: "/problems/Al-Farghani theory_Final.docx",
    date: "FIPHO 2025",
    size: "1.3 MB",
  },
];

export default function ResultsReportsPage() {
  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/10 text-fipho-gold hover:bg-fipho-blue/20"
          >
            Info Center
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Results & Problems
          </h1>
          <p className="text-white mb-6">
            Access official results and problems from FIPHO.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy">
                Available Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.file}
                  className="flex items-center justify-between p-4 rounded-lg bg-fipho-navy/20 hover:bg-fipho-navy/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-fipho-gold mt-1" />
                    <div>
                      <h3 className="font-medium text-fipho-navy">
                        {doc.title}
                      </h3>
                      <div className="flex gap-2 mt-1 text-sm text-fipho-slate/70">
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        {doc.size && (
                          <>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-fipho-blue/20 bg-fipho-navy/20 text-fipho-navy hover:bg-fipho-navy/40"
                    asChild
                  >
                    <a href={doc.file} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* PDF Preview */}
          {/* <div className="mt-8">
            <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-fipho-navy">
                  Document Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  src="/docs/results.pdf"
                  className="w-full h-[600px] rounded-lg"
                  title="Document Preview"
                />
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </section>
  );
}
