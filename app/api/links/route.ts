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
