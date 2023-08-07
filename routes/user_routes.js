import express from "express";
import { check_login, register, updatefields } from "../controllers/user_controller.js";
import { check_register } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",check_register, register);
router.post("/check_login", check_login);
router.post("/updatefields", updatefields);

export default router;