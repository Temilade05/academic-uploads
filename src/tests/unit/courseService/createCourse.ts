import chai from "chai";
import { Course } from "../../../models/Course";
import CourseService from "../../../services/courseService";
import removeSpaces from "../../../utils/removeSpaces";
import { MockCourseRepository } from "../../mocks/mockCourseRepository";

const { assert } = chai;

const mockCourseRepository = new MockCourseRepository();
const courseService = new CourseService(mockCourseRepository);

describe("Create course test", () => {
  it("Testing course controller create course", (done) => {
    let code = "eeg 534",
      name = "The coutse name",
      description = "The course description";
    courseService
      .createCourse(code, name, description)
      .then((course) => {
        assert.property(course, "_id");
        assert.equal(description, (course as Course).description);
        assert.equal(removeSpaces(code).toUpperCase(), (course as Course).code);
        done();
      })
      .catch((error) => {
        console.log(error);
        done();
      });
  });
});
