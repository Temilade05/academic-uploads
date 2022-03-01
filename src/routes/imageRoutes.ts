import { Router } from "express";
import { deleteImageFromCloudinary, upload } from "../utils/cloudinaryUpload";
import joiMiddleware from "../middleware/joiMiddleware";
import { createImageSchema } from "../validators/image";
import uploadImages from "../controllers/image/uploadImages";

const router = Router();

router.post(
  "/upload",
  upload.array("images", 20),
  joiMiddleware(createImageSchema),
  uploadImages
);

export default router;
