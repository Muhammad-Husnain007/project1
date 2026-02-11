// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";
import cors from 'cors'
const app = express();

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors({
  origin: "*", // <-- replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
  credentials: true // if you want to allow cookies
}));

// Root route
app.get("/", (req, res) => {
  res.send("Server is ready");
});


// API routes
app.use("/api/v1", apiRouter);

export { app };