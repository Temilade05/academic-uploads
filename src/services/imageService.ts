import ImageRepository from "../repositories/ImageRepository";
import { Image } from "../models/Image";
import AppError from "../errors/AppError";
import removeSpaces from "../utils/removeSpaces";
import CourseRepository from "../repositories/courseRepository";

class ImageService {
  private imageRepository: ImageRepository;
  private courseRepository: CourseRepository;

  constructor(
    imageRepository: ImageRepository,
    courseRepository: CourseRepository
  ) {
    this.imageRepository = imageRepository;
    this.courseRepository = courseRepository;
  }

  async createImages(
    files: Express.Multer.File[] | undefined,
    courseCode: string,
    session: string
  ): Promise<Image[]> {
    if (!files) throw new AppError("No images were uploaded", 400);

    //check if the coursecode exists
    courseCode = removeSpaces(courseCode).toUpperCase();

    const course = await this.courseRepository.findOne({ code: courseCode });

    if (!course)
      throw new AppError(
        `Course with course code ${courseCode} not found`,
        404
      );

    const urls: string[] = [];
    for (const file of files) {
      urls.push(file.path);
    }

    const result = await this.imageRepository.createImages(
      urls,
      courseCode,
      session
    );

    return result;
  }
}

export default ImageService;
