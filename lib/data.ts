import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getCachedPages = unstable_cache(
  async (userId: string) => {
    return prisma.pagelink.findMany({
      where: { ownerId: userId },
      include: { userlinks: true },
    });
  },
  ["user-pages"],
  { tags: ["pages"] },
);
