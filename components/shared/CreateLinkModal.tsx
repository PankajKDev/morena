"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useProfile } from "@/components/shared/profile-context";
import { useRouter } from "next/navigation";

interface CreateLinkModalProps {
  open: boolean;
  onClose: () => void;
}

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

const CreateLinkModal = ({ open, onClose }: CreateLinkModalProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const setLinkPageName = useProfile((s) => s.setLinkPageName);

  if (!open) return null;

  const handleSubmit = () => {
    const cleaned = sanitize(value);

    if (!cleaned) {
      setError("Name cannot be empty");
      return;
    }

    if (cleaned.length > 100) {
      setError("Name must be 100 characters or less");
      return;
    }

    setLinkPageName(cleaned);
    setError("");
    setValue("");
    onClose();
    router.push("/create/linkpage");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-black/5">
          <h2 className="text-lg font-bold tracking-tight">Create link page</h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Page name</label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              placeholder="e.g. My Links"
              maxLength={100}
              className="w-full px-3 py-2.5 rounded-xl border border-input bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-black/5">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-white text-foreground text-sm font-semibold transition-all duration-200 hover:bg-accent active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export { CreateLinkModal };
