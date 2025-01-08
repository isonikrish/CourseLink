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
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        user: true,
      }
    });
    if (enrollments.length === 0) {
      return c.json({ message: "No enrollments found for this course." }, 400);
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