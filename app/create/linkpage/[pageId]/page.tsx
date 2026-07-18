import { Profile } from "@/components/shared/Profile";
import { ProfileActions } from "@/components/shared/ProfileActions";

type PageProps = {
  params: Promise<{
    pageId: string;
  }>;
};

async function Page({ params }: PageProps) {
  const { pageId } = await params;
  return (
    <div className="h-full w-full">
      <Profile />
      <ProfileActions pageId={pageId} />
    </div>
  );
}

export default Page;
