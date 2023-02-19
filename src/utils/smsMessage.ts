import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;

 const sendMessage ={

     sendText:async({ to, body }:{ to: string; body: string; }) => {
         const client =  twilio( accountSid , authToken );
         try{
             await client.messages.create({
                 body,
                 from: process.env.PHONE_NUMBER as string,
                 to
             });
         }catch (e) {
             await Promise.reject(new Error(`Error sending text(s) to ${to} - ${e}`));
         }
     }
 }

 export default sendMessage;