/*
  Warnings:

  - You are about to drop the column `displayname` on the `Pagelink` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `Pagelink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagelink" DROP COLUMN "displayname",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "userlinks" JSONB;
