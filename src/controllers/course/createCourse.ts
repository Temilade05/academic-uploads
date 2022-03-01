import { RequestHandler } from "express";
import successResponse from "../../utils/successResponse";
import removeSpaces from "../../utils/removeSpaces";
import AppError from "../../errors/AppError";
import CourseModel from "../../models/Course";

const createCourse: RequestHandler = async (req, res, next) => {
  let { code, name, description } = req.body;

  try {
    //removes all spaces from the code
    code = removeSpaces(code);
    code = (code as string).toUpperCase();

    //saves the new course
    let course;
    course = await CourseModel.findOne({ code });

    if (course) throw new AppError("Course already exists", 400);

    course = await CourseModel.create({
      code,
      name: name || "",
      description: description || "",
    });

    return successResponse(res, 201, "Course created successfully", course);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export default createCourse;
