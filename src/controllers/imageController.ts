import ImageService, { IImageService } from "../services/imageService";
import { RequestHandler } from "express";
import successResponse from "../utils/successResponse";

class ImageController {
  private imageService: IImageService;

  constructor(imageService: IImageService) {
    this.imageService = imageService;
  }

  uploadImages: RequestHandler = async (req, res, next) => {
    const files = req.files;
    const { courseCode, session } = req.body;

    try {
      const data = await this.imageService.createImages(
        files as Express.Multer.File[] | undefined,
        courseCode,
        session
      );
      return successResponse(res, 201, "Created images successfully", data);
    } catch (error) {
      return next(error);
    }
  };

  updateImages: RequestHandler = async (req, res, next) => {
    const { session, courseCode, status, ids } = req.body;
    try {
      const result = await this.imageService.updateImages(
        ids,
        session,
        courseCode,
        status
      );
    } catch (error) {
      return next(error);
    }
  };
}

export default ImageController;
