-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('edit_course', 'add_lecture', 'change_course_status');

-- CreateTable
CREATE TABLE "CoTutor" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "access" TEXT[],
    "tutorId" INTEGER NOT NULL,
    "permissions" "Permission"[],

    CONSTRAINT "CoTutor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoTutor" ADD CONSTRAINT "CoTutor_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoTutor" ADD CONSTRAINT "CoTutor_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
