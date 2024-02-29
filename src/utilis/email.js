import nodemailer from "nodemailer"
import { configObject } from "../config/indexDb"

const transport = nodemailer.createTransport({
    service:"gmail",
    port:182,
    auth:{
        // user: usar configObject
        // pass:
    }
})
const sendEmail = async(destino, subject, html)=>{
    transport.sendMail({
        from:`envio de email from`,
        to:destino, //gmail de destino
        subject, // el porque del email
        html, /// html a enviar
        attachments:[{
            ///aqui va lo que quieres enviar
        }]
        
    })
}
export default sendEmail