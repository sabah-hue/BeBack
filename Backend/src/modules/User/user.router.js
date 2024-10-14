import { Router } from "express";
import * as userController from './controller/user.js'
import {auth} from "../../middleware/auth.js";
import {asyncErrorHandler} from "../../utils/errorHandler.js";
import {myMulter , fileValidation} from '../../utils/upload.js'


const router = Router();

router.get("/profile/:id", asyncErrorHandler(userController.userProfile))
router.put("/update/:id", myMulter(fileValidation.image).single('image'), asyncErrorHandler(userController.userUpdateProfile))
router.post("/contact", asyncErrorHandler(userController.sendMessage))
router.put("/chat/update/:id", asyncErrorHandler(userController.updateUserChat))

export default router
