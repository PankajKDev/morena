/*
  Warnings:

  - You are about to drop the column `userlinks` on the `Pagelink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pagelink" DROP COLUMN "userlinks";

-- CreateTable
CREATE TABLE "UserLink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "UserLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLink" ADD CONSTRAINT "UserLink_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Pagelink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
