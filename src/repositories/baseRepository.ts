import { Model } from "mongoose";
class Repository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
}

export default Repository;
