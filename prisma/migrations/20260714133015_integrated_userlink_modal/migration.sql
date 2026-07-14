/*
  Warnings:

  - You are about to drop the column `order` on the `UserLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserLink" DROP COLUMN "order",
ADD COLUMN     "totalClicks" INTEGER NOT NULL DEFAULT 0;
