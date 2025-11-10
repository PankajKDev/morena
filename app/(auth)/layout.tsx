import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen w-full bg-black flex justify-center items-center">
      {children}
    </main>
  );
}

export default Layout;
