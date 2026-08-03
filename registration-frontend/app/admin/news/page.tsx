"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { NewsArticle, PaginatedResponse } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Pagination } from "@/components/admin/pagination";
import { Edit, Plus, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const PAGE_SIZE = 50;

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminNewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [data, setData] = useState<PaginatedResponse<NewsArticle> | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/news/?page=${page}`);
      if (res.ok) {
        setData(await res.json());
      } else {
        toast.error("Failed to load news");
      }
    } catch {
      toast.error("Failed to load news");
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/admin/news/${deleteId}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("News article deleted");
        setDeleteId(null);
        if (data && data.results.length === 1 && page > 1) {
          router.push(`/admin/news?page=${page - 1}`);
        } else {
          fetchData();
        }
      } else {
        toast.error("Failed to delete news article");
      }
    } catch {
      toast.error("Failed to delete news article");
    }
    setDeleting(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">News</h1>
        <Button onClick={() => router.push("/admin/news/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      ) : data && data.results.length > 0 ? (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.results.map((article) => (
                  <TableRow
                    key={article.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/admin/news/${article.id}/edit`)}
                  >
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      <Badge variant={article.is_published ? "default" : "secondary"}>
                        {article.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {article.is_featured ? (
                        <span className="inline-flex items-center gap-1 text-sm text-[#0369a1]">
                          <Star className="h-4 w-4 fill-current" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(article.published_at)}</TableCell>
                    <TableCell>{formatDate(article.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(event) => {
                            event.stopPropagation();
                            router.push(`/admin/news/${article.id}/edit`);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(event) => {
                            event.stopPropagation();
                            setDeleteId(article.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            count={data.count}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={(nextPage) => router.push(`/admin/news?page=${nextPage}`)}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No news articles found.</p>
      )}

      <DeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete News Article"
        description="Are you sure you want to delete this news article? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
}
