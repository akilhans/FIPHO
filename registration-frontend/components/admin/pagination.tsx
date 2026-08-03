"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  count: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  count,
  page,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(count / pageSize);
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, count);

  if (count === 0) return null;

  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm text-muted-foreground">
        Showing {from}-{to} of {count}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
