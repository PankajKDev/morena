"use client";

import { useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Palette,
  Puzzle,
} from "lucide-react";
import { DetailsTab } from "./DetailsTab";
import { CssTab } from "./CssTab";
import { IntegrationsTab } from "./IntegrationsTab";

type Tab = "details" | "css" | "integrations";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("details");

  const tabs: { key: Tab; label: string; icon: typeof User }[] = [
    { key: "details", label: "Details", icon: User },
    { key: "css", label: "CSS", icon: Palette },
    { key: "integrations", label: "Integrations", icon: Puzzle },
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
              <DetailsTab />
            ) : tab === "integrations" ? (
              <IntegrationsTab />
            ) : (
              <CssTab />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export { Sidebar };
