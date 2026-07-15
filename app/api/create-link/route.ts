import { prisma } from "@/lib/prisma";
import { MappedLink } from "@/types";

export async function POST(req: Request) {
  const {
    linkPageName,
    displayName,
    bio,
    avatar,
    pageUrl,
    bodyBgImage,
    profileBgImage,
    linkBgImage,
    userId,
    ownerUsername,
    customTheme,
    links,
  } = await req.json();

  try {
    const res = await prisma.pagelink.create({
      data: {
        linkPagename: linkPageName,
        displayName,
        bio,
        pageUrl,
        avatar,
        bodyBgImage,
        profileBgImage,
        linkBgImage,
        ownerId: userId,
        ownerUsername,
        customTheme,
        userlinks: {
          create: links,
        },
      },
    });
    const pageId = res.id;
    return Response.json({ pageId }, { status: 200 });
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
    linkPageName,
    displayName,
    pageUrl,
    bio,
    avatar,
    bodyBgImage,
    profileBgImage,
    linkBgImage,
    userId,
    ownerUsername,
    customTheme,
    links,
  } = await req.json();

  try {
    const res = await prisma.pagelink.update({
      where: {
        ownerId: userId,
        linkPagename: linkPageName,
        pageUrl: pageUrl,
      },
      data: {
        displayName,
        bio,
        avatar,
        bodyBgImage,
        profileBgImage,
        linkBgImage,
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
    const pageId = res.id;
    return Response.json({ pageId }, { status: 200 });
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
