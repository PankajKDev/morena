"use client";

import { useEffect } from "react";
import { useProfileDataStore } from "@/stores/profileDataStore";
import type { IProfileHydratorData, ProfileCardTheme } from "@/types";
import { Profile } from "./Profile";

interface ProfileHydratorProps {
  data: IProfileHydratorData;
}

function mapTheme(t: ProfileCardTheme) {
  return {
    bodyBg: t.bodyBg,
    bodyBgBlur: t.bodyBgBlur,
    bodyBgOpacity: t.bodyBgOpacity,
    profileBg: t.profileBg,
    profileBgBlur: t.profileBgBlur,
    profileBgOpacity: t.profileBgOpacity,
    textColor: t.textColor,
    headingColor: t.headingColor,
    fontSize: t.fontSize,
    nameFontSize: t.nameFontSize,
    fontFamily: t.fontFamily,
    linkBg: t.linkBg,
    linkBgBlur: t.linkBgBlur,
    linkBgOpacity: t.linkBgOpacity,
    linkColor: t.linkColor,
    linkFontFamily: t.linkFontFamily,
  };
}

const ProfileHydrator = ({ data }: ProfileHydratorProps) => {
  useEffect(() => {
    useProfileDataStore.setState({
      linkPageName: data.linkPagename,
      pageUrl: data.pageUrl,
      displayName: data.displayName,
      avatar: data.avatar,
      bio: data.bio ?? "",
      bodyBgImage: data.bodyBgImage,
      profileBgImage: data.profileBgImage,
      linkBgImage: data.linkBgImage,
      links: data.userlinks ?? [],
      ...mapTheme(data.customTheme),
    });
  }, [data]);

  return <Profile />;
};

export { ProfileHydrator };
