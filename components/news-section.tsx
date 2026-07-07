import { Newspaper, Calendar } from "lucide-react";

export function NewsSection() {
  return (
    <section id="news" className="relative w-full bg-[#f7f5f0] py-24 text-[#1a1d24]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-12">
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

        {/* Announcement Container */}
        <div className="max-w-xl mx-auto p-8 rounded-xl border border-[#e8e4d9] bg-white text-center shadow-sm">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#bc963e]/10 text-[#bc963e] mb-4">
            <Calendar className="h-5 w-5" />
          </div>
          <h3 className="font-heading font-semibold text-xl text-[#1a1d24] mb-2">
            Official Registration Opening
          </h3>
          <p className="font-mono-ui text-xs text-[#bc963e] font-semibold tracking-wider uppercase mb-3">
            July 15, 2026
          </p>
          <p className="text-sm text-[#555a66] max-w-sm mx-auto leading-relaxed">
            The global registration portal for the Al-Ferghani International Physics Olympiad will officially open on July 15. Team leaders and individual participants should prepare their validation credentials in advance.
          </p>
        </div>
        
      </div>
    </section>
  );
}