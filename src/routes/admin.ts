import { Router } from "express";
import getNonApprovedImages from "../controllers/admin/getNonAprrovedImages";
import login from "../controllers/admin/login";
import { requireSignIn } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.get("/pending-pqs", requireSignIn, getNonApprovedImages);

export default router;
