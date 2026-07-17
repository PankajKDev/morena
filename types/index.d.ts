export interface Feature {
  text: string;
  included: boolean;
}

export interface ProfileCardLink {
  name: string;
  url: string;
}

export interface ProfileCardTheme {
  bodyBg: string;
  bodyBgBlur: number;
  bodyBgOpacity: number;
  profileBg: string;
  profileBgBlur: number;
  profileBgOpacity: number;
  textColor: string;
  headingColor: string;
  fontSize: number;
  nameFontSize: number;
  fontFamily: string;
  linkBg: string;
  linkBgBlur: number;
  linkBgOpacity: number;
  linkColor: string;
  linkFontFamily: string;
}

export interface ProfileCardData {
  displayName: string;
  bio: string | null;
  avatar: string | null;
  music: string | null;
  musicVolume: number | null;
  bodyBgImage: string | null;
  profileBgImage: string | null;
  linkBgImage: string | null;
  customTheme: ProfileCardTheme;
  userlinks?: ProfileCardLink[];
}

export interface ProfileCardProps {
  data?: ProfileCardData;
}

export type MappedLink = {
  name: string;
  url: string;
  totalClicks: number;
};

export interface IProfileHydratorData {
  id: string;
  linkPagename: string;
  pageUrl: string;
  displayName: string;
  bio: string | null;
  avatar: string | null;
  bodyBgImage: string | null;
  profileBgImage: string | null;
  linkBgImage: string | null;
  customTheme: ProfileCardTheme;
  userlinks: { name: string; url: string; totalClicks: number }[];
  ownerId: string;
}

export interface CssDataState {
  bodyBg: string;
  bodyBgImage: string | null;
  bodyBgBlur: number;
  bodyBgOpacity: number;
  profileBg: string;
  profileBgImage: string | null;
  profileBgBlur: number;
  profileBgOpacity: number;
  textColor: string;
  headingColor: string;
  fontSize: number;
  nameFontSize: number;
  fontFamily: string;
  linkBg: string;
  linkBgImage: string | null;
  linkBgBlur: number;
  linkBgOpacity: number;
  linkColor: string;
  linkFontFamily: string;
}

export interface CssDataActions {
  setBodyBg: (v: string) => void;
  setBodyBgImage: (v: string | null) => void;
  setBodyBgImageFile: (file: File | null) => Promise<void>;
  setBodyBgBlur: (v: number) => void;
  setBodyBgOpacity: (v: number) => void;
  setProfileBg: (v: string) => void;
  setProfileBgImage: (v: string | null) => void;
  setProfileBgImageFile: (file: File | null) => Promise<void>;
  setProfileBgBlur: (v: number) => void;
  setProfileBgOpacity: (v: number) => void;
  setTextColor: (v: string) => void;
  setHeadingColor: (v: string) => void;
  setFontSize: (v: number) => void;
  setNameFontSize: (v: number) => void;
  setFontFamily: (v: string) => void;
  setLinkBg: (v: string) => void;
  setLinkBgImage: (v: string | null) => void;
  setLinkBgImageFile: (file: File | null) => Promise<void>;
  setLinkBgBlur: (v: number) => void;
  setLinkBgOpacity: (v: number) => void;
  setLinkColor: (v: string) => void;
  setLinkFontFamily: (v: string) => void;
  reset: () => void;
}

export interface ProfileDataState {
  linkPageName: string;
  pageUrl: string;
  displayName: string;
  avatar: string | null;
  bio: string;
  links: LinkEntry[];
  music: string | null;
  musicVolume: number;
}

export interface ProfileDataActions {
  setLinkPageName: (v: string) => void;
  setPageUrl: (v: string) => void;
  setDisplayName: (v: string) => void;
  setAvatar: (v: string | null) => void;
  setAvatarFile: (file: File | null) => Promise<void>;
  setBio: (v: string) => void;
  setLinks: (v: LinkEntry[]) => void;
  setMusic: (v: string | null) => void;
  setMusicFile: (file: File | null) => Promise<void>;
  setMusicVolume: (v: number) => void;
  reset: () => void;
}
