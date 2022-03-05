import { FilterQuery, Model } from "mongoose";
import { PaginatedResult } from "./types";

const findAndPaginate = async <T>(
  model: Model<T>,
  filter: FilterQuery<T>,
  page: number,
  limit: number,
  sort: any
): Promise<PaginatedResult<T>> => {
  const totalDocuments = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalDocuments / limit);
  const currentPage = page;
  const nextPage = page + 1 <= totalPages ? page + 1 : null;
  const prevPage = page - 1 >= 0 ? page - 1 : null;

  let query = model.find(filter);
  if (sort) {
    query = query.sort(sort);
  }
  query.skip((page - 1) * limit).limit(limit);

  const data = await query;

  return {
    totalDocuments,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    data,
  };
};

export default findAndPaginate;
