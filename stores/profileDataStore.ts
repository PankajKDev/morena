import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LinkEntry {
  id: string;
  name: string;
  url: string;
}

interface ProfileDataState {
  displayName: string;
  avatar: string | null;
  bio: string;
  links: LinkEntry[];
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

interface ProfileDataActions {
  setDisplayName: (v: string) => void;
  setAvatar: (v: string | null) => void;
  setAvatarFile: (file: File | null) => Promise<void>;
  setBio: (v: string) => void;
  setLinks: (v: LinkEntry[]) => void;
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

type ProfileStore = ProfileDataState & ProfileDataActions;

const DEFAULTS: ProfileDataState = {
  displayName: "",
  avatar: null,
  bio: "",
  links: [],
  bodyBg: "#ffffff",
  bodyBgImage: null,
  bodyBgBlur: 0,
  bodyBgOpacity: 100,
  profileBg: "#ffffff",
  profileBgImage: null,
  profileBgBlur: 0,
  profileBgOpacity: 100,
  textColor: "#000000",
  headingColor: "#000000",
  fontSize: 16,
  nameFontSize: 24,
  fontFamily: "sans-serif",
  linkBg: "#000000",
  linkBgImage: null,
  linkBgBlur: 0,
  linkBgOpacity: 100,
  linkColor: "#000000",
  linkFontFamily: "sans-serif",
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const useProfileDataStore = create<ProfileStore>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setDisplayName: (v) => void set({ displayName: v }),
      setAvatar: (v) => void set({ avatar: v }),
      setAvatarFile: async (file) => { set({ avatar: file ? await fileToBase64(file) : null }); },
      setBio: (v) => void set({ bio: v }),
      setLinks: (v) => void set({ links: v }),
      setBodyBg: (v) => void set({ bodyBg: v }),
      setBodyBgImage: (v) => void set({ bodyBgImage: v }),
      setBodyBgImageFile: async (file) => { set({ bodyBgImage: file ? await fileToBase64(file) : null }); },
      setBodyBgBlur: (v) => void set({ bodyBgBlur: v }),
      setBodyBgOpacity: (v) => void set({ bodyBgOpacity: v }),
      setProfileBg: (v) => void set({ profileBg: v }),
      setProfileBgImage: (v) => void set({ profileBgImage: v }),
      setProfileBgImageFile: async (file) => { set({ profileBgImage: file ? await fileToBase64(file) : null }); },
      setProfileBgBlur: (v) => void set({ profileBgBlur: v }),
      setProfileBgOpacity: (v) => void set({ profileBgOpacity: v }),
      setTextColor: (v) => void set({ textColor: v }),
      setHeadingColor: (v) => void set({ headingColor: v }),
      setFontSize: (v) => void set({ fontSize: v }),
      setNameFontSize: (v) => void set({ nameFontSize: v }),
      setFontFamily: (v) => void set({ fontFamily: v }),
      setLinkBg: (v) => void set({ linkBg: v }),
      setLinkBgImage: (v) => void set({ linkBgImage: v }),
      setLinkBgImageFile: async (file) => { set({ linkBgImage: file ? await fileToBase64(file) : null }); },
      setLinkBgBlur: (v) => void set({ linkBgBlur: v }),
      setLinkBgOpacity: (v) => void set({ linkBgOpacity: v }),
      setLinkColor: (v) => void set({ linkColor: v }),
      setLinkFontFamily: (v) => void set({ linkFontFamily: v }),
      reset: () => void set(DEFAULTS),
    }),
    { name: "profile-data-store" },
  ),
);
