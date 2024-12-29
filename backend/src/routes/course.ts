import {Hono} from 'hono'
import { protectRoute } from '../utils/protectRoute';
import { handleCreateCourse } from '../controllers/course';
import { isTutor } from '../utils/isTutor';

const courseRoutes = new Hono();

courseRoutes.post("/create", protectRoute,isTutor, handleCreateCourse)

export default courseRoutes;