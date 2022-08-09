import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {signupUser} from "../controller/auth.controller";



const router:Router = Router()

router.post("/signup", asyncErrorHandler(signupUser));


export default router;