import { Router } from "express";
import * as messageController from './controller/message.js'

const router = Router();

router.post("/", messageController.createMessage)
router.get("/:chatId", messageController.getAllMessages)

export default router
