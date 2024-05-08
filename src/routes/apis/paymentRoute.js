import { Router } from "express";
import paymentController from "../../controller/payment.js";
import passportCall from "../../middleware/passportCall.js";
const paymentControl = new paymentController
const paymentRoutes = Router()
paymentRoutes.post("/payment_intent",[passportCall('jwt')] ,paymentControl.postPayment)
export default paymentRoutes