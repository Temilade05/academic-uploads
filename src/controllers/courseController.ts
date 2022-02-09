import CourseRepository from "../repositories/courseRepository";
import CourseModel, { Course } from "../models/Course";
import { RequestHandler } from "express";
import AppError from "../errors/AppError";
import successResponse from "../utils/successResponse";
import removeSpaces from "../utils/removeSpaces";
import { PaginatedResult } from "../utils/types";
import { FilterQuery } from "mongoose";

class CourseController {
  courseRepository: CourseRepository; //repository for access to database operations

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  //creates a course
  createCourse: RequestHandler = async (req, res, next) => {
    //takes parameters from the request body
    let { code, name, description } = req.body;

    //returns an error if no code is given
    if (!code) return next(new AppError("course code is required", 400));

    //removes all spaces from the code
    code = removeSpaces(code);
    code = (code as string).toUpperCase();

    try {
      //saves the new course
      let course;
      course = await this.courseRepository.findOne({ code });

      if (course) return next(new AppError("Course already exists", 400));

      course = await this.courseRepository.create(
        code,
        name || "",
        description || ""
      );

      return successResponse(res, 201, "Course created successfully", course);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getAllCourses: RequestHandler = async (req, res, next) => {
    let {
      search, // search string
      sort, // -1 for descending order and 1 for ascending order
      page, // page of results to show
      limit, // number of results per page
    } = req.query;

    const filter: FilterQuery<Course> = {}; //filter object for the query

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

    const data: PaginatedResult<Course> = await this.courseRepository.find(
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
