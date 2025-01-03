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
      where: {
        OR: [
          { tutorId: user.id },
          { coTutors: { some: { tutorId: user.id } } },
        ],
      },
      include: {
        coTutors: true, // Include co-tutors in the result if needed
      },
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
        tutor: true,
        coTutors: {
          select: {
            tutor: true,
            permissions: true,
            id: true,
          },
        },
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
  const courseId = parseInt(id, 10);
  if (isNaN(courseId)) {
    return c.json({ msg: "Invalid course ID" }, 400);
  }

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
    return c.json(updatedCourse, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
    console.log(error);
  }
};

export const handleGetTutor = async (c: Context) => {
  const user = c.get("user");
  try {
    const email = c.req.query("email");
    if (!email) {
      return c.json({ msg: "You havent provided email" }, 400);
    }
    const prisma = prismaClient(c);
    let tutors = await prisma.user.findMany({
      where: {
        email: {
          contains: email, // Partial match
          mode: "insensitive", // Case insensitive
        },
        role: "tutor", // Ensure the role is 'tutor'
      },
    });

    if (!tutors || tutors.length === 0) {
      return c.json({ msg: "No relevant tutors found" }, 404);
    }

    tutors = tutors.filter((tutor: any) => tutor.id !== user.id);

    return c.json(tutors, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleChangePermissions = async (c: Context) => {
  const prisma = prismaClient(c);
  const user = c.get("user");

  const { id, permissions } = await c.req.json();
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) {
    return c.json({ msg: "Invalid ID" }, 400);
  }
  try {
    const updateCotutorPermission = await prisma.coTutor.update({
      where: { id: parsedId },
      data: {
        permissions: permissions, // Update permissions in the database
      },
    });
    return c.json({msg: "Updated permissions"}, 200)
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};
