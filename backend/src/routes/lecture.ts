import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isTutor } from "../utils/isTutor";
import {
  addAuthorize
} from "../utils/authorizeCoTutor";
import { handleAddLecture, handleGetLecture, handleGetLectures, handleGetProgress, handleRemoveLecture, handleSetProgress } from "../controllers/lecture";
import { isEnrolled } from "../utils/isEnrolled";
import { addlectureLimitCheck } from "../utils/isFree";


const lectureRoutes= new Hono();

lectureRoutes.post("/add/:id", protectRoute, isTutor,addAuthorize, addlectureLimitCheck, handleAddLecture );
lectureRoutes.post("/remove/:id",protectRoute, isTutor, handleRemoveLecture);
lectureRoutes.get("/get-lectures/:id", protectRoute, isEnrolled, handleGetLectures)

lectureRoutes.get("/get-lecture/:id/:lectureId", protectRoute, isEnrolled, handleGetLecture)

lectureRoutes.post("/progress/:lectureId", protectRoute, handleSetProgress)
lectureRoutes.get("/progress/:lectureId", protectRoute,handleGetProgress)
export default lectureRoutes