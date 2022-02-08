import express, { Request, Response } from "express";
import errorMiddleWare from "./errors/errorHandler";
import courseRouter from "./routes/courseRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      message: "Welcome to RCF academic uploads api",
      documentation: "Yet to be done",
    });
});

//add the routers here
app.use("/course", courseRouter);

app.use(errorMiddleWare);

export default app;
