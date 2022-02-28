/*
  Warnings:

  - The primary key for the `permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "permissions_id_seq";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "roles_id_seq";
