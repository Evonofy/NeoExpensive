/*
  Warnings:

  - Added the required column `settingsId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "settingsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "language" TEXT DEFAULT E'string',
    "theme" TEXT DEFAULT E'dark',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
