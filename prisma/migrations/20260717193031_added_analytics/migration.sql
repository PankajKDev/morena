-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "browser" TEXT,
    "operatingSystem" TEXT,
    "platform" TEXT,
    "region" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analytics_linkId_idx" ON "Analytics"("linkId");

-- CreateIndex
CREATE INDEX "Analytics_pageId_idx" ON "Analytics"("pageId");

-- CreateIndex
CREATE INDEX "Analytics_createdAt_idx" ON "Analytics"("createdAt");

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "UserLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Pagelink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
