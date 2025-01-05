import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import {
  handleChangePermissions,
  handleCreateCourse,
  handleGetCourseWithId,
  handleGetMyCourses,
  handleGetTutor,
  handleUpdateCourse,
} from "../controllers/course";
import { isTutor } from "../utils/isTutor";
import {
  editAuthorize,
  statusAuthorize,
} from "../utils/authorizeCoTutor";

const courseRoutes = new Hono();

courseRoutes.post("/create", protectRoute, isTutor, handleCreateCourse);
courseRoutes.get("/my-courses", protectRoute, isTutor, handleGetMyCourses);
courseRoutes.get("/get-course/:id", handleGetCourseWithId);
courseRoutes.put(
  "/update-course/:id",
  protectRoute,
  isTutor,
  editAuthorize,
  handleUpdateCourse
); //TODO= "ADD MIDDLEWARE FOR AUTH LIKE THIS"
courseRoutes.get("/get-tutor", protectRoute, isTutor, handleGetTutor);
courseRoutes.put(
  "/change-permissions",
  protectRoute,
  isTutor,
  handleChangePermissions
);
export default courseRoutes;
