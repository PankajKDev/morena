import { hexToRgba } from "@/lib/utils";

export function getBodyBgStyle(color: string, image: string | null) {
  return image
    ? { backgroundImage: `url(${image})`, backgroundSize: "cover" as const, backgroundPosition: "center" as const }
    : { backgroundColor: color };
}

export function getProfileBgStyle(color: string, image: string | null) {
  return image
    ? { backgroundImage: `url(${image})`, backgroundSize: "cover" as const, backgroundPosition: "center" as const }
    : { backgroundColor: color };
}

export function getLinkStyle(linkBg: string, linkBgImage: string | null, linkBgOpacity: number) {
  const base: Record<string, string> = { backgroundColor: linkBg };
  if (!linkBgImage) return base;
  const overlay = hexToRgba(linkBg, linkBgOpacity / 100);
  return {
    ...base,
    backgroundImage: `linear-gradient(${overlay}, ${overlay}), url(${linkBgImage})`,
    backgroundSize: "cover" as const,
    backgroundPosition: "center" as const,
  };
}
