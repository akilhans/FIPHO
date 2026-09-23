import { MemberPhoto } from "@/components/member-photo";

export interface CommitteeMember {
  name: string;
  role: string;
  institution: string;
  country: string;
  bio: string;
  image?: string;
  imagePosition?: string;
  // Square face crop for the avatar; `image` opens full size on click.
  thumbnail?: string;
}

interface CommitteeLayoutProps {
  title: string;
  description: string;
  members: CommitteeMember[];
  type: "organizing" | "scientific";
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
                <MemberPhoto
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  thumbnail={member.thumbnail}
                  imagePosition={member.imagePosition}
                />
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
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}