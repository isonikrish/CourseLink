import { Context, Next } from "hono";

export const isTutor = async (c: Context, next: Next) => {
  try {
    const user = c.get("user");
    if (!user || user.role !== "tutor") {
      return c.json({ msg: "Unauthorized to create course" }, 403);
    }
    await next()
  } catch (error) {
    return c.json({ msg: "Internal Server Error"}, 500);
  }
};
