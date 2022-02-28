import chai from "chai";
import chaiHttp from "chai-http";
import CourseController from "../../../controllers/courseController";
import { MockCourseService } from "../../mocks/mockCourseService";
const { assert } = chai;

const mockCourseService = new MockCourseService();
const courseController = new CourseController(mockCourseService);

chai.use(chaiHttp);

describe("Get all Courses Unit test", () => {
  it("Should get all courses", (done) => {
    done();
  });
});
