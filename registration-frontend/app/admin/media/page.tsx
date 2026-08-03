"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { MediaAlbum, PaginatedResponse } from "@/lib/types";
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
import { Edit, Images, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const PAGE_SIZE = 50;

export default function AdminMediaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [data, setData] = useState<PaginatedResponse<MediaAlbum> | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/media-albums/?page=${page}`);
      if (res.ok) {
        setData(await res.json());
      } else {
        toast.error("Failed to load media albums");
      }
    } catch {
      toast.error("Failed to load media albums");
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
      const res = await apiFetch(`/api/admin/media-albums/${deleteId}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Media album deleted");
        setDeleteId(null);
        if (data && data.results.length === 1 && page > 1) {
          router.push(`/admin/media?page=${page - 1}`);
        } else {
          fetchData();
        }
      } else {
        toast.error("Failed to delete media album");
      }
    } catch {
      toast.error("Failed to delete media album");
    }
    setDeleting(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Media</h1>
        <Button onClick={() => router.push("/admin/media/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Album
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
                  <TableHead>Images</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.results.map((album) => (
                  <TableRow
                    key={album.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/admin/media/${album.id}/edit`)}
                  >
                    <TableCell className="font-medium">{album.title}</TableCell>
                    <TableCell>
                      <Badge variant={album.is_published ? "default" : "secondary"}>
                        {album.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1">
                        <Images className="h-4 w-4" />
                        {album.images.length}
                      </span>
                    </TableCell>
                    <TableCell>{album.sort_order}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(event) => {
                            event.stopPropagation();
                            router.push(`/admin/media/${album.id}/edit`);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(event) => {
                            event.stopPropagation();
                            setDeleteId(album.id);
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
            onPageChange={(nextPage) => router.push(`/admin/media?page=${nextPage}`)}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No media albums found.</p>
      )}

      <DeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Media Album"
        description="Are you sure you want to delete this media album and all of its images? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
}
