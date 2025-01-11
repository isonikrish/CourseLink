import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";

export const handleEnrollCourse = async (c: Context) => {
  const prisma = prismaClient(c);
  const courseId = parseInt(c.req.param("id"));
  const user = c.get("user");
  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
      },
    });
    if (!enrollment) return c.json({ msg: "Error in enrolling course" }, 400);

    return c.json({ msg: "Enrolled" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleGetEnrollments = async (c: Context) => {
  const prisma = prismaClient(c);
  const courseId = parseInt(c.req.param("id"));
  try {
    // First, fetch enrollments without including userProgress
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        user: true,
        course: {
          include: {
            Lecture: {
              select: {
                id: true,
                title: true,
              }
            }
          }
        }
      },
    });

    if (enrollments.length === 0) {
      return c.json({ message: "No enrollments found for this course." }, 400);
    }

    // Now, loop through the enrollments and fetch progress for each user and lecture
    for (const enrollment of enrollments) {
      const progress = await prisma.progress.findMany({
        where: {
          userId: enrollment.user.id,
          lectureId: { in: enrollment.course.Lecture.map((lecture:any) => lecture.id) },
        },
        select: {
          lectureId: true,
          currentTime: true,
          duration: true,
        },
      });

      // Map the progress data to each lecture for the user
      enrollment.course.Lecture.forEach((lecture:any) => {
        lecture.progress = progress.find((p:any) => p.lectureId === lecture.id) || null;
      });
    }

    return c.json(enrollments, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};



export const handleGetMyEnrollments = async (c: Context) =>{
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        course: {
          include: {
            tutor: true,
            Lecture: {
              select: {
                tutorId: true,
                courseId: true,
                title: true,
                id: true,
                userProgress: {
                  where: { userId: user.id },
                  select: {
                    currentTime: true,
                    duration: true,
                  },
                },
              },
            }
          }
        },
      }
    });
    if (enrollments.length === 0) {
      return c.json({ message: "No enrollments found for this course." }, 400);
    }
    return c.json(enrollments, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}