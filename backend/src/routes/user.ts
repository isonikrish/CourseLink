import {Hono} from 'hono'
import { handleAcceptRequest, handleGetMe, handleGetNotifications, handleGetUser, handleLogin, handleLogout, handleSendRequest, handleSignup } from '../controllers/user';
import { protectRoute } from '../utils/protectRoute';
import { isTutor } from '../utils/isTutor';

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup)
userRoutes.post("/login", handleLogin)
userRoutes.get("/getMe", protectRoute,handleGetMe)
userRoutes.post("/logout", protectRoute, handleLogout);
userRoutes.get("/get-notifications",protectRoute, handleGetNotifications)
userRoutes.post("/accept-request", protectRoute, isTutor, handleAcceptRequest)


userRoutes.get("/:id", handleGetUser);//dynamic route


userRoutes.post("/send-request/:id", protectRoute, isTutor, handleSendRequest);



export default userRoutes;