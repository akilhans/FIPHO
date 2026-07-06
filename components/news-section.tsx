import { Newspaper } from "lucide-react";

const articles = [
  {
    title: "FIPHO 2026 Registration Now Open",
    date: "March 1, 2026",
    category: "Featured",
    content:
      "National teams from around the world are invited to register for the inaugural Farg'oniy International Physics Olympiad.",
  },
  {
    title: "Scientific Committee Announced",
    date: "February 15, 2026",
    category: "Update",
    content:
      "Leading physicists and educators from 15 countries join the FIPHO 2026 Scientific Committee.",
  },
  {
    title: "Preparatory Problems Released",
    date: "February 1, 2026",
    category: "Resources",
    content:
      "Official preparatory problems and solutions are now available for participating teams.",
  },
];

export function NewsSection() {
  return (
    <section id="news" className="relative w-full bg-[#f7f5f0] py-24 text-[#1a1d24]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="font-mono-ui text-[10px] tracking-[0.25em] uppercase px-2 py-1 rounded border border-[#bc963e]/20 bg-[#bc963e]/5 text-[#bc963e] font-medium inline-block mb-4">
            Latest Updates
          </span>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-[#1a1d24] sm:text-4xl">
            News &amp; Announcements
          </h2>
          <p className="text-sm text-[#555a66] max-w-md mx-auto">
            Stay informed with the latest official updates from FIPHO.
          </p>
        </div>

        {/* 3-Column Grid Layout matching image_a0d5c0.png */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div 
              key={article.title} 
              className="flex flex-col justify-between p-6 rounded-xl border border-[#e8e4d9] bg-white/70 shadow-sm backdrop-blur-sm hover:bg-white hover:border-[#bc963e]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Newspaper className="h-4 w-4 text-[#bc963e] opacity-70" />
                  <span className="font-mono-ui text-xs text-[#7c808a]">{article.date}</span>
                  <span className="ml-auto font-mono-ui text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#bc963e]/10 text-[#bc963e] font-semibold">
                    {article.category}
                  </span>
                </div>
                
                <h3 className="font-heading font-semibold text-lg text-[#1a1d24] mb-3 leading-snug">
                  {article.title}
                </h3>
                
                <p className="text-sm text-[#444955] leading-relaxed">
                  {article.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}