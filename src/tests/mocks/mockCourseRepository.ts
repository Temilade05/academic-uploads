import CourseModel, { Course } from "../../models/Course";
import { ICourseRepository } from "../../repositories/courseRepository";
import { ICourseService } from "../../services/courseService";
import { PaginatedResult } from "../../utils/types";
import { MockRepository } from "./mockRepository";

export class MockCourseRepository
  extends MockRepository<Course>
  implements ICourseRepository
{
  async create(
    code: string,
    name: string,
    description: string
  ): Promise<Course> {
    const course = new CourseModel({
      _id: String(Math.ceil(Math.random() * new Date().getTime())),
      code,
      name: name || "",
      description: description || "",
    });

    this.documents.push(course);

    return course;
  }
  findAndUpdateCourse(
    id: string,
    name: string,
    description: string
  ): Promise<Course> {
    throw new Error("Method not implemented.");
  }
}
