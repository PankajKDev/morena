import { Profile, ProfileActions } from "@/components/shared/Editor";
import { Sidebar } from "@/components/shared/sidebar";
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
    <>
      <Sidebar />
      <div className="w-full h-full">
        <Profile />
      </div>
      <ProfileActions pageId={pageId} />
    </>
  );
}

export default Page;
