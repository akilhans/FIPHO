"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { MediaAlbum } from "@/lib/types";
import { MediaAlbumForm } from "@/components/admin/media/media-album-form";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export default function EditMediaAlbumPage() {
  const params = useParams();
  const [album, setAlbum] = useState<MediaAlbum | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch(`/api/admin/media-albums/${params.id}/`);
        if (res.ok) {
          setAlbum(await res.json());
        } else {
          toast.error("Failed to load media album");
        }
      } catch {
        toast.error("Failed to load media album");
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

  if (!album) {
    return <p className="text-muted-foreground">Media album not found.</p>;
  }

  return <MediaAlbumForm mode="edit" initialAlbum={album} />;
}
