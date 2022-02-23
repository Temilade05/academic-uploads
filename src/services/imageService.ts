import ImageRepository from "../repositories/ImageRepository";
import { Image } from "../models/Image";
import AppError from "../errors/AppError";
import removeSpaces from "../utils/removeSpaces";
import CourseRepository from "../repositories/courseRepository";
import isValidSession from "../utils/isValidSession";
import { FilterQuery, UpdateQuery } from "mongoose";
import constants from "../utils/constants";

const { PENDING, APPROVED, DISAPPROVED } = constants.imageStatus;

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

    if (!isValidSession(session))
      throw new AppError("Invalid format for session", 400);

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

  async updateImages(
    ids: string[],
    session: string | undefined,
    courseCode: string | undefined,
    status: string | undefined
  ) {
    if (!ids) throw new AppError("No images specified for update", 400);
    const update: UpdateQuery<Image> = {};
    if (session) {
      if (!isValidSession(session))
        throw new AppError("Invalid session provided", 400);

      update.session = session;
    }

    if (courseCode) {
      const code = await this.courseRepository.findOne({ code: courseCode });
      if (!code) throw new AppError("Course code not found", 404);

      update.courseCode = courseCode;
    }

    if (status) {
      update.status = status;
    }

    //check if status is valid.
    const validIds = new Set([PENDING, APPROVED, DISAPPROVED]);
    const result = await this.imageRepository.findAndUpdate(
      { _id: { $in: ids } },
      update
    );
    return result;
  }
}

export default ImageService;
