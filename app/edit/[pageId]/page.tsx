import { ProfileHydrator } from "@/components/shared/ProfileHydrator";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function page({ params }) {
  const { pageId } = await params;
  const data = await prisma.pagelink.findUnique({
    where: { id: pageId },
    include: { userlinks: true },
  });
  if (!data) return notFound();
  return (
    <div className="w-full min-h-screen">
      <ProfileHydrator data={data} />
    </div>
  );
}

export default page;
