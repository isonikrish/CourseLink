import {Hono} from 'hono'
import { handleGetMe, handleGetUser, handleLogin, handleLogout, handleSignup } from '../controllers/user';
import { protectRoute } from '../utils/protectRoute';

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup)
userRoutes.post("/login", handleLogin)
userRoutes.get("/getMe", protectRoute,handleGetMe)
userRoutes.post("/logout", protectRoute, handleLogout);
userRoutes.get("/:id", handleGetUser);

export default userRoutes;