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
  const { username, pageurl } = await params;
  const data = await prisma.pagelink.findUnique({
    where: { ownerUsername: username, pageUrl: pageurl },
    include: { userlinks: true },
  });

  if (!data) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: `${data.ownerUsername} | ${data.pageUrl}`,
    description: `${data.bio}`,
    openGraph: {
      title: `${data.ownerUsername} | ${data.pageUrl}`,
      description: `${data.bio}`,
      images: [`${data.bodyBgImage}`, `${data.profileBgImage}`],
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
