import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes Import 
import adminRouter from './routes/admin.routes.js'
import employeeRouter from './routes/employee.routes.js'

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/employee", employeeRouter);

export { app };