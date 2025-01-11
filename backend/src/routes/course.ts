import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import {
  handleChangePermissions,
  handleCreateCourse,
  handleGetCourses,
  handleGetCourseWithId,
  handleGetMyCourses,
  handleGetMyEnrolledCourse,
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
import { isEnrolled } from "../utils/isEnrolled";
import { courseLimitCheck } from "../utils/isFree";

const courseRoutes = new Hono();

courseRoutes.post("/create", protectRoute, isTutor, courseLimitCheck, handleCreateCourse);
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
courseRoutes.get("/get-courses/:category", handleGetCourses)
courseRoutes.get("/public-course/:id", handleGetPublicCourseWithId);

courseRoutes.get("/enrolled-course/:id", protectRoute, isEnrolled, handleGetMyEnrolledCourse);

export default courseRoutes;
