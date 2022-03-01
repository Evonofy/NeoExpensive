/*
  Warnings:

  - A unique constraint covering the columns `[neoId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "neoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_neoId_key" ON "users"("neoId");
