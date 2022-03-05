import { Router } from "express";
import { getUser, login, register, logout } from "../../controllers/auth";

const router = Router();

router.get("/user", getUser);

router.post("/login", login);
router.post("/register", register);

router.delete("/logout", logout);

export default router;
