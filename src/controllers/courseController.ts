import CourseRepository from "../repositories/courseRepository";
import CourseModel, { Course } from "../models/Course";
import { RequestHandler } from "express";
import AppError from "../errors/AppError";
import successResponse from "../utils/successResponse";
import removeSpaces from "../utils/removeSpaces";
import { PaginatedResult } from "../utils/types";
import { FilterQuery } from "mongoose";

class CourseController {
  courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  createCourse: RequestHandler = async (req, res, next) => {
    let { code, name, description } = req.body;
    if (!code) return next(new AppError("course code is required", 400));
    code = removeSpaces(code);
    const course = await this.courseRepository.create(
      code,
      name || "",
      description || ""
    );

    return successResponse(res, 201, "Course created successfully", course);
  };

  getAllCourses: RequestHandler = async (req, res, next) => {
    let { search, sort, page, limit } = req.query;

    const filter: FilterQuery<Course> = {};

    if (search) {
      let regex = new RegExp(`.*${search}.*`, "i");
      filter.code = regex;
    }

    //if no value or invalid value is given for sort then return in ascending order
    if (!sort) {
      sort = "1";
    } else {
      if (sort !== "1" && sort !== "-1") sort = "1";
    }

    //if page or limit are not defined give them real positve default values
    let _page = parseInt(page as string) || 1;
    let _limit = parseInt(limit as string) || 10;

    // if page or limit were defined with negaitve values increase the values to default positive values
    _page = Math.max(1, _page);
    _limit = Math.max(10, _limit);

    const data: PaginatedResult<Course> =
      await this.courseRepository.getMultiple(
        filter,
        _page,
        _limit,
        parseInt(sort)
      );

    return successResponse(
      res,
      200,
      `Successfully fetched ${data.data.length} documents`,
      data
    );
  };
}

export default CourseController;
