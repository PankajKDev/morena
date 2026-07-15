import { ProfileCard } from "@/components/shared/ProfileCard";

type PageProps = {
  params: {
    username: string;
    pageurl: string;
  };
};
export default async function page({ params }: PageProps) {
  const { username, pageurl } = await params;
  return (
    <div className="w-full h-full">
      <ProfileCard />
    </div>
  );
}
