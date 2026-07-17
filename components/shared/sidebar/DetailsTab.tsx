"use client";

import Image from "next/image";
import { User, Link as LinkIcon, X, Plus } from "lucide-react";
import { useProfile } from "@/components/shared/profile-context";
import { fileToBase64 } from "@/lib/utils";

const DetailsTab = () => {
  const {
    displayName, avatar, bio, links,
    setDisplayName, setAvatar, setBio, setLinks,
  } = useProfile();

  const addLink = () => {
    setLinks([...links, { name: "", url: "" }]);
  };

  const updateLink = (index: number, field: "name" | "url", value: string) => {
    setLinks(
      links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    );
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Display name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter display name"
          className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Avatar</label>
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full border-2 border-dashed border-input flex items-center justify-center text-muted-foreground overflow-hidden bg-background shrink-0 relative">
            {avatar ? (
              <Image
                src={avatar}
                alt="Avatar preview"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <User size={20} />
            )}
          </div>
          <label className="flex-1 cursor-pointer">
            <span className="inline-flex items-center justify-center w-full px-3 py-2 rounded-xl border border-input bg-background text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
              {avatar ? "Change image" : "Upload image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) fileToBase64(file).then(setAvatar);
                e.target.value = "";
              }}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a short bio..."
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Links</label>
          <button
            onClick={addLink}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus size={14} />
            Add link
          </button>
        </div>
        {links.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No links added yet.
          </p>
        )}
        {links.map((link, index) => (
          <div
            key={index}
            className="relative p-3 rounded-xl border border-input bg-background space-y-2"
          >
            <button
              onClick={() => removeLink(index)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove link"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-2">
              <LinkIcon
                size={14}
                className="text-muted-foreground shrink-0"
              />
              <input
                type="text"
                value={link.name}
                onChange={(e) =>
                  updateLink(index, "name", e.target.value)
                }
                placeholder="Link name"
                className="flex-1 px-2 py-1.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
              />
            </div>
            <input
              type="url"
              value={link.url}
              onChange={(e) =>
                updateLink(index, "url", e.target.value)
              }
              placeholder="https://example.com"
              className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export { DetailsTab };
