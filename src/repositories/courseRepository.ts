import { isNullableType } from "graphql";
import { FilterQuery } from "mongoose";
import AppError from "../errors/AppError";
import { Course } from "../models/Course";
import { PaginatedResult } from "../utils/types";
import Repository from "./baseRepository";

class CourseRepository extends Repository<Course> {
  async create(
    code: string,
    name: string,
    description: string
  ): Promise<Course> {
    const course = await this.model.create({
      code,
      name,
      description,
    });

    return course;
  }

  async findById(id: string): Promise<Course | null> {
    const course = await this.model.findById(id);
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  async findAnddelete(id: string) {
    await this.model.deleteMany({ _id: id });
  }

  async findAndUpdate(
    id: string,
    name: string,
    description: string
  ): Promise<Course> {
    const course = await this.model.findById(id);
    if (!course) throw new AppError("Course not found", 404);

    if (name && name.length > 3) course.name = name;
    if (description && description.length > 5) course.description = description;

    await course.save();

    return course;
  }

  async getMultiple(
    filter: FilterQuery<Course>,
    page: number,
    limit: number,
    sort: number //-1 for descending order of course code, 1 for ascending
  ): Promise<PaginatedResult<Course>> {
    const totalDocuments = await this.model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = page;
    const nextPage = page + 1 <= totalPages ? page + 1 : null;
    const prevPage = page - 1 >= 0 ? page - 1 : null;

    const data = await this.model
      .find(filter)
      .sort({ code: sort })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      totalDocuments,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
      data,
    };
  }
}

export default CourseRepository;
