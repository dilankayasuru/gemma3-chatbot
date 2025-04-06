import { Router } from "express";
import { chat, getMessages } from "../controllers/chatController";

const router = Router();

router.post('/chat', chat);
router.post('/messages', getMessages);

export default router;
