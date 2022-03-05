import { Router } from "express";
import getNonApprovedImages from "../controllers/admin/getNonAprrovedImages";
import login from "../controllers/admin/login";
import updateImage from "../controllers/admin/updateImage";
import { requireSignIn } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.get("/pending-pqs", requireSignIn, getNonApprovedImages);
router.patch("/update-image/:imageId", requireSignIn, updateImage);

export default router;
