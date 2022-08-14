import {Request, Response} from "express";
import pool from "../../db";
import PrescriptionQueries from "../queries/prescriptionQueries";

/**
 * Create prescription for user
 * @method createPrescription
 * @memberof prescriptionController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createPrescription = async (req: Request, res: Response) => {
    const { id:userId } = (<any>req).user;
    const {name, dose, unit, drugForm, withFood,takeFor} = req.body

    const newPrescription = await pool.query(PrescriptionQueries.createPrescription, [userId, name, dose,unit,drugForm,withFood,takeFor])

    const data = {
        id: newPrescription?.rows[0].id,
        name: newPrescription?.rows[0].name,
        userId: newPrescription?.rows[0].user_id,
        dose: newPrescription?.rows[0].dose,
        unit: newPrescription?.rows[0].unit,
        drugForm: newPrescription?.rows[0].drug_form,
        withFood: newPrescription?.rows[0].with_food,
        takeFor: newPrescription?.rows[0].take_for,

    };

    return res.status(201).json({status: "success", data});

}



/**
 * Get single prescription
 * @method signupUser
 * @memberof authController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getSinglePrescription = async (req: Request, res: Response) => {
    const {id} = req.params

    const foundPrescription = await pool.query(PrescriptionQueries.getPrescription, [id]);

    if (!foundPrescription.rows[0]) {
        return res.status(404).json({status: "failed", message: "Prescription does not exist"});
    }

    const data = {
        id: foundPrescription?.rows[0].id,
        name: foundPrescription?.rows[0].name,
        userId: foundPrescription?.rows[0].user_id,
        dose: foundPrescription?.rows[0].dose,
        unit: foundPrescription?.rows[0].unit,
        drugForm: foundPrescription?.rows[0].drug_form,
        withFood: foundPrescription?.rows[0].with_food,
        takeFor: foundPrescription?.rows[0].take_for,

    };

    return res.status(201).json({status: "success", data});

}