"use client";

import type { ReactNode } from "react";

function ProfileProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export { ProfileProvider };
export { useProfileDataStore as useProfile } from "@/stores/profileDataStore";
