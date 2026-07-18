"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useProfile } from "@/components/shared/profile-context";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

interface CreateLinkModalProps {
  open: boolean;
  onClose: () => void;
}

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

const URL_PATTERN = /^[a-zA-Z]+$/;

const CreateLinkModal = ({ open, onClose }: CreateLinkModalProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setLinkPageName = useProfile((s) => s.setLinkPageName);
  const setPageUrl = useProfile((s) => s.setPageUrl);
  const setPageId = useProfile((s) => s.setPageId);
  const { user } = useUser();

  if (!open) return null;

  const handleSubmit = async () => {
    const cleanedName = sanitize(name);
    const cleanedUrl = sanitize(url);

    if (!cleanedName) {
      setError("Page name cannot be empty");
      return;
    }

    if (cleanedName.length > 100) {
      setError("Page name must be 100 characters or less");
      return;
    }

    if (!cleanedUrl) {
      setError("Page URL cannot be empty");
      return;
    }

    if (!URL_PATTERN.test(cleanedUrl)) {
      setError("Page URL must start with a letter and contain only letters");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/create-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        linkPageName: cleanedName,
        pageUrl: cleanedUrl,
        userId: user?.id,
        ownerUsername: user?.username,
      }),
    });

    if (res.status === 409) {
      setLoading(false);
      toast.error("A page with this URL or name already exists.");
      return;
    }

    if (!res.ok) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
      return;
    }

    const data = await res.json();
    setPageId(data.pageId);
    setLinkPageName(cleanedName);
    setPageUrl(cleanedUrl);
    setName("");
    setUrl("");
    onClose();
    router.push("/create/linkpage");
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold tracking-tight">Create link page</h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Page name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. My Links"
              maxLength={100}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Page URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="e.g. mylinks"
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-semibold transition-all duration-200 hover:bg-accent active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { CreateLinkModal };
