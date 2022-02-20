import CourseRepository from "../repositories/courseRepository";
import CourseController from "../controllers/courseController";
import CourseModel from "../models/Course";
import { Router } from "express";
import { deleteImageFromCloudinary, upload } from "../utils/cloudinaryUpload";
import CourseService from "../services/courseService";

const router = Router();
const courseRepository = new CourseRepository(CourseModel);
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
// router.post('/upload', upload.single('image'),(req,res)=>{
//     console.log(req.file)
//     console.log(req.files)
//     res.status(200).json(req.file)
// })

// router.delete('/upload',async (req,res)=>{
//     const {url} = req.body
//     console.log(url)
//     await deleteImageFromCloudinary(url)
//     res.status(200).json({message:'success'})

// })

export default router;
