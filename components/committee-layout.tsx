import { Mail, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface CommitteeMember {
  name: string;
  role: string;
  institution: string;
  country: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
}

interface CommitteeLayoutProps {
  title: string;
  description: string;
  members: CommitteeMember[];
  type: "organizing" | "scientific";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function CommitteeLayout({
  title,
  description,
  members,
  type,
}: CommitteeLayoutProps) {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-36 pb-16 px-6 text-center bg-background overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(224,181,85,0.08), transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-5 text-accent">
            {type === "organizing" ? "Organization" : "Scientific Committee"}
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            {title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* MEMBER GRID */}
      <section className="px-6 pb-24 bg-background">
        <div className="max-w-6xl mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.name}
              className="p-6 rounded-xl border border-amber-200/60 bg-[#f7f2e7] hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-16 w-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-amber-300/50 bg-amber-100 flex items-center justify-center">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-heading font-semibold text-amber-800">
                      {initials(member.name)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg leading-tight text-amber-950">
                    {member.name}
                  </h3>
                  <p className="text-sm text-amber-700">{member.role}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-slate-700">{member.institution}</p>
                <p className="text-xs text-slate-500">{member.country}</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {member.bio}
              </p>

              {(member.email || member.linkedin) && (
                <div className="flex gap-2 pt-2 border-t border-amber-200/60">
                  {member.email && (
                    <Link
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-300/60 text-amber-800 hover:bg-amber-100 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </Link>
                  )}
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-300/60 text-amber-800 hover:bg-amber-100 transition-colors"
                    >
                      <LinkedinIcon className="h-3.5 w-3.5" />
                      LinkedIn
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}