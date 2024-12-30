import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be 50 characters or less" }),

    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be 50 characters or less" }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(128, { message: "Password must be 128 characters or less" }),

    role: z.enum(["student", "tutor"], {
      errorMap: () => ({
        message: "Role must be 'student', 'tutor'",
      }),
    }),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),

    password: z.string(),
  })
  .strict();


  export const createCourseSchema = z.object({
    title: z.string() .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" })
  })

  export const editCourse = z.object({
    title: z.string() .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }).optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }).optional(),
    price: z.number().optional(),
    category: z.string().optional(),
  })