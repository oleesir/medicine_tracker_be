import {Request, Response} from "express";
import pool from "../../db";
import PrescriptionQueries from "../queries/prescriptionQueries";

/**
 * Signup a new user
 * @method signupUser
 * @memberof authController
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