import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {loginUser, signupUser} from "../controller/auth.controller";
import {validate} from "../middleware/validation.middleware";
import {schemas} from "../utils/schemas";




const router:Router = Router()

router.post("/signup",validate(schemas.registerSchema), asyncErrorHandler(signupUser));
router.post("/login",validate(schemas.loginSchema), asyncErrorHandler(loginUser));


export default router;