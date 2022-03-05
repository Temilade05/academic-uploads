import express, { Request, Response } from "express";
import errorMiddleWare from "./errors/errorHandler";
import courseRouter from "./routes/courseRoutes";
import imageRouter from "./routes/imageRoutes";
import adminRouter from "./routes/admin";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to RCF academic uploads api",
    documentation: "Yet to be done",
  });
});

//add the routers here
app.use("/course", courseRouter);
app.use("/image", imageRouter);
app.use("/admin", adminRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "This endpoint does not exist on this server",
  });
});

app.use(errorMiddleWare);

export default app;
