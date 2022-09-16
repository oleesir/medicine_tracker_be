import pool from "../../db";
import PrescriptionQueries from "../queries/prescriptionQueries";
import Mailer from "../utils/mailer";

const notificationsJob = async () => {
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let hours = today.getHours() <= 9 ? '0' + today.getHours()  : today.getHours() ;
    let minutes = today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes();

    const currentTime = hours + ":" + minutes;

    await pool.query(PrescriptionQueries.updatePrescriptionStatus, [currentDate]);

    const firstTimer =  await pool.query(PrescriptionQueries.getFirstTimers, [currentTime]);
   const secondTimer =  await pool.query(PrescriptionQueries.getSecondTimers, [currentTime]);
    const thirdTimer =  await pool.query(PrescriptionQueries.getThirdTimers, [currentTime]);



firstTimer.rows.map((user)=>{
         Mailer.send({
            to: user.email,
            subject: `Medication Reminder for ${user.first_timer}.`,
            text:`Hey ${user.first_name} it's time to take your ${user.drug_name} medication.`
        });
    })


    secondTimer.rows.map((user)=>{
        Mailer.send({
            to: user.email,
            subject: `Medication Reminder for ${user.second_timer}.`,
            text:`Hey ${user.first_name} it's time to take your ${user.drug_name} medication.`
        });
    })

    thirdTimer.rows.map((user)=>{
        Mailer.send({
            to: user.email,
            subject: `Medication Reminder for ${user.third_timer}.`,
            text:`Hey ${user.first_name} it's time to take your ${user.drug_name} medication.`
        });
    })


}

export default notificationsJob;