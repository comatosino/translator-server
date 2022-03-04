import { Router } from "express";
import { signup, signin, signout } from "../../controllers/auth";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/signout", signout);

export default router;
