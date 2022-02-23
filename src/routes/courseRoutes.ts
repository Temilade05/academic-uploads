import CourseController from "../controllers/courseController";
import { Router } from "express";
import { deleteImageFromCloudinary, upload } from "../utils/cloudinaryUpload";
import ServiceLocator from "../di/serviceLocator";

const router = Router();
const courseController = ServiceLocator.courseController;

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);

export default router;
