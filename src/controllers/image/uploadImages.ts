import { RequestHandler } from "express";
import successResponse from "../../utils/successResponse";
import AppError from "../../errors/AppError";
import removeSpaces from "../../utils/removeSpaces";
import isValidSession from "../../utils/isValidSession";
import ImageModel from "../../models/Image";
import CourseModel from "../../models/Course";

const uploadImages: RequestHandler = async (req, res, next) => {
  const files = req.files;
  let { courseCode, session } = req.body;

  try {
    if (!files || files.length == 0)
      return next(new AppError("No images were uploaded", 400));

    //check if the coursecode exists
    courseCode = removeSpaces(courseCode).toUpperCase();

    const course = await CourseModel.findOne({ code: courseCode });

    if (!course)
      return next(
        new AppError(`Course with course code ${courseCode} not found`, 404)
      );

    if (!isValidSession(session))
      return next(new AppError("Invalid format for session", 400));

    const urls: string[] = [];
    for (const file of files as Express.Multer.File[]) {
      urls.push(file.path);
    }

    const images = [];

    for (const url of urls) {
      const image = {
        url,
        courseCode,
        session,
      };

      images.push(image);
    }

    const result = await ImageModel.create(images);

    return successResponse(res, 201, "Created images successfully", result);
  } catch (error) {
    return next(error);
  }
};

export default uploadImages;
