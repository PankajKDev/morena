import { prisma } from "@/lib/prisma";
import type { MappedLink } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { linkPageName, pageUrl, customTheme } = await req.json();

  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user?.username) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }
  try {
    const existing = await prisma.pagelink.findFirst({
      where: {
        OR: [{ pageUrl }, { linkPagename: linkPageName }],
        ownerId: userId,
      },
    });

    if (existing) {
      return Response.json(
        { message: "A page with this URL or name already exists." },
        { status: 409 },
      );
    }

    const res = await prisma.pagelink.create({
      data: {
        linkPagename: linkPageName,
        pageUrl,
        ownerId: userId,
        ownerUsername: user?.username,
        customTheme,
      },
    });
    revalidateTag("pages", { expire: 60 });
    return Response.json({ pageId: res.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "ERROR CREATING PAGE",
      },
      { status: 400 },
    );
  }
}

export async function PATCH(req: Request) {
  const {
    pageId,
    linkPageName,
    displayName,
    pageUrl,
    bio,
    avatar,
    bodyBgImage,
    profileBgImage,
    linkBgImage,

    music,
    musicVolume,
    customTheme,
    links,
  } = await req.json();
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user?.username) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }
  try {
    const res = await prisma.pagelink.update({
      where: {
        id: pageId,
        ownerId: userId,
      },
      data: {
        linkPagename: linkPageName,
        pageUrl,
        displayName,
        bio,
        avatar,
        bodyBgImage,
        profileBgImage,
        linkBgImage,
        music,
        musicVolume,
        ownerUsername: user?.username,
        customTheme,
        userlinks: {
          deleteMany: {},
          create: links.map((link: MappedLink) => ({
            name: link.name,
            url: link.url,
            totalClicks: link.totalClicks,
          })),
        },
      },
    });
    revalidateTag("pages", { expire: 60 });
    return Response.json({ pageId: res.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "encountered a server error",
      },
      { status: 400 },
    );
  }
}
