import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isTutor } from "../utils/isTutor";
import {
  addAuthorize
} from "../utils/authorizeCoTutor";
import { handleAddLecture } from "../controllers/lecture";


const lectureRoutes= new Hono();

lectureRoutes.post("/add/:id", protectRoute, isTutor,addAuthorize, handleAddLecture );


export default lectureRoutes