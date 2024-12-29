import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";
import { createCourseSchema } from "../utils/zodSchemas";

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
