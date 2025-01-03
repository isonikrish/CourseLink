/*
  Warnings:

  - You are about to drop the column `access` on the `CoTutor` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Notification" ADD VALUE 'accepted';

-- AlterTable
ALTER TABLE "CoTutor" DROP COLUMN "access";
