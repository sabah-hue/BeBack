
import { Router } from "express";
import * as chatController from './controller/chat.js'
import asyncHandler from 'express-async-handler'


const router = Router();

router.post("/", asyncHandler(chatController.createChat))
router.get("/:userId", asyncHandler(chatController.getUserChat))
router.get("/find/:firstId/:secondId", asyncHandler(chatController.findChat))

export default router
