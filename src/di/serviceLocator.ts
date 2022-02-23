import CourseController from "../controllers/courseController";
import ImageController from "../controllers/imageController";
import CourseModel from "../models/Course";
import ImageModel from "../models/Image";
import CourseRepository from "../repositories/courseRepository";
import ImageRepository from "../repositories/ImageRepository";
import CourseService from "../services/courseService";
import ImageService from "../services/imageService";

class ServiceLocator {
  private static courseRepository = new CourseRepository(CourseModel);
  private static courseService = new CourseService(this.courseRepository);
  static courseController = new CourseController(this.courseService);

  private static imageRepository = new ImageRepository(ImageModel);
  private static imageService = new ImageService(
    this.imageRepository,
    this.courseRepository
  );
  static imageController = new ImageController(this.imageService);
}

export default ServiceLocator;
