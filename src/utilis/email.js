import nodemailer from "nodemailer"
import { configObject } from "../config/indexDb.js"

const transport = nodemailer.createTransport({
    service:"gmail",
    port:configObject.PORT,
    auth:{
        user:configObject.email,
        pass:configObject.email_pws
    }
})
const sendEmail = async(destino, subject, html, attachments)=>{
   return await transport.sendMail({
        from:configObject.email ,
        to:destino, 
        subject, 
        html, 
        attachments:[{
        }]
        
    })
}
export default sendEmail