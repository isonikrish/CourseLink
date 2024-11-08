import express from "express";
import connectMongoDB from "./config/dbConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
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
