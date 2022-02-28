import CourseModel, { Course } from "../../models/Course";
import { ICourseService } from "../../services/courseService";
import { PaginatedResult } from "../../utils/types";

export class MockCourseService implements ICourseService {
  courses: Course[] = [];

  createCourse(
    code: string,
    name: string | undefined,
    description: string | undefined
  ): Promise<void | Course> {
    const course = new CourseModel({
      code,
      name: name || "",
      description: description || "",
    });

    this.courses.push(course);
    return new Promise((resolve) => {
      resolve(course);
    });
  }
  getAllCourses(
    page: string | undefined,
    limit: string | undefined,
    search: string | undefined,
    sort: string | undefined
  ): Promise<PaginatedResult<Course>> {
    const data: PaginatedResult<Course> = {
      totalDocuments: 10,
      totalPages: 3,
      currentPage: 1,
      nextPage: 2,
      prevPage: null,
      data: this.courses,
    };

    return new Promise((resolve) => {
      resolve(data);
    });
  }
}
