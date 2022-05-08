-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_settingsId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "settingsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
