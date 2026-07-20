"use client";

import { useCssDataStore } from "@/stores/cssDataStore";
import { ImageUpload } from "@/components/shared/Editor";

const FONT_OPTIONS = [
  { label: "Sans-serif", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "System UI", value: "system-ui" },
];

const CssTab = () => {
  const {
    bodyBg,
    bodyBgImage,
    bodyBgBlur,
    bodyBgOpacity,
    profileBg,
    profileBgImage,
    profileBgBlur,
    profileBgOpacity,
    textColor,
    headingColor,
    fontSize,
    nameFontSize,
    fontFamily,
    linkBg,
    linkBgImage,
    linkBgBlur,
    linkBgOpacity,
    linkColor,
    linkFontFamily,
    setBodyBg,
    setBodyBgImage,
    setBodyBgBlur,
    setBodyBgOpacity,
    setProfileBg,
    setProfileBgImage,
    setProfileBgBlur,
    setProfileBgOpacity,
    setTextColor,
    setHeadingColor,
    setFontSize,
    setNameFontSize,
    setFontFamily,
    setLinkBg,
    setLinkBgImage,
    setLinkBgBlur,
    setLinkBgOpacity,
    setLinkColor,
    setLinkFontFamily,
  } = useCssDataStore();

  return (
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
  );
};

export { CssTab };
