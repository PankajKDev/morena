import { ProfileHydrator } from "@/components/shared/ProfileHydrator";
import { ProfileActions } from "@/components/shared/ProfileActions";
import { prisma } from "@/lib/prisma";
import { IProfileHydratorData, ProfileCardTheme } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    pageId: string;
  };
};
async function page({ params }: PageProps) {
  const { pageId } = await params;
  const { userId } = await auth();

  const page = await prisma.pagelink.findUnique({
    where: { id: pageId },
    select: { ownerId: true },
  });

  if (!page || page.ownerId !== userId) notFound();

  const data = await prisma.pagelink.findUnique({
    where: { id: pageId },
    include: { userlinks: true },
  });
  if (!data) return notFound();

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
