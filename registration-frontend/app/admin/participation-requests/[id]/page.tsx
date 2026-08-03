"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { ParticipationRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function ParticipationRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<ParticipationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch(`/api/participation-requests/${params.id}/`);
        if (res.ok) {
          setData(await res.json());
        } else {
          toast.error("Failed to load request");
        }
      } catch {
        toast.error("Failed to load request");
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/participation-requests/${params.id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/participation-requests");
      } else {
        toast.error("Failed to delete request");
      }
    } catch {
      toast.error("Failed to delete request");
    }
    setDeleting(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-muted-foreground">Request not found.</p>;
  }

  const fields = [
    { label: "Full Name", value: data.full_name },
    { label: "Country", value: data.country.name },
    { label: "Role", value: data.role.name },
    { label: "Subject", value: data.subject.name },
    { label: "Email", value: data.email || "—" },
    { label: "WhatsApp", value: data.whatsapp_number || "—" },
    { label: "Additional Number", value: data.additional_number || "—" },
    {
      label: "Students",
      value: data.number_of_students,
    },
    {
      label: "Team Leaders",
      value: data.number_of_team_leaders,
    },
    { label: "Created", value: formatDate(data.created_at) },
    { label: "Updated", value: formatDate(data.updated_at) },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/participation-requests")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold flex-1">{data.full_name}</h1>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDelete(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.label}>
                <p className="text-sm text-muted-foreground">{field.label}</p>
                <p className="text-sm font-medium">{String(field.value)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DeleteDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        onConfirm={handleDelete}
        title="Delete Participation Request"
        description="Are you sure you want to delete this participation request? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
}
