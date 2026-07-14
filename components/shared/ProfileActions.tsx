"use client";

import { useProfileDataStore } from "@/stores/profileDataStore";
import { uploadBase64 } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

const IMAGE_FIELDS = [
  "avatar",
  "bodyBgImage",
  "profileBgImage",
  "linkBgImage",
] as const;

function isBase64(v: string | null): v is string {
  return v !== null && v.startsWith("data:");
}

const ProfileActions = () => {
  const reset = useProfileDataStore((s) => s.reset);

  const handleSubmit = async () => {
    const state = useProfileDataStore.getState();
    const uploads: Promise<void>[] = [];

    for (const field of IMAGE_FIELDS) {
      const value = state[field];
      if (!isBase64(value)) continue;

      uploads.push(
        uploadBase64(value).then((url) => {
          if (url) useProfileDataStore.setState({ [field]: url });
        }),
      );
    }

    await Promise.all(uploads);

    const final = useProfileDataStore.getState();
    const { displayName, avatar, bio, links, ...css } = final;

    // DB logic goes here
    console.log({ displayName, avatar, bio, links, css });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <button
        onClick={reset}
        className="px-5 py-2.5 rounded-2xl border border-border bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 shadow-lg"
      >
        Reset
      </button>
      <button
        onClick={handleSubmit}
        className="px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 shadow-lg"
      >
        Save
      </button>
    </div>
  );
};

export { ProfileActions };
