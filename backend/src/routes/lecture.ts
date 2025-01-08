import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isTutor } from "../utils/isTutor";
import {
  addAuthorize
} from "../utils/authorizeCoTutor";
import { handleAddLecture, handleGetLecture, handleGetLectures, handleRemoveLecture } from "../controllers/lecture";
import { isEnrolled } from "../utils/isEnrolled";


const lectureRoutes= new Hono();

lectureRoutes.post("/add/:id", protectRoute, isTutor,addAuthorize, handleAddLecture );
lectureRoutes.post("/remove/:id",protectRoute, isTutor, handleRemoveLecture);
lectureRoutes.get("/get-lectures/:id", protectRoute, isEnrolled, handleGetLectures)

lectureRoutes.get("/get-lecture/:id/:lectureId", protectRoute, isEnrolled, handleGetLecture)
export default lectureRoutes