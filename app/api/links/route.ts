import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const res = await prisma.pagelink.findMany({ where: { ownerId: userId } });
  if (res) {
    console.log(res);
    return Response.json({ res }, { status: 200 });
  }
  return Response.json({ error: "error finding links" }, { status: 400 });
}

export async function DELETE(req: Request) {
  const { userId, pageId } = await req.json();
  try {
    const res = await prisma.pagelink.delete({
      where: { id: pageId, ownerId: userId },
    });
    return Response.json({ res }, { status: 200 });
  } catch (e) {
    return Response.json(
      { error: `error finding links : ${e}` },
      { status: 400 },
    );
  }
}
