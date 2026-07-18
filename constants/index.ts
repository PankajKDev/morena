import { CssDataState, ProfileCardTheme, ProfileDataState } from "@/types";
import {
  Camera,
  Code,
  Play,
  Music,
  Briefcase,
  MessageCircle,
  Gamepad2,
  Headphones,
  Send,
} from "lucide-react";

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

export const SOCIAL_PLATFORMS: Record<
  string,
  { name: string; icon: typeof Camera; color: string }
> = {
  "instagram.com": { name: "Instagram", icon: Camera, color: "#E4405F" },
  "x.com": { name: "X", icon: MessageCircle, color: "#000000" },
  "twitter.com": { name: "X", icon: MessageCircle, color: "#000000" },
  "youtube.com": { name: "YouTube", icon: Play, color: "#FF0000" },
  "youtu.be": { name: "YouTube", icon: Play, color: "#FF0000" },
  "github.com": { name: "GitHub", icon: Code, color: "#333" },
  "tiktok.com": { name: "TikTok", icon: Music, color: "#000000" },
  "linkedin.com": { name: "LinkedIn", icon: Briefcase, color: "#0A66C2" },
  "discord.gg": { name: "Discord", icon: MessageCircle, color: "#5865F2" },
  "discord.com": { name: "Discord", icon: MessageCircle, color: "#5865F2" },
  "twitch.tv": { name: "Twitch", icon: Gamepad2, color: "#9146FF" },
  "spotify.com": { name: "Spotify", icon: Headphones, color: "#1DB954" },
  "t.me": { name: "Telegram", icon: Send, color: "#0088cc" },
};

export const THEMEFALLBACK: ProfileCardTheme = {
  bodyBg: "#ffffff",
  bodyBgBlur: 0,
  bodyBgOpacity: 100,
  profileBg: "#ffffff",
  profileBgBlur: 0,
  profileBgOpacity: 100,
  textColor: "#000000",
  headingColor: "#000000",
  fontSize: 16,
  nameFontSize: 24,
  fontFamily: "sans-serif",
  linkBg: "#000000",
  linkBgBlur: 0,
  linkBgOpacity: 100,
  linkColor: "#000000",
  linkFontFamily: "sans-serif",
};
