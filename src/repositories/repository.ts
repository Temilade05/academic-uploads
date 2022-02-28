import { Model, FilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { PaginatedResult } from "../utils/types";
import AppError from "../errors/AppError";

export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findByIdAndDelete(id: string): Promise<void>;
  findAndDelete(filter: FilterQuery<T>): Promise<void>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<UpdateWriteOpResult>;
  find(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
    sort: any
  ): Promise<PaginatedResult<T>>;
}
class Repository<T> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    const course = await this.model.findById(id);
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  async findByIdAndDelete(id: string) {
    await this.model.findByIdAndDelete(id);
  }

  async findAndDelete(filter: FilterQuery<T>) {
    await this.model.deleteMany(filter);
  }
  async findOne(filter: FilterQuery<T> = {}): Promise<T | null> {
    const course = await this.model.findOne(filter);
    return course;
  }

  async findAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    const result = await this.model.updateMany(filter, update);
    return result;
  }
  async find(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
    sort: any
  ): Promise<PaginatedResult<T>> {
    const totalDocuments = await this.model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = page;
    const nextPage = page + 1 <= totalPages ? page + 1 : null;
    const prevPage = page - 1 >= 0 ? page - 1 : null;

    const data = await this.model
      .find(filter)
      .sort(sort)
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

export default Repository;
