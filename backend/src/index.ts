import { Hono } from 'hono'
import {cors} from 'hono/cors'
import userRoutes from './routes/user'
const app = new Hono()
app.use("*", cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.route("/api/v1/user", userRoutes)

export default app
