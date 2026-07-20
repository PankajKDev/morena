import { HomeButton } from "@/components/shared/Editor";
import { Sidebar } from "@/components/shared/sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Sidebar />
      {children}
      <HomeButton />
    </div>
  );
}

export default layout;
