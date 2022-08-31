import pool from "../../db";
import PrescriptionQueries from "../queries/prescriptionQueries";

const notificationsJob = async () => {
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let minutes = today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes();
    const currentTime = today.getHours() + ":" + minutes;

    await pool.query(PrescriptionQueries.updatePrescriptionStatus, [currentDate]);
    await pool.query(PrescriptionQueries.getFirstTimers, [currentTime]);
    await pool.query(PrescriptionQueries.getSecondTimers, [currentTime]);
    await pool.query(PrescriptionQueries.getThirdTimers, [currentTime]);
}

export default notificationsJob;