import { Router } from "express";
import { deleteImageFromCloudinary, upload } from "../utils/cloudinaryUpload";
import joiMiddleware from "../middleware/joiMiddleware";
import { createImageSchema } from "../validators/image";
import uploadImages from "../controllers/image/uploadImages";
import getImages from "../controllers/image/getImages";

const router = Router();

router.post(
  "/upload",
  upload.array("images", 20),
  joiMiddleware(createImageSchema),
  uploadImages
);

router.get("/images", getImages);

export default router;
