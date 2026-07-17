import { CssDataState, ProfileDataState } from "@/types";

export const CSS_DEFAULTS: CssDataState = {
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

export const GENERAL_DEFAULTS: ProfileDataState = {
  linkPageName: "a very cool name",
  pageUrl: "",
  displayName: "",
  avatar: null,
  bio: "",
  links: [],
  music: null,
  musicVolume: 50,
};
