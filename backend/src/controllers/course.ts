import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";
import { createCourseSchema, editCourse } from "../utils/zodSchemas";

export const handleCreateCourse = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    const data = await c.req.json();
    const validatedData = createCourseSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const { title, description } = validatedData.data;
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        tutorId: user.id,
      },
    });
    if (!newCourse) {
      return c.json({ msg: "Error in creating a user" }, 400);
    }
    return c.json(newCourse, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleGetMyCourses = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  try {
    const courses = await prisma.course.findMany({
      where: { tutorId: user.id },
    });

    if (courses.length === 0) {
      return c.json({ msg: "No courses found" }, 404);
    }

    return c.json(courses, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
export const handleGetCourseWithId = async (c: Context) => {
  const prisma = prismaClient(c);
  const id = parseInt(c.req.param("id"), 10);
  try {
    const course = await prisma.course.findUnique({
      where: { id: id },
      include: {
        tutor: true, //TODO - add more select here
      },
    });
    if (!course) {
      return c.json({ msg: "No course found" }, 400);
    }

    return c.json(course, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleUpdateCourse = async (c: Context) => {
  const prisma = prismaClient(c);
  const id = c.req.param("id");
  const data = await c.req.json();
  const courseId = parseInt(id);
  try {
    const validatedData = editCourse.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const { title, description, price, category } = validatedData.data;

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        title,
        description,
        price,
        category,
      },
    });
    return c.json(updatedCourse, 200)
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
