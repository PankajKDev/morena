import { ProfileCard } from "@/components/shared/ProfileCard";
import { prisma } from "@/lib/prisma";
import { ProfileCardData, ProfileCardTheme } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
type PageProps = {
  params: {
    username: string;
    pageurl: string;
  };
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

  const ogImages = [data.bodyBgImage, data.profileBgImage].filter(
    Boolean,
  ) as string[];

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000",
    ),
    title: `${data.ownerUsername} | ${data.pageUrl}`,
    description: data.bio || `Check out ${data.ownerUsername}'s profile`,
    openGraph: {
      title: `${data.ownerUsername} | ${data.pageUrl}`,
      description: data.bio || `Check out ${data.ownerUsername}'s profile`,
      images: ogImages,
    },

    twitter: {
      title: `${data.ownerUsername} | ${data.pageUrl}`,
      description: data.bio || "",
      images: ogImages,
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

  const cardData: ProfileCardData = {
    ...data,
    customTheme: data.customTheme as unknown as ProfileCardTheme,
  };
  return (
    <div className="w-full h-full">
      <ProfileCard data={cardData} />
    </div>
  );
}
