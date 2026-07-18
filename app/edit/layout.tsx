import { HomeButton } from "@/components/shared/HomeButton";
import { ProfileActions } from "@/components/shared/ProfileActions";
import { Sidebar } from "@/components/shared/sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Sidebar />
      {children}
      <HomeButton />
      <ProfileActions />
    </div>
  );
}

export default layout;
