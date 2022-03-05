import { Router } from "express";
import { deleteImageFromCloudinary, upload } from "../utils/cloudinaryUpload";
import createCourse from "../controllers/course/createCourse";
import getAllCourses from "../controllers/course/getAllCourses";
import { requireSignIn } from "../middleware/auth";

const router = Router();

router.post("/", requireSignIn, createCourse);
router.get("/", getAllCourses);

export default router;
