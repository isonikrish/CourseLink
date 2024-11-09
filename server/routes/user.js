import express from "express";

import { protectUser } from "../utils/generateToken.js";
import { handleGetUser, handleEditProfile } from "../controllers/user.js";
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/user/:userId", protectUser, handleGetUser);
router.put('/user/edit',protectUser,upload.single("profilePicUrl"),handleEditProfile)
export default router;
