"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch, resolveApiUrl } from "@/lib/api";
import type { MediaAlbum, MediaImage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Images, Save, Trash2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

type FormState = {
  title: string;
  description: string;
  external_url: string;
  external_url_label: string;
  is_published: boolean;
  sort_order: string;
};

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function validateImage(file: File) {
  if (file.size > MAX_IMAGE_SIZE) {
    toast.error("Image size must not exceed 10MB");
    return false;
  }
  if (!IMAGE_TYPES.includes(file.type)) {
    toast.error("Upload JPG, PNG, GIF, or WebP images only");
    return false;
  }
  return true;
}

function AlbumImage({
  image,
  deleting,
  onDelete,
}: {
  image: MediaImage;
  deleting: boolean;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="relative h-36">
        <Image
          src={resolveApiUrl(image.image_url)}
          alt={image.alt_text || image.title || "Media image"}
          fill
          sizes="220px"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-2">
        <span className="truncate text-xs text-muted-foreground">
          {image.title || image.alt_text || "Media image"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={deleting}
          onClick={() => onDelete(image.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}

export function MediaAlbumForm({
  mode,
  initialAlbum,
}: {
  mode: "create" | "edit";
  initialAlbum?: MediaAlbum;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: initialAlbum?.title || "",
    description: initialAlbum?.description || "",
    external_url: initialAlbum?.external_url || "",
    external_url_label: initialAlbum?.external_url_label || "",
    is_published: initialAlbum?.is_published || false,
    sort_order: String(initialAlbum?.sort_order ?? 0),
  });
  const [images, setImages] = useState<MediaImage[]>(initialAlbum?.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageFiles = (files: FileList | null) => {
    if (!files) return;
    setImageFiles(Array.from(files).filter(validateImage));
  };

  const appendFields = (data: FormData) => {
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("external_url", form.external_url);
    data.append("external_url_label", form.external_url_label);
    data.append("is_published", String(form.is_published));
    data.append("sort_order", form.sort_order || "0");
  };

  const uploadImages = async (albumId: number) => {
    if (imageFiles.length === 0) return null;
    const data = new FormData();
    imageFiles.forEach((file) => data.append("images", file));
    const res = await apiFetch(`/api/admin/media-albums/${albumId}/images/`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error("Failed to upload media images");
    return (await res.json()) as MediaAlbum;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) {
      toast.error("Album title is required");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      appendFields(data);
      const res = await apiFetch(
        mode === "create"
          ? "/api/admin/media-albums/"
          : `/api/admin/media-albums/${initialAlbum?.id}/`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          body: data,
        }
      );

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error ? JSON.stringify(error) : "Failed to save media album");
      }

      const saved = (await res.json()) as MediaAlbum;
      const withImages = await uploadImages(saved.id);
      toast.success(mode === "create" ? "Media album created" : "Media album updated");

      if (mode === "create") {
        router.push(`/admin/media/${saved.id}/edit`);
      } else {
        setImages(withImages?.images || saved.images);
        setImageFiles([]);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save media album");
    }
    setSubmitting(false);
  };

  const handleDeleteImage = async (id: number) => {
    setDeletingImageId(id);
    try {
      const res = await apiFetch(`/api/admin/media-images/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages((prev) => prev.filter((image) => image.id !== id));
        toast.success("Image removed");
      } else {
        toast.error("Failed to remove image");
      }
    } catch {
      toast.error("Failed to remove image");
    }
    setDeletingImageId(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/media")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "New Media Album" : "Edit Media Album"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Album Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort order</label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(event) => updateField("sort_order", event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                rows={4}
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">External gallery URL</label>
                <Input
                  value={form.external_url}
                  onChange={(event) => updateField("external_url", event.target.value)}
                  placeholder="https://drive.google.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">External link label</label>
                <Input
                  value={form.external_url_label}
                  onChange={(event) =>
                    updateField("external_url_label", event.target.value)
                  }
                  placeholder="View All Photos"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.is_published}
                onCheckedChange={(value) =>
                  updateField("is_published", Boolean(value))
                }
              />
              Published
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload images</label>
              <Input
                type="file"
                multiple
                accept={IMAGE_TYPES.join(",")}
                onChange={(event) => handleImageFiles(event.target.files)}
              />
              {imageFiles.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  {imageFiles.length} image{imageFiles.length === 1 ? "" : "s"} selected
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setImageFiles([])}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {images.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {images.map((image) => (
                  <AlbumImage
                    key={image.id}
                    image={image}
                    deleting={deletingImageId === image.id}
                    onDelete={handleDeleteImage}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                <Images className="mx-auto mb-2 h-8 w-8" />
                No images in this album yet.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            <Save className="mr-2 h-4 w-4" />
            {submitting ? "Saving..." : "Save Album"}
          </Button>
        </div>
      </form>
    </div>
  );
}
