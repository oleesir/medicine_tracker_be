// import {Request, Response} from "express";
// import pool from "../dbs";
// import PrescriptionQueries from "../queries/prescriptionQueries";
// import {convertTime} from "../utils/convertTime";
//
//
// /**
//  * Create prescription for user
//  * @method createPrescription
//  * @memberof prescriptionController
//  * @param {object} req
//  * @param {object} res
//  * @returns {(function|object)} Function next() or JSON object
//  */
// export const createPrescription = async (req: Request, res: Response) => {
//     const {id: userId} = (<any>req).user;
//     const {name, dose, unit, endDate, firstTimer, secondTimer, thirdTimer} = req.body
//
//     const newPrescription = await pool.query(PrescriptionQueries.createPrescription, [userId, name, dose, unit, endDate, convertTime(firstTimer), convertTime(secondTimer), convertTime(thirdTimer), "active"])
//
//
//     const data = {
//         id: newPrescription?.rows[0].id,
//         name: newPrescription?.rows[0].drug_name,
//         userId: newPrescription?.rows[0].user_id,
//         dose: newPrescription?.rows[0].dose,
//         unit: newPrescription?.rows[0].unit,
//         endDate,
//         firstTimer,
//         secondTimer,
//         thirdTimer,
//         status: newPrescription?.rows[0].status
//     };
//
//     return res.status(201).json({status: "success", data});
// }
//
//
// /**
//  * Get all prescriptions for user
//  * @method getAllUsersPrescriptions
//  * @memberof prescriptionController
//  * @param {object} req
//  * @param {object} res
//  * @returns {(function|object)} Function next() or JSON object
//  */
// export const getAllUsersPrescriptions = async (req: Request, res: Response) => {
//     const {id: userId} = (<any>req).user;
//
//     const foundPrescription = await pool.query(PrescriptionQueries.getPrescriptions, [userId]);
//
//     if (foundPrescription.rows.length === 0) {
//         return res.status(404).json({status: "failed", message: "Prescriptions does not exist"});
//     }
//
//     const data = foundPrescription.rows
//
//     return res.status(200).json({status: "success", data});
//
// }
//
//
// /**
//  * Get single prescription
//  * @method getSinglePrescription
//  * @memberof prescriptionController
//  * @param {object} req
//  * @param {object} res
//  * @returns {(function|object)} Function next() or JSON object
//  */
// export const getSinglePrescription = async (req: Request, res: Response) => {
//     const {id} = req.params
//
//     const foundPrescription = await pool.query(PrescriptionQueries.getPrescription, [id]);
//
//
//     if (!foundPrescription.rows[0]) {
//         return res.status(404).json({status: "failed", message: "Prescription does not exist"});
//     }
//
//     const data = {
//         id: foundPrescription?.rows[0].id,
//         name: foundPrescription?.rows[0].drug_name,
//         userId: foundPrescription?.rows[0].user_id,
//         dose: foundPrescription?.rows[0].dose,
//         unit: foundPrescription?.rows[0].unit,
//         endDate: foundPrescription?.rows[0].end_date,
//         firstTimer: foundPrescription?.rows[0].first_timer,
//         secondTimer: foundPrescription?.rows[0].second_timer,
//         thirdTimer: foundPrescription?.rows[0].third_timer,
//         status: foundPrescription?.rows[0].status
//
//     };
//
//     return res.status(200).json({status: "success", data});
//
// }
//
//
// /**
//  * Update prescription
//  * @method updatePrescription
//  * @memberof prescriptionController
//  * @param {object} req
//  * @param {object} res
//  * @returns {(function|object)} Function next() or JSON object
//  */
// export const updatePrescription = async (req: Request, res: Response) => {
//     const {id} = req.params
//
//     const {name, dose, unit, endDate, firstTimer, secondTimer, thirdTimer, status} = req.body
//
//
//     const foundPrescription = await pool.query(PrescriptionQueries.getPrescription, [id]);
//
//     if (!foundPrescription.rows[0]) {
//         return res.status(404).json({status: "failed", message: "Prescription does not exist"});
//     }
//
//     const updatedPrescription = await pool.query(PrescriptionQueries.updatePrescription,
//         [
//             (
//                 name || foundPrescription?.rows[0].drug_name),
//             dose || foundPrescription?.rows[0].dose,
//             unit || foundPrescription?.rows[0].unit,
//             endDate || foundPrescription?.rows[0].end_date,
//             convertTime(firstTimer) || foundPrescription?.rows[0].first_timer,
//             convertTime(secondTimer) || foundPrescription?.rows[0].second_timer,
//             convertTime(thirdTimer) || foundPrescription?.rows[0].third_timer,
//             status || foundPrescription?.rows[0].status,
//             id])
//
//
//     const data = {
//         id: foundPrescription?.rows[0].id,
//         drugName: updatedPrescription?.rows[0].drug_name,
//         userId: foundPrescription?.rows[0].user_id,
//         dose: updatedPrescription?.rows[0].dose,
//         unit: updatedPrescription?.rows[0].unit,
//         endDate: updatedPrescription?.rows[0].end_date,
//         firstTimer: updatedPrescription?.rows[0].first_timer,
//         secondTimer: updatedPrescription?.rows[0].second_timer,
//         thirdTimer: updatedPrescription?.rows[0].third_timer,
//         status: updatedPrescription?.rows[0].status,
//
//     };
//
//     return res.status(200).json({status: "success", data});
//
// }
//
//
// /**
//  * Delete prescription
//  * @method deletePrescription
//  * @memberof prescriptionController
//  * @param {object} req
//  * @param {object} res
//  * @returns {(function|object)} Function next() or JSON object
//  */
// export const deletePrescription = async (req: Request, res: Response) => {
//     const {id} = req.params;
//
//     const foundPrescription = await pool.query(PrescriptionQueries.getPrescription, [id]);
//
//     if (!foundPrescription.rows[0]) {
//         return res.status(404).json({status: "failed", message: "Prescriptions does not exist"});
//     }
//
//     await pool.query(PrescriptionQueries.deletePrescription, [foundPrescription.rows[0].id]);
//
//     return res.status(200).json({status: "success", message: "Prescription deleted successfully"});
//
// }
//
