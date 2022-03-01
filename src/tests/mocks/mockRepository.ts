import { UpdateResult } from "mongodb";
import { Document, FilterQuery, UpdateQuery } from "mongoose";
import { IRepository } from "../../repositories/repository";
import { PaginatedResult } from "../../utils/types";

export class MockRepository<T> implements IRepository<T> {
  protected documents: T[] = [];

  async findById(id: string): Promise<T | null> {
    for (const document of this.documents) {
      if ((document as any)._id === id) {
        return document;
      }
    }
    return null;
  }
  async findByIdAndDelete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAndDelete(filter: FilterQuery<T>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    const valid = [];

    for (const document of this.documents) {
      const props = Object.keys(filter);
      console.log("props = ", props);
      let isValid = true;
      for (const prop of props) {
        if (prop[0] === "$") continue;
        isValid = isValid && (document as any)[prop] === (filter as any)[prop];
      }

      if (isValid) {
        valid.push(document);
      }
    }

    if (valid.length === 0) return null;
    return valid[0];
  }
  findAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<UpdateResult> {
    throw new Error("Method not implemented.");
  }
  find(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
    sort: any
  ): Promise<PaginatedResult<T>> {
    throw new Error("Method not implemented.");
  }
}
