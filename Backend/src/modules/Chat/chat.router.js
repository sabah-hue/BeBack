
import { Router } from "express";
import * as chatController from './controller/chat.js'
import asyncHandler from 'express-async-handler'


const router = Router();

router.post("/room", asyncHandler(chatController.createRoom))
router.get("/rooms/:roomId", asyncHandler(chatController.getRoom))
router.get("/rooms", asyncHandler(chatController.getAllRooms))
router.put("/room", asyncHandler(chatController.updateRoom))
router.delete("/room", asyncHandler(chatController.deleteRoom))
router.post("/room/join", asyncHandler(chatController.joinRoom))

export default router
