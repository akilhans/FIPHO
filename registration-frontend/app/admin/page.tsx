"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  FileText,
  Images,
  Newspaper,
  Users,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import type { PaginatedResponse } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Metric = {
  key: string;
  label: string;
  href: string;
  endpoint: string;
  icon: typeof FileText;
};

const metrics: Metric[] = [
  {
    key: "participation-requests",
    label: "Participation requests",
    href: "/admin/participation-requests",
    endpoint: "/api/participation-requests/?page=1",
    icon: FileText,
  },
  {
    key: "detailed-registrations",
    label: "Detailed registrations",
    href: "/admin/registrations",
    endpoint: "/api/detailed-registrations/?page=1",
    icon: Users,
  },
  {
    key: "news",
    label: "News posts",
    href: "/admin/news",
    endpoint: "/api/admin/news/?page=1",
    icon: Newspaper,
  },
  {
    key: "media",
    label: "Gallery albums",
    href: "/admin/media",
    endpoint: "/api/admin/media-albums/?page=1",
    icon: Images,
  },
];

const actions = [
  {
    title: "Review first-step requests",
    description: "Approve invited countries and initial delegation interest.",
    href: "/admin/participation-requests",
    icon: Users,
  },
  {
    title: "Create news post",
    description: "Publish updates that feed the landing-page news section.",
    href: "/admin/news/new",
    icon: Newspaper,
  },
  {
    title: "Add gallery album",
    description: "Publish photo albums and media links for the public gallery.",
    href: "/admin/media/new",
    icon: Images,
  },
];

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCounts() {
      const entries = await Promise.all(
        metrics.map(async (metric) => {
          try {
            const res = await apiFetch(metric.endpoint);
            if (!res.ok) return [metric.key, 0] as const;
            const data = (await res.json()) as PaginatedResponse<unknown>;
            return [metric.key, data.count] as const;
          } catch {
            return [metric.key, 0] as const;
          }
        })
      );

      if (!cancelled) {
        setCounts(Object.fromEntries(entries));
        setLoading(false);
      }
    }

    loadCounts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-[#7dd3fc] bg-[linear-gradient(135deg,#ffffff_0%,#e0f2fe_100%)] p-6 shadow-[0_18px_50px_rgba(28,40,56,0.08)]">
        <Badge className="border-[#38bdf8]/40 bg-[#e0f2fe] text-[#0369a1]">
          Unified Operations
        </Badge>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#192738]">
              FIPHO Control Panel
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#667282]">
              Manage first-step requests, detailed delegation registrations,
              public news, and gallery content from a single staff workspace.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Link key={metric.key} href={metric.href}>
            <Card className="h-full border-[#bae6fd] bg-white/86 transition hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(28,40,56,0.12)]">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-[#667282]">
                  {metric.label}
                </CardTitle>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7]">
                  <metric.icon className="h-4 w-4" />
                </span>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-9 w-20" />
                ) : (
                  <div className="text-3xl font-semibold text-[#192738]">
                    {counts[metric.key] ?? 0}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {actions.map((action) => (
          <Card key={action.href} className="border-[#bae6fd] bg-white/86">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#192738]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7]">
                  <action.icon className="h-5 w-5" />
                </span>
                {action.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-[#667282]">
                {action.description}
              </p>
              <Button asChild variant="outline" className="rounded-full border-[#7dd3fc] bg-white/80 text-[#203247] hover:bg-[#e0f2fe]">
                <Link href={action.href}>
                  Open
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
