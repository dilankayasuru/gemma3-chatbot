import { Router } from "express";
import { checkUser, login, register } from "../controllers/userController";

const router = Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/check-user', checkUser);

export default router;