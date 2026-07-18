"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Crop, ZoomIn, Check, X } from "lucide-react";

interface ImageCropModalProps {
  open: boolean;
  image: string;
  onConfirm: (cropped: string) => void;
  onCancel: () => void;
}

const ImageCropModal = ({
  open,
  image,
  onConfirm,
  onCancel,
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState(0);
  const [zoom, setZoom] = useState(100);

  const processImage = (): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const ratio = crop / 100;
        const cx = (img.width * ratio) / 2;
        const cy = (img.height * ratio) / 2;
        const cw = img.width - cx * 2;
        const ch = img.height - cy * 2;
        const zr = zoom / 100;
        canvas.width = Math.round(cw * zr);
        canvas.height = Math.round(ch * zr);
        ctx.drawImage(img, cx, cy, cw, ch, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL());
      };
      img.src = image;
    });

  const handleConfirm = async () => {
    const cropped = await processImage();
    onConfirm(cropped);
  };

  if (!open) return null;

  const overlayOpacity = 0.5;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold tracking-tight">Adjust image</h2>
          <button
            onClick={onCancel}
            className="size-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div
            className="relative rounded-2xl overflow-hidden bg-muted flex items-center justify-center"
            style={{ aspectRatio: "4 / 3" }}
          >
            <NextImage
              src={image}
              alt="Preview"
              width={400}
              height={300}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom / 100})` }}
              unoptimized
            />
            {/* Crop overlay */}
            {crop > 0 && (
              <>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: `inset(${crop / 2}% ${crop / 2}% ${crop / 2}% ${crop / 2}%)`,
                    boxShadow: `0 0 0 9999px rgba(0,0,0,${overlayOpacity})`,
                  }}
                />
                <div
                  className="absolute border-2 border-white/60 rounded-lg pointer-events-none"
                  style={{
                    inset: `${crop / 2}%`,
                  }}
                />
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Crop size={16} className="text-muted-foreground shrink-0" />
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={crop}
              onChange={(e) => setCrop(Number(e.target.value))}
              className="flex-1 accent-primary cursor-pointer"
            />
            <span className="text-xs text-muted-foreground font-mono w-8 text-right">
              {crop}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ZoomIn size={16} className="text-muted-foreground shrink-0" />
            <input
              type="range"
              min={50}
              max={200}
              step={5}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-primary cursor-pointer"
            />
            <span className="text-xs text-muted-foreground font-mono w-8 text-right">
              {zoom}%
            </span>
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-semibold transition-all duration-200 hover:bg-accent active:scale-[0.98]"
          >
            Use as is
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] inline-flex items-center justify-center gap-2"
          >
            <Check size={16} />
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export { ImageCropModal };
