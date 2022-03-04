import { Router } from "express";
import { translate } from "../../controllers/api";

const router = Router();

router.post("/translate", translate);

export default router;
