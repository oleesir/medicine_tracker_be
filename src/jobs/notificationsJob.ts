import Mailer from "../utils/mailer";
import models from "../database/models";
import { Op } from "sequelize";
import dayjs from "dayjs";
import  SendMessage  from "../utils/smsMessage";


const notificationsJob = async () => {

    const today = new Date();
    const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let hours = today.getHours() <= 9 ? '0' + today.getHours() : today.getHours();
    let minutes = today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes();
    const currentTime = hours + ":" + minutes;

    const isoDate = dayjs(currentDate).toISOString();


        await models.Prescription.update({ status:'ended' },
            {
                where: {[Op.and]:[{status: 'active'},
                        {end_date: { [Op.lt]: isoDate }}]
                }
            });



    const reminders = await models.Prescription.findAll({
        include: [{
            model: models.User,
            as: "user",
        }],
        where: {
            status: 'active',
            [Op.or]: [{first_timer: currentTime},
                {second_timer: currentTime},
                {third_timer: currentTime},
                {fourth_timer: currentTime}]
        },
    });

    reminders.map((remind: any) => {
        Mailer.send({
            to: `${remind?.user?.email}`,
            subject: `💊 Medication Reminder 💊.`,
            text: `Hey ${remind?.user?.first_name} it's time to take your ${remind?.drug_name} medication. Health is wealth 🙂`
        });

        SendMessage.sendText({
            to: `${remind?.user?.calling_code}${remind?.user?.phone_number}`.trim(),
                body: `💊 Medication Reminder 💊. Hey ${remind?.user?.first_name} it's time to take your ${remind?.drug_name} medication. Health is wealth 🙂`
            })
    })

}

export default notificationsJob;