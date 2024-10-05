import { Router } from "express";
import * as interviewController from './controller/interview.js'

const router = Router();

router.get("/", interviewController.getInterviewModule)

export default router