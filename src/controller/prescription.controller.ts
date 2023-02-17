import {Request, Response} from "express";
import models from "../database/models";
import {convertTime} from "../utils/convertTime";
import {Op} from "sequelize";
import dayjs from "dayjs";


/**
 * Create prescription for user
 * @method createPrescription
 * @memberof prescriptionController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createPrescription = async (req: Request, res: Response) => {
    const { user_id: userId } = (<any>req).user;
    const { name, dose, unit, endDate, numOfIntake, firstTimer, secondTimer, thirdTimer, fourthTimer } = req.body

    const newPrescription = await models.Prescription.create({
            user_id:userId,
            drug_name: name,
            dose,
            unit,
            num_of_intake: numOfIntake,
            end_date: dayjs(endDate).toISOString(),
            first_timer: convertTime(firstTimer),
            second_timer:convertTime(secondTimer),
            third_timer: convertTime(thirdTimer),
            fourth_timer: convertTime(fourthTimer),
            status:'active'
        }
    )

    return res.status(201).json({ status: "success", newPrescription });
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
    const { user_id: userId }  = (<any>req).user;

    const foundUser = await models.User.findByPk(userId);

    const { count , rows } = await models.Prescription.findAndCountAll({
        where:{ user_id: userId },
        raw: true,
        offset: 0,
        limit: 10
    });

    if (rows.length === 0) {
        return res.status(404).json({ status: "failed", message: "Prescriptions does not exist" });
    }

    return res.status(200).json({ status: "success", data: rows, count });
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
    const { prescriptionId } = req.params;

    const foundPrescription = await models.Prescription.findByPk(prescriptionId);

    if (!foundPrescription) {
        return res.status(404).json({ status: "failed", message: "Prescription does not exist" });
    }

    return res.status(200).json({ status: "success", data:foundPrescription });

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
    const { prescriptionId } = req.params;

        const { name, dose, unit, endDate, firstTimer, numOfIntake, secondTimer, thirdTimer,fourthTimer } = req.body;

        const foundPrescription = await models.Prescription.findByPk(prescriptionId);

        if (!foundPrescription) {
            return res.status(404).json({ status: "failed", message: "Prescription does not exist" });
        }


        foundPrescription.drug_name = name || foundPrescription?.drug_name;
        foundPrescription.dose = dose || foundPrescription?.dose;
        foundPrescription.unit = unit || foundPrescription?.unit;
        foundPrescription.num_of_intake = numOfIntake || foundPrescription?.num_of_intake,
        foundPrescription.end_date = endDate || foundPrescription?.end_date;
        foundPrescription.first_timer = convertTime(firstTimer) || foundPrescription?.first_timer;
        foundPrescription.second_timer = convertTime(secondTimer) || foundPrescription?.second_timer;
        foundPrescription.third_timer = convertTime(thirdTimer) || foundPrescription?.third_timer;
        foundPrescription.fourth_timer = convertTime(fourthTimer) || foundPrescription?.fourth_timer;

        await foundPrescription.save();

        return res.status(200).json({ status: "success", data: foundPrescription });

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
    const { prescriptionId } = req.params;

    const foundPrescription = await models.Prescription.findByPk(prescriptionId);

    if (!foundPrescription) {
        return res.status(404).json({ status: "failed", message: "Prescription does not exist" });
    }

    await foundPrescription.destroy({ where: { prescription_id : foundPrescription?.prescription_id }, force: true });

    return res.status(200).json({status: "success", message: "Prescription deleted successfully"});

}

