import { ProfileHydrator, ProfileActions } from "@/components/shared/Editor";
import { prisma } from "@/lib/prisma";
import type { IProfileHydratorData, ProfileCardTheme } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    pageId: string;
  }>;
};
async function page({ params }: PageProps) {
  const { pageId } = await params;
  const { userId } = await auth();

  const data = await prisma.pagelink.findUnique({
    where: { id: pageId },
    include: { userlinks: true },
  });

  if (!data || data.ownerId !== userId) notFound();

  const cardData = {
    ...data,
    displayName: data.displayName ?? "",
    customTheme: data.customTheme as unknown as ProfileCardTheme,
  } satisfies IProfileHydratorData;
  return (
    <div className="w-full min-h-screen">
      <ProfileHydrator data={cardData} />
      <ProfileActions pageId={pageId} />
    </div>
  );
}

export default page;
