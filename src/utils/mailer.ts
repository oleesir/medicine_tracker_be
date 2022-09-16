import nodemailer from 'nodemailer';
import mailGun from 'nodemailer-mailgun-transport';
import hbs from 'nodemailer-express-handlebars';
import path from "path";


type HandlebarOptions = {viewEngine: {extName: string, partialsDir: string, defaultLayout: boolean}, viewPath: string, extName: string}

const auth = {
    auth:{
        api_key:process.env.MAILGUN_API_KEY as string,
        domain:process.env.MAILGUN_DOMAIN as string

        // api_key:'key-f9bf266a5cbbd031ff8c9e61d400e239',
        // domain:'sandbox08e7297d7ce5435da31d1a71ac92eb5d.mailgun.org'
    }
}

let transporter = nodemailer.createTransport(mailGun(auth));

const handlebarOptions:HandlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./src/views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/views'),
    extName: ".handlebars",
}



// @ts-ignore
transporter.use('compile', hbs(handlebarOptions));


const Mailer ={
    send: async function({to, subject,text}: { to: string, subject: string,text:string }){
        let mailOptions = {
            from: process.env.MAILGUN_FROM as string,
            to,
            subject,
            template: 'email',
            context: {
                text
            }
        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (e) {
            await Promise.reject(new Error(`Error sending mail(s) to ${to} - ${e}`));
        }
    }
};

export default Mailer;

