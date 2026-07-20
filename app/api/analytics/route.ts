import { prisma } from "@/lib/prisma";
import { userAgent } from "next/server";
import { geolocation } from "@vercel/functions";
export async function POST(req: Request) {
  const { linkId, pageId } = await req.json();
  const { browser, os, device } = userAgent(req);
  const { country, city } = geolocation(req);

  try {
    await prisma.$transaction([
      prisma.userLink.update({
        where: { id: linkId },
        data: { totalClicks: { increment: 1 } },
      }),
      prisma.analytics.create({
        data: {
          linkId,
          pageId,
          browser: browser.name,
          operatingSystem: os.name,
          platform: device.model,
          region: `${city}/${country}`,
        },
      }),
    ]);
  } catch (err) {
    console.error("Analytics transaction failed:", err);
    return Response.json({ error: "failed" }, { status: 500 });
  }
  return Response.json({ message: "success" }, { status: 200 });
}
