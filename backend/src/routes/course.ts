import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import {
  handleChangePermissions,
  handleCreateCourse,
  handleGetCourses,
  handleGetCourseWithId,
  handleGetMyCourses,
  handleGetPublicCourseWithId,
  handleGetTutor,
  handlePublishUnpublish,
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
);
courseRoutes.get("/get-tutor", protectRoute, isTutor, handleGetTutor);
courseRoutes.put(
  "/change-permissions",
  protectRoute,
  isTutor,
  handleChangePermissions
);
courseRoutes.put("/publish-unpublish/:id", protectRoute, isTutor, statusAuthorize, handlePublishUnpublish)
courseRoutes.get("/get-courses/:category", protectRoute, handleGetCourses)
courseRoutes.get("/public-course/:id", handleGetPublicCourseWithId);


export default courseRoutes;
