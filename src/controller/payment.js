import Stripe from "stripe"
import { configObject } from "../config/indexDb.js"
const stripe = Stripe(configObject.Stripe_secret)
class paymentController{
    constructor(){
    }
    async postPayment(req,res){
        try {
            const { products } = req.body
            if(!products) res.status(401).json({status:"Error",payload:""})

            const line_items = products.map(prod =>({
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:prod.title
                    },
                    unit_amount:prod.price*100
                },
                quantity:prod.quantity
            }))

            const result = await stripe.checkout.sessions.create({
                payment_method_types:['card'],
                line_items:line_items,
                mode:'payment',
                success_url:'http://localhost:5173/user/cart/payment-succesful',
                cancel_url:'http://localhost:5173/user/cart'
            })
            res.send({url:result.url})
        } catch (error) {
            console.log(error)
            throw new Error
        }
    }
}
export default paymentController