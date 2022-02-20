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
}

export default CourseRepository;
