import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isTutor } from "../utils/isTutor";
import {
  addAuthorize
} from "../utils/authorizeCoTutor";
import { handleAddLecture, handleRemoveLecture } from "../controllers/lecture";


const lectureRoutes= new Hono();

lectureRoutes.post("/add/:id", protectRoute, isTutor,addAuthorize, handleAddLecture );
lectureRoutes.post("/remove/:id",protectRoute, isTutor, handleRemoveLecture);

export default lectureRoutes