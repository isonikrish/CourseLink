import express from "express";
import { handleSignup, handleLogin, handleGetMe, handleLogout } from "../controllers/authentication.js";
import { protectUser } from "../utils/generateToken.js";

const router = express.Router();

router.post("/auth/signup", handleSignup);
router.post("/auth/login", handleLogin);
router.get("/auth/me",protectUser,handleGetMe);
router.post('/auth/logout',protectUser,handleLogout)



export default router;
