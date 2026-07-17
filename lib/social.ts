import { SOCIAL_PLATFORMS } from "@/constants";

export function detectSocialLink(url: string) {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return SOCIAL_PLATFORMS[hostname] ?? null;
  } catch {
    return null;
  }
}
