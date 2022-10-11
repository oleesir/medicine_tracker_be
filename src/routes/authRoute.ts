import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {loginUser, signupUser} from "../controller/auth.controller";
import {validateLogin, validateSignup} from "../middleware/validation.middleware";



const router:Router = Router()

router.post("/signup",validateSignup, asyncErrorHandler(signupUser));
router.post("/login",validateLogin, asyncErrorHandler(loginUser));


export default router;