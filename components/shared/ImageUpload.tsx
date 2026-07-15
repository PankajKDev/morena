"use client";

import { useRef } from "react";
import Image from "next/image";
import { X, Palette } from "lucide-react";
import { fileToBase64 } from "@/lib/utils";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    fileToBase64(file).then(onChange);
    e.target.value = "";
  };

  return (
    <label
      className="relative flex items-center justify-center w-full h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-90"
      style={value ? {} : { border: "2px dashed var(--input)", background: "var(--background)" }}
    >
      {value ? (
        <>
          <Image src={value} alt="" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onChange(null);
            }}
            className="absolute top-1 right-1 z-10 size-5 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X size={12} />
          </button>
          <span className="relative z-10 text-[11px] font-medium text-white bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
            Change
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Palette size={18} />
          <span className="text-xs">Upload image</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="sr-only"
      />
    </label>
  );
};

export { ImageUpload };
