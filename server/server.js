import express from "express";
import connectMongoDB from "./config/dbConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthenticationRoutes from './routes/authentication.js'
import UserRoutes from './routes/user.js'

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("hello users");
});

app.use('/api',AuthenticationRoutes);

app.use('/api',UserRoutes);



connectMongoDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
