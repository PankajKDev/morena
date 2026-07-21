"use client";

import { ListFilter, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface PageSelectorProps {
  pages: { id: string; name: string }[];
  selectedPageId: string | null;
  onChange: (pageId: string | null) => void;
}

function PageSelector({ pages, selectedPageId, onChange }: PageSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedName =
    selectedPageId === null
      ? "All pages"
      : pages.find((p) => p.id === selectedPageId)?.name ?? "All pages";

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <ListFilter size={15} className="text-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          Viewing
        </span>
      </div>

      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-3.5 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent active:scale-[0.97]"
        >
          {selectedName}
          <svg
            className={`size-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 z-20 mt-1.5 w-56 origin-top-right animate-in fade-in zoom-in-95 rounded-xl border border-border bg-card p-1 shadow-lg duration-200">
            <button
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                selectedPageId === null ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              All pages
              {selectedPageId === null && (
                <Check size={14} className="text-primary" />
              )}
            </button>
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onChange(p.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                  selectedPageId === p.id ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                {p.name}
                {selectedPageId === p.id && (
                  <Check size={14} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { PageSelector };
