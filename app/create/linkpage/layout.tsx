import { ProfileActions } from "@/components/shared/ProfileActions";
import { Sidebar } from "@/components/shared/Sidebar";
import { ProfileProvider } from "@/components/shared/profile-context";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <ProfileProvider>
        <Sidebar />
        {children}
        <ProfileActions />
      </ProfileProvider>
    </div>
  );
}

export default layout;
