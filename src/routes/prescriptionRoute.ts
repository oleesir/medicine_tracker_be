import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import { verifyToken } from "../middleware/auth.middleware";
import {
    createPrescription,
    getAllUsersPrescriptions,
    getSinglePrescription,
    updatePrescription,
    deletePrescription
} from "../controller/prescription.controller";
import { validate } from "../middleware/validation.middleware";
import { schemas } from "../utils/schemas";



const router:Router = Router()

router.post("/",verifyToken,validate(schemas.prescriptionSchema), asyncErrorHandler(createPrescription));
router.put("/:prescriptionId",verifyToken,validate(schemas.prescriptionSchema), asyncErrorHandler(updatePrescription));
router.get("/",verifyToken, asyncErrorHandler(getAllUsersPrescriptions));
router.get("/:prescriptionId",verifyToken, asyncErrorHandler(getSinglePrescription));
router.delete("/:prescriptionId",verifyToken, asyncErrorHandler(deletePrescription ));


export default router;