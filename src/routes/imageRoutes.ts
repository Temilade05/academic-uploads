import { Router } from "express";
import { deleteImageFromCloudinary, upload } from "../utils/cloudinaryUpload";
import ServiceLocator from "../di/serviceLocator";
import joiMiddleware from "../middleware/joiMiddleware";
import { createImageSchema } from "../validators/image";

const router = Router();
const imageController = ServiceLocator.imageController;

router.post(
  "/upload",
  upload.array("images", 20),
  joiMiddleware(createImageSchema),
  imageController.uploadImages
);

export default router;
