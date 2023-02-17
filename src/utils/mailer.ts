import nodemailer from 'nodemailer';

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER as string,
        pass: process.env.MAIL_PASSWORD as string,
    }
});



const Mailer ={
    send: async function({to, subject,text}: { to: string, subject: string,text:string }){
        let mailOptions = {
            from: process.env.MAIL_SENDER as string,
            to,
            subject,
            text
        }

        try {
            await mailTransporter.sendMail(mailOptions)
        } catch (e) {
            await Promise.reject(new Error(`Error sending mail(s) to ${to} - ${e}`));
        }
    }
};

export default Mailer;

