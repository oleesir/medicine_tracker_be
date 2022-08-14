import { Router } from "express";
import authRoute from "./authRoute";
import prescriptionRoute from "./prescriptionRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/prescription",prescriptionRoute)


export default router;