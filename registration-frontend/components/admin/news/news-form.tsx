"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch, resolveApiUrl } from "@/lib/api";
import type { NewsArticle, NewsGalleryImage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ImagePlus, Save, Trash2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

type NewsFormProps = {
  mode: "create" | "edit";
  initialArticle?: NewsArticle;
};

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  is_published: boolean;
  is_featured: boolean;
  published_at: string;
};

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

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

function GalleryThumb({
  image,
  onDelete,
  deleting,
}: {
  image: NewsGalleryImage;
  onDelete: (id: number) => void;
  deleting: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="relative h-36">
        <Image
          src={resolveApiUrl(image.image)}
          alt={image.caption || "News gallery image"}
          fill
          sizes="220px"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-2">
        <span className="truncate text-xs text-muted-foreground">
          {image.caption || "Gallery image"}
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

export function NewsForm({ mode, initialArticle }: NewsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: initialArticle?.title || "",
    excerpt: initialArticle?.excerpt || "",
    content: initialArticle?.content || "",
    is_published: initialArticle?.is_published || false,
    is_featured: initialArticle?.is_featured || false,
    published_at: toDateTimeLocal(initialArticle?.published_at || null),
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [gallery, setGallery] = useState<NewsGalleryImage[]>(
    initialArticle?.gallery_images || []
  );
  const [submitting, setSubmitting] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleMainImage = (file: File | undefined) => {
    if (!file) {
      setMainImage(null);
      return;
    }
    if (validateImage(file)) setMainImage(file);
  };

  const handleGalleryFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(validateImage);
    setGalleryFiles(valid);
  };

  const appendArticleFields = (data: FormData) => {
    data.append("title", form.title);
    data.append("excerpt", form.excerpt);
    data.append("content", form.content);
    data.append("is_published", String(form.is_published));
    data.append("is_featured", String(form.is_featured));
    if (form.published_at) {
      data.append("published_at", new Date(form.published_at).toISOString());
    }
    if (mainImage) {
      data.append("main_image", mainImage);
    }
  };

  const uploadGallery = async (articleId: number) => {
    if (galleryFiles.length === 0) return null;
    const data = new FormData();
    galleryFiles.forEach((file) => data.append("images", file));
    const res = await apiFetch(`/api/admin/news/${articleId}/gallery/`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error("Failed to upload gallery images");
    return (await res.json()) as NewsArticle;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.content.trim()) {
      toast.error("Content is required");
      return;
    }
    if (mode === "create" && !mainImage) {
      toast.error("Main image is required");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      appendArticleFields(data);
      const articleId = initialArticle?.id;
      const res = await apiFetch(
        mode === "create" ? "/api/admin/news/" : `/api/admin/news/${articleId}/`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          body: data,
        }
      );

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error ? JSON.stringify(error) : "Failed to save news");
      }

      const saved = (await res.json()) as NewsArticle;
      const withGallery = await uploadGallery(saved.id);
      toast.success(mode === "create" ? "News article created" : "News article updated");

      if (mode === "create") {
        router.push(`/admin/news/${saved.id}/edit`);
      } else {
        setGallery(withGallery?.gallery_images || saved.gallery_images);
        setGalleryFiles([]);
        setMainImage(null);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save news");
    }
    setSubmitting(false);
  };

  const handleDeleteGalleryImage = async (id: number) => {
    setDeletingImageId(id);
    try {
      const res = await apiFetch(`/api/admin/news/gallery/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGallery((prev) => prev.filter((item) => item.id !== id));
        toast.success("Gallery image removed");
      } else {
        toast.error("Failed to remove gallery image");
      }
    } catch {
      toast.error("Failed to remove gallery image");
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
          onClick={() => router.push("/admin/news")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "New News Article" : "Edit News Article"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Article Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Article title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Published date</label>
                <Input
                  type="datetime-local"
                  value={form.published_at}
                  onChange={(event) =>
                    updateField("published_at", event.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Excerpt</label>
              <Textarea
                value={form.excerpt}
                onChange={(event) => updateField("excerpt", event.target.value)}
                placeholder="Short summary for cards and previews"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={form.content}
                onChange={(event) => updateField("content", event.target.value)}
                placeholder="Full news article"
                rows={10}
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={form.is_published}
                  onCheckedChange={(value) =>
                    updateField("is_published", Boolean(value))
                  }
                />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={form.is_featured}
                  onCheckedChange={(value) =>
                    updateField("is_featured", Boolean(value))
                  }
                />
                Featured
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
              <div className="space-y-2">
                <label className="text-sm font-medium">Main image</label>
                <Input
                  type="file"
                  accept={IMAGE_TYPES.join(",")}
                  onChange={(event) => handleMainImage(event.target.files?.[0])}
                />
                {mainImage && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ImagePlus className="h-4 w-4" />
                    {mainImage.name}
                  </div>
                )}
              </div>
              {initialArticle?.main_image && !mainImage && (
                <div className="relative h-44 overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={resolveApiUrl(initialArticle.main_image)}
                    alt={initialArticle.title}
                    fill
                    sizes="500px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gallery images</label>
              <Input
                type="file"
                multiple
                accept={IMAGE_TYPES.join(",")}
                onChange={(event) => handleGalleryFiles(event.target.files)}
              />
              {galleryFiles.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  {galleryFiles.length} image{galleryFiles.length === 1 ? "" : "s"} selected
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setGalleryFiles([])}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {gallery.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {gallery.map((image) => (
                  <GalleryThumb
                    key={image.id}
                    image={image}
                    deleting={deletingImageId === image.id}
                    onDelete={handleDeleteGalleryImage}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            <Save className="mr-2 h-4 w-4" />
            {submitting ? "Saving..." : "Save News"}
          </Button>
        </div>
      </form>
    </div>
  );
}
