"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { NewsArticle } from "@/lib/types";
import { NewsForm } from "@/components/admin/news/news-form";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export default function EditNewsPage() {
  const params = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch(`/api/admin/news/${params.id}/`);
        if (res.ok) {
          setArticle(await res.json());
        } else {
          toast.error("Failed to load news article");
        }
      } catch {
        toast.error("Failed to load news article");
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!article) {
    return <p className="text-muted-foreground">News article not found.</p>;
  }

  return <NewsForm mode="edit" initialArticle={article} />;
}
