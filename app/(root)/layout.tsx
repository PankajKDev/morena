import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-screen items-center min-h-screen flex-col">
      <Navbar />
      <div className="w-[80%] flex flex-col">{children}</div>
    </div>
  );
}

export default Layout;
