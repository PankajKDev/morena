/*
  Warnings:

  - Made the column `userlinks` on table `Pagelink` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pagelink" ALTER COLUMN "userlinks" SET NOT NULL,
ALTER COLUMN "userlinks" SET DEFAULT '[]';
