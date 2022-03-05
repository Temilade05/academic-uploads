import { RequestHandler } from "express";
import ImageModel from "../../models/Image";
import findAndPaginate from "../../utils/findAndPaginate";
import successResponse from "../../utils/successResponse";
import constants from "../../utils/constants";

const { PENDING } = constants.imageStatus;

const getNonApprovedImages: RequestHandler = async (req, res, next) => {
  const { page, limit, courseCode, search } = req.query;

  let _page = parseInt(page as string) || 1;
  let _limit = parseInt(limit as string) || 10;

  _page = Math.max(_page, 1); //in case the number was less than 1
  _limit = Math.max(1, _limit); //same as above

  const data = await findAndPaginate(
    ImageModel,
    { status: PENDING },
    _page,
    _limit,
    null
  );
  return successResponse(
    res,
    200,
    `Sucessfully returned ${data.data.length} result(s)`,
    data
  );
};

export default getNonApprovedImages;
