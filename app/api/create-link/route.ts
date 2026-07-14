import { prisma } from "@/lib/prisma";

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
