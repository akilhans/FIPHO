"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch, fetchMediaUrl } from "@/lib/api";
import type { DetailedRegistration } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

function Info({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium">
        {value === null || value === undefined || value === "" ? "-" : String(value)}
      </p>
    </div>
  );
}

function DocumentLink({ label, path }: { label: string; path: string | null }) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(path));

  useEffect(() => {
    if (!path) return;
    let objectUrl: string | null = null;
    fetchMediaUrl(path).then((resolvedUrl) => {
      objectUrl = resolvedUrl;
      setUrl(resolvedUrl);
      setLoading(false);
    });
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [path]);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      {path && url ? (
        <Button asChild className="mt-2" size="sm" variant="outline">
          <a href={url} download={path.split("/").pop() || "document"}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      ) : (
        <p className="mt-1 text-sm text-muted-foreground">
          {loading ? "Loading..." : path ? "Unavailable" : "Not uploaded"}
        </p>
      )}
    </div>
  );
}

export default function RegistrationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<DetailedRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const response = await apiFetch(`/api/detailed-registrations/${params.id}/`);
        if (response.ok) {
          setData(await response.json());
        } else {
          toast.error("Failed to load detailed registration");
        }
      } catch {
        toast.error("Failed to load detailed registration");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      const response = await apiFetch(`/api/detailed-registrations/${params.id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/admin/registrations");
      } else {
        toast.error("Failed to delete detailed registration");
      }
    } catch {
      toast.error("Failed to delete detailed registration");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-muted-foreground">Detailed registration not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/registrations")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="min-w-0 flex-1 text-2xl font-semibold">
          {data.country.name} Detailed Registration
        </h1>
        <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Delegation</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Info label="Country" value={data.country.name} />
          <Info label="Participating teams" value={data.number_of_teams} />
          <Info
            label="Delegations"
            value={data.delegations
              .map((delegation) => delegation.official_delegation_name)
              .join(", ")}
          />
          <Info label="Information confirmed" value={data.confirm_information ? "Yes" : "No"} />
          <Info label="Rules accepted" value={data.agree_rules ? "Yes" : "No"} />
          <Info label="Submitted" value={new Date(data.created_at).toLocaleString("en-GB")} />
          <Info label="Last updated" value={new Date(data.updated_at).toLocaleString("en-GB")} />
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          Team Leaders ({data.delegations.reduce(
            (total, delegation) => total + delegation.team_leaders.length,
            0
          )})
        </h2>
        {data.delegations.flatMap((delegation) =>
          delegation.team_leaders.map((leader, index) => (
          <Card key={leader.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {delegation.official_delegation_name} · Leader {index + 1}: {leader.full_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Info label="Badge name" value={leader.badge_name} />
                <Info label="Date of birth" value={leader.date_of_birth} />
                <Info label="Gender" value={leader.gender} />
                <Info label="Role" value={leader.role} />
                <Info label="Passport number" value={leader.passport_number} />
                <Info label="Email" value={leader.email} />
                <Info label="Phone" value={leader.phone_number} />
                <Info label="T-shirt size" value={leader.t_shirt_size} />
                <Info label="Food type" value={leader.food_type} />
                <Info label="Dietary requirements" value={leader.dietary_requirements} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <DocumentLink label="Passport scan" path={leader.passport_scan} />
                <DocumentLink label="ID photo" path={leader.id_photo} />
                <DocumentLink label="Consent form" path={leader.consent_form} />
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          Contestants ({data.delegations.reduce(
            (total, delegation) => total + delegation.contestants.length,
            0
          )})
        </h2>
        {data.delegations.flatMap((delegation) =>
          delegation.contestants.map((contestant, index) => (
          <Card key={contestant.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {delegation.official_delegation_name} · Contestant {index + 1}: {contestant.full_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Info label="Badge name" value={contestant.badge_name} />
                <Info label="Date of birth" value={contestant.date_of_birth} />
                <Info label="Gender" value={contestant.gender} />
                <Info label="Subject" value={contestant.competition_subject} />
                <Info label="Passport number" value={contestant.passport_number} />
                <Info label="Passport expiry" value={contestant.passport_expiry_date} />
                <Info label="T-shirt size" value={contestant.t_shirt_size} />
                <Info label="Food type" value={contestant.food_type} />
                <Info label="Dietary requirements" value={contestant.dietary_requirements} />
                <Info label="Special requirements" value={contestant.special_requirements} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <DocumentLink label="Passport scan" path={contestant.passport_scan} />
                <DocumentLink label="ID photo" path={contestant.id_photo} />
                <DocumentLink label="Commitment form" path={contestant.commitment_form} />
                <DocumentLink label="Consent form" path={contestant.consent_form} />
                <DocumentLink label="Parental consent" path={contestant.parental_consent_form} />
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </section>

      <DeleteDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        onConfirm={handleDelete}
        title="Delete Detailed Registration"
        description="Delete this detailed registration and all associated people and files? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
}
