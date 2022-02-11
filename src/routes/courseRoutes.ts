import CourseRepository from "../repositories/courseRepository";
import CourseController from "../controllers/courseController";
import CourseModel from "../models/Course";
import { Router } from "express";

const router = Router();
const courseRepository = new CourseRepository(CourseModel);
const courseController = new CourseController(courseRepository);

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);

export default router;
