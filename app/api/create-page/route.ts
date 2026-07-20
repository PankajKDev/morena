import { prisma } from "@/lib/prisma";
import type { MappedLink } from "@/types";

export async function POST(req: Request) {
  const { linkPageName, pageUrl, userId, ownerUsername, customTheme } =
    await req.json();

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
        ownerUsername,
        customTheme,
      },
    });
    return Response.json({ pageId: res.id }, { status: 200 });
  } catch (error) {
    console.error("Create page error:", error);

    return Response.json(
      {
        message: error instanceof Error ? error.message : String(error),
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
    userId,
    music,
    musicVolume,
    ownerUsername,
    customTheme,
    links,
  } = await req.json();

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
        ownerUsername,
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
    return Response.json({ pageId: res.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 400 },
    );
  }
}
