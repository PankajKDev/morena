import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }

  const res = await prisma.pagelink.findMany({ where: { ownerId: userId } });
  if (res) {
    return Response.json({ res }, { status: 200 });
  }
  return Response.json({ error: "error finding links" }, { status: 400 });
}

export async function DELETE(req: Request) {
  const { pageId } = await req.json();
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }
  try {
    const res = await prisma.pagelink.delete({
      where: { id: pageId, ownerId: userId },
    });
    revalidateTag("pages", { expire: 60 });
    return Response.json({ res }, { status: 200 });
  } catch (e) {
    return Response.json(
      { error: `server encountered an error please try again later ` },
      { status: 400 },
    );
  }
}
