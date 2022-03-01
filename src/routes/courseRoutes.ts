import CourseController from "../controllers/courseController";
import { Router } from "express";
import { deleteImageFromCloudinary, upload } from "../utils/cloudinaryUpload";
import ServiceLocator from "../di/serviceLocator";
import createCourse from "../controllers/course/createCourse";
import getAllCourses from "../controllers/course/getAllCourses";

const router = Router();

router.post("/", createCourse);
router.get("/", getAllCourses);

export default router;
