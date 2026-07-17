import { prisma } from "@/lib/prisma";
import { userAgent } from "next/server";
import { geolocation } from "@vercel/functions";
export async function GET(req: Request) {
  const { linkId, pageId } = await req.json();
  const { browser, os, device } = userAgent(req);
  const { country, city } = geolocation(req);

  prisma
    .$transaction([
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
    ])
    .catch(console.error);

  return Response.json({ message: "success" }, { status: 302 });
}
