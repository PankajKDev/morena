import { create } from "zustand";
import { fileToBase64 } from "@/lib/utils";
import { ProfileDataActions, ProfileDataState } from "@/types";
import { GENERAL_DEFAULTS } from "@/constants";

export interface LinkEntry {
  name: string;
  url: string;
}

type ProfileStore = ProfileDataState & ProfileDataActions;

export const useProfileDataStore = create<ProfileStore>()((set) => ({
  ...GENERAL_DEFAULTS,
  setLinkPageName: (v) => void set({ linkPageName: v }),
  setPageUrl: (v) => void set({ pageUrl: v }),
  setDisplayName: (v) => void set({ displayName: v }),
  setAvatar: (v) => void set({ avatar: v }),
  setAvatarFile: async (file) => {
    set({ avatar: file ? await fileToBase64(file) : null });
  },
  setBio: (v) => void set({ bio: v }),
  setLinks: (v) => void set({ links: v }),
  setMusic: (v) => void set({ music: v }),
  setMusicFile: async (file) => {
    set({ music: file ? await fileToBase64(file) : null });
  },
  setMusicVolume: (v) => void set({ musicVolume: v }),
  reset: () => void set(GENERAL_DEFAULTS),
}));
