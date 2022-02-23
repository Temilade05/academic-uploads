import { Document, PopulatedDoc } from "mongoose";
import { Image } from "./Image";

export interface Submission extends Document {
  session: string;
  courseCode: string;
}
