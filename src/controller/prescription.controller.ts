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
 * Get all prescriptions for user
 * @method getAllUsersPrescriptions
 * @memberof prescriptionController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllUsersPrescriptions = async (req: Request, res: Response) => {
    const { id:userId } = (<any>req).user;

    const foundPrescription = await pool.query(PrescriptionQueries.getPrescriptions, [userId]);

    if (foundPrescription.rows.length === 0) {
        return res.status(404).json({status: "failed", message: "Prescriptions does not exist"});
    }

    const data = foundPrescription.rows

    return res.status(200).json({status: "success", data});

}


/**
 * Get single prescription
 * @method getSinglePrescription
 * @memberof prescriptionController
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

    return res.status(200).json({status: "success", data});

}



/**
 * Update prescription
 * @method updatePrescription
 * @memberof prescriptionController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const updatePrescription = async (req: Request, res: Response) => {
    const {id} = req.params
    const {drugName, dose, unit, drugForm, withFood,takeFor} = req.body


    const foundPrescription = await pool.query(PrescriptionQueries.getPrescription, [id]);

    if (!foundPrescription.rows[0]) {
        return res.status(404).json({status: "failed", message: "Prescription does not exist"});
    }

    const updatedPrescription = await pool.query(PrescriptionQueries.updatePrescription,
        [
            (drugName || foundPrescription?.rows[0].drug_name),
            dose || foundPrescription?.rows[0].dose,
            unit || foundPrescription?.rows[0].unit,
             drugForm || foundPrescription?.rows[0].drug_form,
            withFood || foundPrescription?.rows[0].with_food,
            takeFor || foundPrescription?.rows[0].take_for,
            id])


    const data = {
        id: foundPrescription?.rows[0].id,
        drugName: updatedPrescription?.rows[0].drug_name,
        userId: foundPrescription?.rows[0].user_id,
        dose: updatedPrescription ?.rows[0].dose,
        unit:updatedPrescription ?.rows[0].unit,
        drugForm: updatedPrescription ?.rows[0].drug_form,
        withFood: updatedPrescription ?.rows[0].with_food,
        takeFor: updatedPrescription ?.rows[0].take_for,

    };

    return res.status(200).json({status: "success", data});

}


/**
 * Delete prescription
 * @method deletePrescription
 * @memberof prescriptionController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const deletePrescription = async (req: Request, res: Response) => {
    const { id} = req.params;

    const foundPrescription = await pool.query(PrescriptionQueries.getPrescription, [id]);

    if (!foundPrescription.rows[0]) {
        return res.status(404).json({status: "failed", message: "Prescriptions does not exist"});
    }

    await pool.query(PrescriptionQueries.deletePrescription, [foundPrescription.rows[0].id]);

    return res.status(200).json({status: "success", message:"Prescription deleted successfully"});

}

