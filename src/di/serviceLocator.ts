import CourseController from "../controllers/courseController";
import CourseModel from "../models/Course";
import CourseRepository from "../repositories/courseRepository";
import CourseService from "../services/courseService";

class ServiceLocator {
  private static courseRepository = new CourseRepository(CourseModel);
  private static courseService = new CourseService(this.courseRepository);
  static courseController = new CourseController(this.courseService);
}

export default ServiceLocator;
