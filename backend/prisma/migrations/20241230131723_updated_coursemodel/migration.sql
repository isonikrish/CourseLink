-- CreateEnum
CREATE TYPE "Status" AS ENUM ('published', 'unpublished');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" TEXT,
ADD COLUMN     "price" INTEGER DEFAULT 0,
ADD COLUMN     "status" "Status" DEFAULT 'unpublished';
