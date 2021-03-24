/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Organization`. If there are existing duplicate values, the migration will fail.
  - Added the required column `GCSBucketName` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GCPProjectName` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "GCSBucketName" TEXT NOT NULL,
ADD COLUMN     "GCPProjectName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization.name_unique" ON "Organization"("name");
