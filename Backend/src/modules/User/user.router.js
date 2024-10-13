import { Router } from "express";
import * as userController from './controller/user.js'
import {auth} from "../../middleware/auth.js";
import {asyncErrorHandler} from "../../utils/errorHandler.js";

const router = Router();

router.get("/profile/:id", asyncErrorHandler(userController.userProfile))
router.post("/contact", asyncErrorHandler(userController.sendMessage))

export default router
