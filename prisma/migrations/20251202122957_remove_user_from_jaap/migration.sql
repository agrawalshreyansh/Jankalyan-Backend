/*
  Warnings:

  - You are about to drop the column `userId` on the `JaapCount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `JaapCount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `JaapCount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JaapCount" DROP CONSTRAINT "JaapCount_userId_fkey";

-- AlterTable
ALTER TABLE "JaapCount" DROP COLUMN "userId",
ADD COLUMN     "deviceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JaapCount_deviceId_key" ON "JaapCount"("deviceId");
