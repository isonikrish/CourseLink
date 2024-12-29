import {Hono} from 'hono'
import { handleGetMe, handleLogin, handleLogout, handleSignup } from '../controllers/user';
import { protectRoute } from '../utils/protectRoute';

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup)
userRoutes.post("/login", handleLogin)
userRoutes.get("/getMe", protectRoute,handleGetMe)
userRoutes.post("/logout", protectRoute, handleLogout);
export default userRoutes;