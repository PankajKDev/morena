import { ProfileProvider } from "@/components/shared/profile-context";
import { HomeButton } from "@/components/shared/HomeButton";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <ProfileProvider>
        {children}
        <HomeButton />
      </ProfileProvider>
    </div>
  );
}

export default layout;
