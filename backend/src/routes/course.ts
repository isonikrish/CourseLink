import {Hono} from 'hono'
import { protectRoute } from '../utils/protectRoute';
import { handleCreateCourse, handleGetCourseWithId, handleGetMyCourses, handleGetTutor, handleUpdateCourse } from '../controllers/course';
import { isTutor } from '../utils/isTutor';

const courseRoutes = new Hono();

courseRoutes.post("/create", protectRoute,isTutor, handleCreateCourse)
courseRoutes.get("/my-courses", protectRoute, isTutor, handleGetMyCourses)
courseRoutes.get("/get-course/:id",handleGetCourseWithId)
courseRoutes.put("/update-course/:id", protectRoute,isTutor,  handleUpdateCourse)
courseRoutes.get("/get-tutor", protectRoute, isTutor, handleGetTutor)
export default courseRoutes;