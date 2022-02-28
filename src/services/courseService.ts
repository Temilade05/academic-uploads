import CourseRepository, {
  ICourseRepository,
} from "../repositories/courseRepository";
import removeSpaces from "../utils/removeSpaces";
import AppError from "../errors/AppError";
import { Course } from "../models/Course";
import { PaginatedResult } from "../utils/types";
import { FilterQuery } from "mongoose";
import Repository, { IRepository } from "../repositories/repository";

class CourseService {
  private courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  async createCourse(
    code: string,
    name: string | undefined,
    description: string | undefined
  ): Promise<Course | void> {
    //returns an error if no code is given
    if (!code) throw new AppError("course code is required", 400);

    //removes all spaces from the code
    code = removeSpaces(code);
    code = (code as string).toUpperCase();

    //saves the new course
    let course;
    course = await this.courseRepository.findOne({ code });

    if (course) throw new AppError("Course already exists", 400);

    course = await this.courseRepository.create(
      code,
      name || "",
      description || ""
    );

    return course;
  }

  async getAllCourses(
    page: string | undefined,
    limit: string | undefined,
    search: string | undefined,
    sort: string | undefined
  ): Promise<PaginatedResult<Course>> {
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
      { code: parseInt(sort) }
    );

    return data;
  }
}

export default CourseService;
