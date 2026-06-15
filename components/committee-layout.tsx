import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, LinkedinIcon } from "lucide-react";
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

export function CommitteeLayout({
  title,
  description,
  members,
  type,
}: CommitteeLayoutProps) {
  return (
    <section className="relative w-full bg-fipho-light min-h-screen py-20">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/5 text-fipho-blue"
          >
            {type === "organizing" ? "Organization" : "Scientific Committee"}
          </Badge>
          <h1 className="font-heading mb-4 text-3xl font-bold tracking-tight text-fipho-navy sm:text-4xl">
            {title}
          </h1>
          <p className="text-fipho-slate/70">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Card
              key={index}
              className="group border-white bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16 border-2 border-fipho-blue/20">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="bg-fipho-navy text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-heading font-medium text-lg text-fipho-navy">
                    {member.name}
                  </h3>
                  <p className="text-sm text-fipho-blue">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-fipho-slate/70">{member.institution}</p>
                  <p className="text-sm text-fipho-slate/60">{member.country}</p>
                </div>
                <p className="text-sm text-fipho-slate/70 leading-relaxed">{member.bio}</p>
                <div className="flex gap-2 pt-2">
                  {member.email && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-fipho-blue/20 text-fipho-blue hover:bg-fipho-blue/5"
                      asChild
                    >
                      <Link href={`mailto:${member.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Link>
                    </Button>
                  )}
                  {member.linkedin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-fipho-blue/20 text-fipho-blue hover:bg-fipho-blue/5"
                      asChild
                    >
                      <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
