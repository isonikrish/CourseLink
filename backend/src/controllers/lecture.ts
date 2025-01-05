import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";

export const handleAddLecture = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");
  const courseId = parseInt(c.req.param("id"), 10);
  if (isNaN(courseId)) {
    return c.json({ msg: "Invalid or missing course ID" }, 400);
  }
  try {
    const { title } = await c.req.json();
    if (!title) {
      return c.json({ msg: "No title provided" }, 400);
    }


    const newLecture = await prisma.lecture.create({
      data: {
        courseId: courseId,
        tutorId: user.id,
        title: title,
      },
    });

    if (!newLecture) {
      return c.json({ msg: "Error in creating lecture" }, 500);
    }

    return c.json({ msg: "Successfully added a lecture", lecture: newLecture }, 200); 
  } catch (error) {
    console.error("Error in handleAddLecture:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
