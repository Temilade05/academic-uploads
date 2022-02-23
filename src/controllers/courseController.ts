import CourseRepository from "../repositories/courseRepository";
import CourseModel, { Course } from "../models/Course";
import { RequestHandler } from "express";
import AppError from "../errors/AppError";
import successResponse from "../utils/successResponse";
import removeSpaces from "../utils/removeSpaces";
import { PaginatedResult } from "../utils/types";
import { FilterQuery } from "mongoose";
import CourseService from "../services/courseService";

class CourseController {
  private courseService: CourseService; //repository for access to database operations

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  //creates a course
  createCourse: RequestHandler = async (req, res, next) => {
    //takes parameters from the request body
    let { code, name, description } = req.body;

    try {
      const course = await this.courseService.createCourse(
        code,
        name,
        description
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

    const data = await this.courseService.getAllCourses(
      page as string | undefined,
      limit as string | undefined,
      search as string | undefined,
      sort as string | undefined
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
