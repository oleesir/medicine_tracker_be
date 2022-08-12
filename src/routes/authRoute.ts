import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {loginUser, signupUser} from "../controller/auth.controller";



const router:Router = Router()

router.post("/signup", asyncErrorHandler(signupUser));
router.post("/login", asyncErrorHandler(loginUser));


export default router;