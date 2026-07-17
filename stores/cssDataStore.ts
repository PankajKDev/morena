import { create } from "zustand";
import { fileToBase64 } from "@/lib/utils";
import { CssDataActions, CssDataState } from "@/types";
import { CSS_DEFAULTS } from "@/constants";

type CssStore = CssDataState & CssDataActions;

export const useCssDataStore = create<CssStore>()((set) => ({
  ...CSS_DEFAULTS,
  setBodyBg: (v) => void set({ bodyBg: v }),
  setBodyBgImage: (v) => void set({ bodyBgImage: v }),
  setBodyBgImageFile: async (file) => {
    set({ bodyBgImage: file ? await fileToBase64(file) : null });
  },
  setBodyBgBlur: (v) => void set({ bodyBgBlur: v }),
  setBodyBgOpacity: (v) => void set({ bodyBgOpacity: v }),
  setProfileBg: (v) => void set({ profileBg: v }),
  setProfileBgImage: (v) => void set({ profileBgImage: v }),
  setProfileBgImageFile: async (file) => {
    set({ profileBgImage: file ? await fileToBase64(file) : null });
  },
  setProfileBgBlur: (v) => void set({ profileBgBlur: v }),
  setProfileBgOpacity: (v) => void set({ profileBgOpacity: v }),
  setTextColor: (v) => void set({ textColor: v }),
  setHeadingColor: (v) => void set({ headingColor: v }),
  setFontSize: (v) => void set({ fontSize: v }),
  setNameFontSize: (v) => void set({ nameFontSize: v }),
  setFontFamily: (v) => void set({ fontFamily: v }),
  setLinkBg: (v) => void set({ linkBg: v }),
  setLinkBgImage: (v) => void set({ linkBgImage: v }),
  setLinkBgImageFile: async (file) => {
    set({ linkBgImage: file ? await fileToBase64(file) : null });
  },
  setLinkBgBlur: (v) => void set({ linkBgBlur: v }),
  setLinkBgOpacity: (v) => void set({ linkBgOpacity: v }),
  setLinkColor: (v) => void set({ linkColor: v }),
  setLinkFontFamily: (v) => void set({ linkFontFamily: v }),
  reset: () => void set(CSS_DEFAULTS),
}));
