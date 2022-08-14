import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {createPrescription} from "../controller/prescription.controller";
import {verifyToken} from "../middleware/auth.middleware";



const router:Router = Router()

router.post("/",verifyToken, asyncErrorHandler(createPrescription));



export default router;