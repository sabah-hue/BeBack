import { Router } from "express";
import * as userController from './controller/user.js'
import {auth} from "../../middleware/auth.js";
import {asyncErrorHandler} from "../../utils/errorHandler.js";

const router = Router();

router.get("/profile/:id", asyncErrorHandler(userController.userProfile))
router.get("/update/:id", asyncErrorHandler(userController.userUpdateProfile))
router.post("/contact", asyncErrorHandler(userController.sendMessage))
router.post("/chat/update/:id", asyncErrorHandler(userController.updateUserChat))

export default router
