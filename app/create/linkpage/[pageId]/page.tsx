import { Profile } from "@/components/shared/Profile";
import { ProfileActions } from "@/components/shared/ProfileActions";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    pageId: string;
  }>;
};

async function Page({ params }: PageProps) {
  const { pageId } = await params;
  const { userId } = await auth();

  const page = await prisma.pagelink.findUnique({
    where: { id: pageId },
    select: { ownerId: true },
  });

  if (!page || page.ownerId !== userId) notFound();

  return (
    <div className="h-full w-full">
      <Profile />
      <ProfileActions pageId={pageId} />
    </div>
  );
}

export default Page;
