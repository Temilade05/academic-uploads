import { Document, model, Model, Schema } from "mongoose";
import constants from "../utils/constants";

const { COURSE } = constants.mongooseModels;

export interface Course extends Document {
  code: string;
  name: string;
  description: string;
}

const courseSchema = new Schema<Course>({
  code: {
    type: String,
    required: [true, "Course code is required"],
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

const CourseModel: Model<Course> = model<Course>(COURSE, courseSchema);
export default CourseModel;
