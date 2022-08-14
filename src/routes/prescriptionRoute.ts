import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {createPrescription, getSinglePrescription} from "../controller/prescription.controller";
import {verifyToken} from "../middleware/auth.middleware";



const router:Router = Router()

router.post("/",verifyToken, asyncErrorHandler(createPrescription));
router.get("/:id",verifyToken, asyncErrorHandler(getSinglePrescription));



export default router;