/*
  Warnings:

  - The primary key for the `JaapCount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Query` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "JaapCount" DROP CONSTRAINT "JaapCount_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JaapCount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JaapCount_id_seq";

-- AlterTable
ALTER TABLE "Query" DROP CONSTRAINT "Query_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Query_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Query_id_seq";

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "fullName" TEXT,
    "role" "AdminRole" NOT NULL,
    "addedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
