"use client";

import { useState } from "react";
import { Plus, ExternalLink, Edit3, Trash2 } from "lucide-react";
import { CreateLinkModal } from "@/components/shared/Links";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface LinkPage {
  id: string;
  linkPagename: string;
  pageUrl: string;
  createdAt: string;
  updatedAt: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const LinkPageCard = ({ initialPages }: { initialPages: LinkPage[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [pages, setPages] = useState<LinkPage[]>(initialPages);
  const { user } = useUser();

  const handleDelete = async (pageId: string) => {
    const res = await fetch("/api/links", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pageId }),
    });
    if (res.ok) {
      setPages((prev) => prev.filter((p) => p.id !== pageId));
    }
  };
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
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{page.linkPagename}</p>
                <p className="text-xs text-muted-foreground">
                  Created {formatDate(page.createdAt)} · Updated{" "}
                  {formatDate(page.updatedAt)}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/edit/${page.id}`}
                  className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="Edit page"
                >
                  <Edit3 size={15} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(page.id)}
                  className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Delete page"
                >
                  <Trash2 size={15} />
                </button>
                <Link href={`/profile/${user?.username}/${page.pageUrl}`}>
                  <ExternalLink
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateLinkModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {deleteTarget && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold tracking-tight">Delete page</h3>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this page? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl border border-border text-sm font-semibold transition-all hover:bg-accent active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  handleDelete(deleteTarget);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 rounded-xl text-white bg-destructive text-destructive-foreground text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { LinkPageCard };
