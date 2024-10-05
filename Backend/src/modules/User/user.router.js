import { Router } from "express";
import * as userController from './controller/user.js'
import {auth} from "../../middleware/auth.js";
import {asyncErrorHandler} from "../../utils/errorHandler.js";

const router = Router();

router.get("/profile", auth, asyncErrorHandler(userController.userProfile))

export default router
