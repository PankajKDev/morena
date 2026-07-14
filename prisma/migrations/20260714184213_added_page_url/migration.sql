/*
  Warnings:

  - A unique constraint covering the columns `[pageUrl]` on the table `Pagelink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageUrl` to the `Pagelink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagelink" ADD COLUMN     "pageUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pagelink_pageUrl_key" ON "Pagelink"("pageUrl");
