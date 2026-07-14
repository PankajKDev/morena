"use client";

import { useState } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { CreateLinkModal } from "@/components/shared/CreateLinkModal";

const MOCK_PAGES = [
  { id: "1", name: "Personal", createdAt: "2025-12-01T10:00:00Z", updatedAt: "2026-01-15T14:30:00Z" },
  { id: "2", name: "Business", createdAt: "2026-02-10T08:00:00Z", updatedAt: "2026-06-20T16:00:00Z" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const LinkPageCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Link pages</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            <Plus size={16} />
            Create link
          </button>
        </div>

        <div className="space-y-2.5">
          {MOCK_PAGES.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{page.name}</p>
                <p className="text-xs text-muted-foreground">
                  Created {formatDate(page.createdAt)} · Updated{" "}
                  {formatDate(page.updatedAt)}
                </p>
              </div>
              <ExternalLink size={16} className="text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <CreateLinkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export { LinkPageCard };
