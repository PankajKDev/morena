"use client";

import { useRouter } from "next/navigation";
import { useProfileDataStore } from "@/stores/profileDataStore";
import { Home } from "lucide-react";

const HomeButton = () => {
  const router = useRouter();
  const reset = useProfileDataStore((s) => s.reset);

  return (
    <button
      onClick={() => {
        reset();
        router.push("/");
      }}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-2xl border border-border bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 shadow-lg"
    >
      <Home size={16} />
      Home
    </button>
  );
};

export { HomeButton };
