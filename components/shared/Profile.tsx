"use client";

import Image from "next/image";
import { useProfile } from "@/components/shared/profile-context";
import { Link as LinkIcon } from "lucide-react";

const Profile = () => {
  const displayName = useProfile((s) => s.displayName);
  const avatar = useProfile((s) => s.avatar);
  const bio = useProfile((s) => s.bio);
  const links = useProfile((s) => s.links);
  const bodyBg = useProfile((s) => s.bodyBg);
  const bodyBgImage = useProfile((s) => s.bodyBgImage);
  const bodyBgBlur = useProfile((s) => s.bodyBgBlur);
  const bodyBgOpacity = useProfile((s) => s.bodyBgOpacity);
  const profileBg = useProfile((s) => s.profileBg);
  const profileBgImage = useProfile((s) => s.profileBgImage);
  const profileBgBlur = useProfile((s) => s.profileBgBlur);
  const profileBgOpacity = useProfile((s) => s.profileBgOpacity);
  const textColor = useProfile((s) => s.textColor);
  const headingColor = useProfile((s) => s.headingColor);
  const fontSize = useProfile((s) => s.fontSize);
  const nameFontSize = useProfile((s) => s.nameFontSize);
  const fontFamily = useProfile((s) => s.fontFamily);
  const linkBg = useProfile((s) => s.linkBg);
  const linkBgImage = useProfile((s) => s.linkBgImage);
  const linkBgBlur = useProfile((s) => s.linkBgBlur);
  const linkBgOpacity = useProfile((s) => s.linkBgOpacity);
  const linkColor = useProfile((s) => s.linkColor);
  const linkFontFamily = useProfile((s) => s.linkFontFamily);

  const bodyBgStyle = bodyBgImage
    ? {
        backgroundImage: `url(${bodyBgImage})`,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
      }
    : { backgroundColor: bodyBg };

  const profileBgStyle = profileBgImage
    ? {
        backgroundImage: `url(${profileBgImage})`,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
      }
    : { backgroundColor: profileBg };

  const getLinkStyle = () => {
    const base: Record<string, string> = {
      backgroundColor: linkBg,
    };
    if (!linkBgImage) return base;
    const overlayRgba = hexToRgba(linkBg, linkBgOpacity / 100);
    return {
      ...base,
      backgroundImage: `linear-gradient(${overlayRgba}, ${overlayRgba}), url(${linkBgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 md:p-8"
      style={{
        ...bodyBgStyle,
        color: textColor,
        fontSize: `${fontSize}px`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${bodyBgBlur}px)`,
          WebkitBackdropFilter: `blur(${bodyBgBlur}px)`,
          opacity: bodyBgOpacity / 100,
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in duration-500"
        style={{
          ...profileBgStyle,
          color: textColor,
          boxShadow: `0 25px 50px -12px ${hexToRgba(profileBg, 0.4)}`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${profileBgBlur}px)`,
            WebkitBackdropFilter: `blur(${profileBgBlur}px)`,
            opacity: profileBgOpacity / 100,
          }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-32 rounded-t-3xl pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(textColor, 0.06)}, transparent)`,
          }}
        />

        <div className="relative z-10 p-8 pt-10">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full opacity-40 blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${headingColor}, ${textColor})`,
                }}
              />
              <div className="size-24 rounded-full border-[3px] border-white/60 overflow-hidden shadow-xl bg-muted/50 shrink-0 relative">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt="Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                  <div className="size-full flex items-center justify-center bg-linear-to-br from-muted to-muted/50 text-muted-foreground text-2xl font-bold">
                    ?
                  </div>
                )}
              </div>
            </div>

            {displayName && (
              <h1
                className="font-extrabold tracking-tight leading-tight"
                style={{
                  color: headingColor,
                  fontSize: `${nameFontSize}px`,
                  fontFamily,
                  textShadow: "0 1px 3px rgba(0,0,0,0.12)",
                }}
              >
                {displayName}
              </h1>
            )}

            {bio && (
              <p
                className="leading-relaxed max-w-sm"
                style={{
                  color: textColor,
                  fontFamily,
                  opacity: 0.8,
                  textShadow: "0 1px 2px rgba(0,0,0,0.10)",
                }}
              >
                {bio}
              </p>
            )}

            {links.length > 0 && (
              <div className="w-full pt-3 space-y-3">
                {links.map(
                  (link) =>
                    link.name &&
                    link.url && (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                        style={getLinkStyle()}
                      >
                        <div
                          className="absolute inset-0 transition-opacity duration-300"
                          style={{
                            backdropFilter: `blur(${linkBgBlur}px)`,
                            WebkitBackdropFilter: `blur(${linkBgBlur}px)`,
                          }}
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${hexToRgba(textColor, 0.05)}, transparent)`,
                          }}
                        />
                        <LinkIcon
                          size={16}
                          className="shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: linkColor, opacity: 0.7, textShadow: "0 1px 2px rgba(0,0,0,0.10)" }}
                        />
                        <span
                          className="font-semibold relative z-10 tracking-tight"
                          style={{
                            color: linkColor,
                            fontFamily: linkFontFamily,
                            textShadow: "0 1px 2px rgba(0,0,0,0.10)",
                          }}
                        >
                          {link.name}
                        </span>
                      </a>
                    ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export { Profile };
