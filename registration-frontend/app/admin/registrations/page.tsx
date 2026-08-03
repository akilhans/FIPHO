"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { DetailedRegistration, PaginatedResponse } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/admin/pagination";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Download, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const PAGE_SIZE = 50;

export default function RegistrationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [data, setData] = useState<PaginatedResponse<DetailedRegistration> | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/detailed-registrations/?page=${page}`);
      if (res.ok) {
        setData(await res.json());
      } else {
        toast.error("Failed to load registrations");
      }
    } catch {
      toast.error("Failed to load registrations");
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
      const res = await apiFetch(`/api/detailed-registrations/${deleteId}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Registration deleted");
        setDeleteId(null);
        if (data && data.results.length === 1 && page > 1) {
          router.push(`/admin/registrations?page=${page - 1}`);
        } else {
          fetchData();
        }
      } else {
        toast.error("Failed to delete registration");
      }
    } catch {
      toast.error("Failed to delete registration");
    }
    setDeleting(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Detailed Registrations</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={exporting || loading}
            onClick={async () => {
              setExporting(true);
              try {
                const res = await apiFetch("/api/detailed-registrations/export/");
                if (res.ok) {
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "detailed-registrations.xlsx";
                  a.click();
                  URL.revokeObjectURL(url);
                } else {
                  toast.error("Failed to export data");
                }
              } catch {
                toast.error("Failed to export data");
              } finally {
                setExporting(false);
              }
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            {exporting ? "Exporting..." : "Export XLSX"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : data && data.results.length > 0 ? (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Delegations</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-center">Teams</TableHead>
                  <TableHead className="text-center">Team Leaders</TableHead>
                  <TableHead className="text-center">Contestants</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.results.map((reg) => (
                  <TableRow
                    key={reg.id}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/admin/registrations/${reg.id}`)
                    }
                  >
                    <TableCell className="font-medium">
                      {reg.delegations
                        .map((delegation) => delegation.official_delegation_name)
                        .join(", ")}
                    </TableCell>
                    <TableCell>{reg.country.name}</TableCell>
                    <TableCell className="text-center">
                      {reg.number_of_teams}
                    </TableCell>
                    <TableCell className="text-center">
                      {reg.delegations.reduce(
                        (total, delegation) =>
                          total + delegation.team_leaders.length,
                        0
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {reg.delegations.reduce(
                        (total, delegation) =>
                          total + delegation.contestants.length,
                        0
                      )}
                    </TableCell>
                    <TableCell>{formatDate(reg.created_at)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(reg.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
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
            onPageChange={(p) => router.push(`/admin/registrations?page=${p}`)}
          />
        </>
      ) : (
        <p className="text-muted-foreground">No registrations found.</p>
      )}

      <DeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Registration"
        description="Are you sure you want to delete this detailed registration and all associated people and files? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
}
