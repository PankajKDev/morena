"use client";

import { useState } from "react";
import { useProfileDataStore } from "@/stores/profileDataStore";
import { useCssDataStore } from "@/stores/cssDataStore";
import { uploadBase64 } from "@/lib/cloudinary";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isBase64 } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const CONTENT_IMAGE_FIELDS = ["avatar"] as const;
const CSS_IMAGE_FIELDS = [
  "bodyBgImage",
  "profileBgImage",
  "linkBgImage",
] as const;

const ProfileActions = ({ pageId }: { pageId: string }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const resetProfile = useProfileDataStore((s) => s.reset);
  const resetCss = useCssDataStore((s) => s.reset);

  const handleSubmit = async () => {
    setLoading(true);
    const profileState = useProfileDataStore.getState();
    const cssState = useCssDataStore.getState();
    const uploads: Promise<void>[] = [];
    const musicValue = profileState.music;

    for (const field of CONTENT_IMAGE_FIELDS) {
      const value = profileState[field];
      if (!isBase64(value)) continue;

      uploads.push(
        uploadBase64({ base64: value, assetType: "image" }).then((url) => {
          if (url) useProfileDataStore.setState({ [field]: url });
        }),
      );
    }

    if (musicValue && isBase64(musicValue)) {
      uploads.push(
        uploadBase64({ base64: musicValue, assetType: "video" }).then((url) => {
          if (url) {
            useProfileDataStore.setState({ music: url });
          }
        }),
      );
    }

    for (const field of CSS_IMAGE_FIELDS) {
      const value = cssState[field];
      if (!isBase64(value)) continue;

      uploads.push(
        uploadBase64({ base64: value, assetType: "image" }).then((url) => {
          if (url) useCssDataStore.setState({ [field]: url });
        }),
      );
    }

    await Promise.all(uploads);

    const finalProfile = useProfileDataStore.getState();
    const finalCss = useCssDataStore.getState();
    const {
      linkPageName,
      displayName,
      avatar,
      pageUrl,
      bio,
      links,
      music,
      musicVolume,
    } = finalProfile;
    const { bodyBgImage, profileBgImage, linkBgImage } = finalCss;

    const customTheme = {
      bodyBg: finalCss.bodyBg,
      bodyBgBlur: finalCss.bodyBgBlur,
      bodyBgOpacity: finalCss.bodyBgOpacity,
      profileBg: finalCss.profileBg,
      profileBgBlur: finalCss.profileBgBlur,
      profileBgOpacity: finalCss.profileBgOpacity,
      textColor: finalCss.textColor,
      headingColor: finalCss.headingColor,
      fontSize: finalCss.fontSize,
      nameFontSize: finalCss.nameFontSize,
      fontFamily: finalCss.fontFamily,
      linkBg: finalCss.linkBg,
      linkBgBlur: finalCss.linkBgBlur,
      linkBgOpacity: finalCss.linkBgOpacity,
      linkColor: finalCss.linkColor,
      linkFontFamily: finalCss.linkFontFamily,
    };

    const res = await fetch("/api/create-page", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageId,
        linkPageName,
        pageUrl,
        displayName,
        bio,
        avatar,
        bodyBgImage,
        profileBgImage,
        linkBgImage,
        music,
        musicVolume,
        userId: user?.id,
        ownerUsername: user?.username,
        customTheme,
        links,
      }),
    });
    if (res.ok) {
      resetProfile();
      resetCss();
      router.push("/links");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <button
        onClick={() => {
          resetProfile();
          resetCss();
        }}
        disabled={loading}
        className="px-5 py-2.5 rounded-2xl border border-border bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:pointer-events-none"
      >
        Reset
      </button>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export { ProfileActions };
