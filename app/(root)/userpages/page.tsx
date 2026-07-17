import { HostedPages } from "@/components/shared/HostedPages";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function page() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex justify-center items-center">
        Auth error please try again later
      </div>
    );
  }
  const data = await prisma.pagelink.findMany({
    where: { ownerId: userId },
  });
  if (!data) {
    return (
      <div className="flex justify-center items-center">
        <h1>No pages created</h1>
      </div>
    );
  }
  const cleanedData = data.map(({ pageUrl, linkPagename, ownerUsername }) => ({
    pageUrl,
    linkPagename,
    ownerUsername,
  }));
  return (
    <div>
      <HostedPages pages={cleanedData} />
    </div>
  );
}

export default page;
