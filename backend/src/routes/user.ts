import {Hono} from 'hono'
import { handleLogin, handleSignup } from '../controllers/user';

const userRoutes = new Hono();

userRoutes.post("/signup", handleSignup)
userRoutes.post("/login", handleLogin)

export default userRoutes;