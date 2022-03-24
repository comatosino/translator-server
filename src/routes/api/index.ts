import { Router } from "express";
import { deleteTranslation, translate } from "../../controllers/api";

const router = Router();

router.post("/translate", translate);

router.delete("/translations/:id", deleteTranslation)

export default router;
