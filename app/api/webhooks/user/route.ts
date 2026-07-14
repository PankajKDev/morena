import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    console.log(evt.type);

    switch (evt.type) {
      case "user.created": {
        const user = evt.data;
        const clerkId = user.id;
        const fullName = [user.first_name, user.last_name]
          .filter(Boolean)
          .join(" ");
        const email = user.email_addresses[0]?.email_address;
        await prisma.user.upsert({
          where: { clerkId },
          update: {
            name: fullName,
            email,
          },
          create: {
            name: fullName,
            email,
            clerkId,
            isSubscribed: false,
          },
        });

        break;
      }

      case "user.updated": {
        const user = evt.data;
        const clerkId = user.id;
        const fullName = [user.first_name, user.last_name]
          .filter(Boolean)
          .join(" ");
        const email = user.email_addresses[0]?.email_address;

        await prisma.user.update({
          data: {
            name: fullName,
            email: email,
          },
          where: { clerkId: clerkId },
        });

        break;
      }

      case "user.deleted": {
        const user = evt.data;
        const clerkId = user.id;

        await prisma.user.deleteMany({ where: { clerkId: clerkId } });

        break;
      }
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed", err);

    return Response.json({ success: false }, { status: 400 });
  }
}
