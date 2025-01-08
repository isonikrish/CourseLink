import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { handleEnrollCourse, handleGetEnrollments, handleGetMyEnrollments } from "../controllers/enrollment";
import { isInstructor } from "../utils/isInstructor";
import { isTutor } from "../utils/isTutor";

const enrollRoutes = new Hono();


enrollRoutes.post("/course/:id",protectRoute, isInstructor,handleEnrollCourse)
enrollRoutes.get("/course/:id", protectRoute, isTutor, handleGetEnrollments)
enrollRoutes.get("/my-enrollments", protectRoute, handleGetMyEnrollments)

export default enrollRoutes;