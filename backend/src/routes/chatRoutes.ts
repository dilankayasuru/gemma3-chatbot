import { Router } from "express";
import { chat, getMessages } from "../controllers/chatController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post('/chat', authenticate, chat);
router.post('/messages', authenticate, getMessages);

export default router;
