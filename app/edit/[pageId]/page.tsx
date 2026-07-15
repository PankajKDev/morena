import { ProfileHydrator } from "@/components/shared/ProfileHydrator";
import { prisma } from "@/lib/prisma";
import { IProfileHydratorData, ProfileCardTheme } from "@/types";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    pageId: string;
  };
};
async function page({ params }: PageProps) {
  const { pageId } = params;
  const data = await prisma.pagelink.findUnique({
    where: { id: pageId },
    include: { userlinks: true },
  });
  if (!data) return notFound();

  const cardData: IProfileHydratorData = {
    ...data,
    customTheme: data.customTheme as unknown as ProfileCardTheme,
  };
  return (
    <div className="w-full min-h-screen">
      <ProfileHydrator data={cardData} />
    </div>
  );
}

export default page;
