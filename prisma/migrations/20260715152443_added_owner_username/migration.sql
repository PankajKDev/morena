/*
  Warnings:

  - Added the required column `ownerUsername` to the `Pagelink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagelink" ADD COLUMN     "ownerUsername" TEXT NOT NULL;
