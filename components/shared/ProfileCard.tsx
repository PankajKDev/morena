"use client";

import Image from "next/image";
import {
  getBodyBgStyle,
  getProfileBgStyle,
  getLinkStyle,
} from "@/lib/styleutils";
import { hexToRgba } from "@/lib/utils";
import { detectSocialLink } from "@/lib/social";
import { ProfileCardData } from "@/types";
import { Link as LinkIcon } from "lucide-react";
import { ProfileMusicPlayer } from "./ProfileMusicPlayer";

const ProfileCard = ({ data }: { data: ProfileCardData }) => {
  const {
    id,
    displayName,
    bio,
    avatar,
    bodyBgImage,
    profileBgImage,
    linkBgImage,
    music,
    musicVolume,
    customTheme: t,
    userlinks = [],
  } = data;

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 md:p-8"
      style={{
        ...getBodyBgStyle(t.bodyBg, bodyBgImage),
        color: t.textColor,
        fontSize: `${t.fontSize}px`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${t.bodyBgBlur}px)`,
          WebkitBackdropFilter: `blur(${t.bodyBgBlur}px)`,
          opacity: t.bodyBgOpacity / 100,
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in duration-500"
        style={{
          ...getProfileBgStyle(t.profileBg, profileBgImage),
          color: t.textColor,
          boxShadow: `0 25px 50px -12px ${hexToRgba(t.profileBg, 0.4)}`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${t.profileBgBlur}px)`,
            WebkitBackdropFilter: `blur(${t.profileBgBlur}px)`,
            opacity: t.profileBgOpacity / 100,
          }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-32 rounded-t-3xl pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(t.textColor, 0.06)}, transparent)`,
          }}
        />

        <div className="relative z-10 p-8 pt-10">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: `${hexToRgba(t.profileBg, 0.3)}` }}
          />
          <div className="relative flex flex-col items-center text-center space-y-5">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full opacity-40 blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${t.headingColor}, ${t.textColor})`,
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
                  color: t.headingColor,
                  fontSize: `${t.nameFontSize}px`,
                  fontFamily: t.fontFamily,
                  textShadow:
                    "0 2px 4px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {displayName}
              </h1>
            )}

            {bio && (
              <p
                className="leading-relaxed max-w-sm"
                style={{
                  color: t.textColor,
                  fontFamily: t.fontFamily,
                  opacity: 0.8,
                  textShadow: "0 1px 2px rgba(0,0,0,0.10)",
                }}
              >
                {bio}
              </p>
            )}

            {userlinks.length > 0 && (
              <div className="w-full pt-3 space-y-3">
                {userlinks.map((link, index) => {
                  const platform = link.url ? detectSocialLink(link.url) : null;
                  const Icon = platform?.icon ?? LinkIcon;
                  return (
                    link.name &&
                    link.url && (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          fetch("/api/click", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              linkId: link.id,
                              pageId: id,
                            }),
                          }).catch((e) => {
                            console.log("error saving data", e);
                          });
                        }}
                        className="group relative flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                        style={getLinkStyle(
                          t.linkBg,
                          linkBgImage,
                          t.linkBgOpacity,
                        )}
                      >
                        <div
                          className="absolute inset-0 transition-opacity duration-300"
                          style={{
                            backdropFilter: `blur(${t.linkBgBlur}px)`,
                            WebkitBackdropFilter: `blur(${t.linkBgBlur}px)`,
                          }}
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${hexToRgba(t.textColor, 0.05)}, transparent)`,
                          }}
                        />
                        <Icon
                          size={16}
                          className="shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            color: t.linkColor,
                            opacity: 0.7,
                            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
                          }}
                        />
                        <span
                          className="font-semibold relative z-10 tracking-tight"
                          style={{
                            color: t.linkColor,
                            fontFamily: t.linkFontFamily,
                            textShadow: "0 1px 3px rgba(0,0,0,0.15)",
                          }}
                        >
                          {link.name}
                        </span>
                      </a>
                    )
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {music && (
        <ProfileMusicPlayer
          src={music}
          volume={musicVolume ?? 50}
          displayName={displayName}
        />
      )}
    </div>
  );
};

export { ProfileCard };
