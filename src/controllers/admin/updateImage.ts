import { RequestHandler } from "express";
import AppError from "../../errors/AppError";
import ImageModel from "../../models/Image";
import constants from "../../utils/constants";
import successResponse from "../../utils/successResponse";

const { DISAPPROVED, APPROVED } = constants.imageStatus;

const updateImage: RequestHandler = async (req, res, next) => {
  const { status } = req.body;
  const { imageId } = req.params;

  if (!imageId) return next(new AppError("image id is required", 400));

  //find image with said id
  const image = await ImageModel.findById(imageId);

  if (!image) {
    return next(new AppError("Image not found", 404));
  }
  if (!status) return next(new AppError("Status is required", 400));

  const validstatus =
    String(status).toLowerCase() === APPROVED ||
    String(status).toLowerCase() == DISAPPROVED;

  if (!validstatus) {
    return next(new AppError("Status is invalid", 400));
  }

  //update the image status.
  image.status = status;

  await image.save();
  return successResponse(
    res,
    200,
    `updated image status to ${image.status}`,
    null
  );
};

export default updateImage;
