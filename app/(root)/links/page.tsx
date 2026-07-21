import { LinkPageCard } from "@/components/shared/Links";
import { getCachedPages } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";

async function Page() {
  const { userId } = await auth();
  if (!userId) return null;

  const pages = await getCachedPages(userId);
  const serialized = pages.map((p) => ({
    id: p.id,
    linkPagename: p.linkPagename,
    pageUrl: p.pageUrl,
    createdAt: new Date(p.createdAt).toISOString(),
    updatedAt: new Date(p.updatedAt).toISOString(),
  }));

  return (
    <div>
      <LinkPageCard initialPages={serialized} />
    </div>
  );
}

export default Page;
