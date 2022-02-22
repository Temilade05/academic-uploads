import { Document, model, PopulatedDoc, Schema } from "mongoose";
import constants from "../utils/constants";

const { IMAGE } = constants.mongooseModels;
const { PENDING, APPROVED, DISAPPROVED } = constants.imageStatus;

export interface Image extends Document {
  url: string;
  courseCode: string;
  session: string;
  status: string;
}

const imageSchema = new Schema<Image>(
  {
    url: {
      type: String,
    },

    courseCode: {
      type: String,
      required: [true, "Course code is required"],
    },

    session: {
      type: String,
      required: [true, "Session is required"],
    },
    status: {
      type: String,
      enum: [APPROVED, DISAPPROVED, PENDING],
      default: PENDING,
    },
  },
  { timestamps: true }
);

const ImageModel = model(IMAGE, imageSchema);
export default ImageModel;
