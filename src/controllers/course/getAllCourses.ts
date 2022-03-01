import { RequestHandler } from "express";
import successResponse from "../../utils/successResponse";
import { FilterQuery } from "mongoose";
import CourseModel, { Course } from "../../models/Course";
import { PaginatedResult } from "../../utils/types";
import findAndPaginate from "../../utils/findAndPaginate";

const getAllCourses: RequestHandler = async (req, res, next) => {
  let {
    search, // search string
    sort, // -1 for descending order and 1 for ascending order
    page, // page of results to show
    limit, // number of results per page
  } = req.query;

  const filter: FilterQuery<Course> = {}; //filter object for the query

  if (search) {
    let regex = new RegExp(`.*${search}.*`, "i");
    filter.code = regex;
  }

  //if no value or invalid value is given for sort then return in ascending order
  if (!sort) {
    sort = "1";
  } else {
    if (sort !== "1" && sort !== "-1") sort = "1";
  }

  //if page or limit are not defined give them real positve default values
  let _page = parseInt(page as string) || 1;
  let _limit = parseInt(limit as string) || 10;

  // if page or limit were defined with negaitve values increase the values to default positive values
  _page = Math.max(1, _page);
  _limit = Math.max(10, _limit);

  const data: PaginatedResult<Course> = await findAndPaginate(
    CourseModel,
    filter,
    _page,
    _limit,
    { code: parseInt(sort) }
  );
  return successResponse(
    res,
    200,
    `Successfully fetched ${data.data.length} documents`,
    data
  );
};

export default getAllCourses;
