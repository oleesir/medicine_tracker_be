import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {verifyToken} from "../middleware/auth.middleware";
import {
    createPrescription,
    getAllUsersPrescriptions,
    getSinglePrescription,
    updatePrescription
} from "../controller/prescription.controller";


const router:Router = Router()

router.post("/",verifyToken, asyncErrorHandler(createPrescription));
router.put("/:id",verifyToken, asyncErrorHandler(updatePrescription));
router.get("/",verifyToken, asyncErrorHandler(getAllUsersPrescriptions));
router.get("/:id",verifyToken, asyncErrorHandler(getSinglePrescription));





export default router;