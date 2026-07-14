"use client";

import { useEffect, useState } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { CreateLinkModal } from "@/components/shared/CreateLinkModal";
import { useAuth, useUser } from "@clerk/nextjs";
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

const LinkPageCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pages, setPages] = useState<LinkPage[]>([]);
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      console.log(json);
      if (res.ok) {
        const list = Array.isArray(json) ? json : (json?.res ?? []);
        setPages(list);
      }
    }

    fetchData();
  }, [userId]);
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
              <Link href={`/profile/${user?.username}/${page.pageUrl}`}>
                <ExternalLink
                  size={16}
                  className="text-muted-foreground shrink-0"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <CreateLinkModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export { LinkPageCard };
