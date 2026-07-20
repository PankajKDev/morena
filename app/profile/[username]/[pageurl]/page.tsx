import { ProfileCard } from "@/components/shared/Profile";
import { prisma } from "@/lib/prisma";
import type { ProfileCardData, ProfileCardTheme } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
type PageProps = {
  params: Promise<{
    username: string;
    pageurl: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;

  const { username, pageurl } = resolvedParams;

  const data = await prisma.pagelink.findUnique({
    where: { ownerUsername: username, pageUrl: pageurl },
  });

  if (!data) {
    return {
      title: "Page not found",
    };
  }

  return {
    metadataBase: new URL(`${process.env.NEXT_BASE_URL}`),
    title: `${data.ownerUsername} | ${data.pageUrl}`,
    description: data.bio || `Check out ${data.ownerUsername}'s profile`,
    openGraph: {
      title: `${data.ownerUsername} | ${data.pageUrl}`,
      description: data.bio || `Check out ${data.ownerUsername}'s profile`,
      images: `${data.bodyBgImage}`,
    },
  };
}
export default async function page({ params }: PageProps) {
  const { username, pageurl } = await params;

  const data = await prisma.pagelink.findUnique({
    where: { ownerUsername: username, pageUrl: pageurl },
    include: { userlinks: true },
  });

  if (!data) return notFound();

  const cardData = {
    ...data,
    displayName: data.displayName ?? "",
    customTheme: data.customTheme as unknown as ProfileCardTheme,
  } satisfies ProfileCardData;
  return (
    <div className="w-full h-full">
      <ProfileCard data={cardData} />
    </div>
  );
}
