"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Palette,
  Link as LinkIcon,
  X,
  Plus,
} from "lucide-react";
import { useProfile } from "@/components/shared/profile-context";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { fileToBase64 } from "@/lib/utils";

type Tab = "details" | "css";

const FONT_OPTIONS = [
  { label: "Sans-serif", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "System UI", value: "system-ui" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("details");

  const {
    displayName, avatar, bio, links,
    bodyBg, bodyBgImage, bodyBgBlur, bodyBgOpacity,
    profileBg, profileBgImage, profileBgBlur, profileBgOpacity,
    textColor, headingColor, fontSize, nameFontSize, fontFamily,
    linkBg, linkBgImage, linkBgBlur, linkBgOpacity, linkColor, linkFontFamily,
    setDisplayName, setAvatar, setBio, setLinks,
    setBodyBg, setBodyBgImage, setBodyBgBlur, setBodyBgOpacity,
    setProfileBg, setProfileBgImage, setProfileBgBlur, setProfileBgOpacity,
    setTextColor, setHeadingColor, setFontSize, setNameFontSize, setFontFamily,
    setLinkBg, setLinkBgImage, setLinkBgBlur, setLinkBgOpacity, setLinkColor, setLinkFontFamily,
  } = useProfile();

  const addLink = () => {
    setLinks([...links, { name: "", url: "" }]);
  };

  const updateLink = (index: number, field: "name" | "url", value: string) => {
    setLinks(
      links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    );
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const tabs: { key: Tab; label: string; icon: typeof User }[] = [
    { key: "details", label: "Details", icon: User },
    { key: "css", label: "CSS", icon: Palette },
  ];

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-50 flex items-center justify-center size-10 rounded-xl border bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-200 hover:scale-105"
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        {open ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 h-full border-r bg-sidebar text-sidebar-foreground transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full w-80 overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-bold tracking-tight">Settings</h2>
          </div>

          <div className="flex border-b border-sidebar-border">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  tab === key
                    ? "bg-accent text-accent-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 space-y-5">
            {tab === "details" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter display name"
                    className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Avatar</label>
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full border-2 border-dashed border-input flex items-center justify-center text-muted-foreground overflow-hidden bg-background shrink-0 relative">
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt="Avatar preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <label className="flex-1 cursor-pointer">
                      <span className="inline-flex items-center justify-center w-full px-3 py-2 rounded-xl border border-input bg-background text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                        {avatar ? "Change image" : "Upload image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) fileToBase64(file).then(setAvatar);
                          e.target.value = "";
                        }}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write a short bio..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Links</label>
                    <button
                      onClick={addLink}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus size={14} />
                      Add link
                    </button>
                  </div>
                  {links.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No links added yet.
                    </p>
                  )}
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className="relative p-3 rounded-xl border border-input bg-background space-y-2"
                    >
                      <button
                        onClick={() => removeLink(index)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove link"
                      >
                        <X size={14} />
                      </button>
                      <div className="flex items-center gap-2">
                        <LinkIcon
                          size={14}
                          className="text-muted-foreground shrink-0"
                        />
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) =>
                            updateLink(index, "name", e.target.value)
                          }
                          placeholder="Link name"
                          className="flex-1 px-2 py-1.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                        />
                      </div>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) =>
                          updateLink(index, "url", e.target.value)
                        }
                        placeholder="https://example.com"
                        className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Page Background
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={bodyBg}
                        onChange={(e) => setBodyBg(e.target.value)}
                        className="size-10 rounded-xl border border-input cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {bodyBg}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background image</label>
                    <ImageUpload value={bodyBgImage} onChange={setBodyBgImage} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Blur</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {bodyBgBlur}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      value={bodyBgBlur}
                      onChange={(e) => setBodyBgBlur(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Opacity</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {bodyBgOpacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={bodyBgOpacity}
                      onChange={(e) => setBodyBgOpacity(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="border-t border-sidebar-border" />

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Profile Card
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={profileBg}
                        onChange={(e) => setProfileBg(e.target.value)}
                        className="size-10 rounded-xl border border-input cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {profileBg}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background image</label>
                    <ImageUpload value={profileBgImage} onChange={setProfileBgImage} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Blur</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {profileBgBlur}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      value={profileBgBlur}
                      onChange={(e) => setProfileBgBlur(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Opacity</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {profileBgOpacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={profileBgOpacity}
                      onChange={(e) => setProfileBgOpacity(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="border-t border-sidebar-border" />

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Typography
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="size-10 rounded-xl border border-input cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {textColor}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Heading color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={headingColor}
                        onChange={(e) => setHeadingColor(e.target.value)}
                        className="size-10 rounded-xl border border-input cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {headingColor}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Base font size</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {fontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={24}
                      step={1}
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Name size</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {nameFontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={16}
                      max={48}
                      step={1}
                      value={nameFontSize}
                      onChange={(e) => setNameFontSize(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Font family</label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                    >
                      {FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-sidebar-border" />

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Links
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={linkBg}
                        onChange={(e) => setLinkBg(e.target.value)}
                        className="size-10 rounded-xl border border-input cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {linkBg}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background image</label>
                    <ImageUpload value={linkBgImage} onChange={setLinkBgImage} />
                    {linkBgImage && (
                      <p className="text-xs text-muted-foreground">
                        Color acts as overlay when both are set
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Blur</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {linkBgBlur}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={1}
                      value={linkBgBlur}
                      onChange={(e) => setLinkBgBlur(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Opacity</label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {linkBgOpacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={linkBgOpacity}
                      onChange={(e) => setLinkBgOpacity(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={linkColor}
                        onChange={(e) => setLinkColor(e.target.value)}
                        className="size-10 rounded-xl border border-input cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {linkColor}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Font family</label>
                    <select
                      value={linkFontFamily}
                      onChange={(e) => setLinkFontFamily(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                    >
                      {FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
export { Sidebar };
