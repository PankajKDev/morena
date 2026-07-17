import { ProfileActions } from "@/components/shared/ProfileActions";
import { Sidebar } from "@/components/shared/sidebar";
import { ProfileProvider } from "@/components/shared/profile-context";
import { HomeButton } from "@/components/shared/HomeButton";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <ProfileProvider>
        <Sidebar />
        {children}
        <HomeButton />
        <ProfileActions mode="POST" />
      </ProfileProvider>
    </div>
  );
}

export default layout;
