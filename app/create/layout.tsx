import { HomeButton } from "@/components/shared/Editor";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {children}
      <HomeButton />
    </div>
  );
}

export default layout;
