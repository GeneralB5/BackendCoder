import { orderModel } from "./models/modules.js";

class Orders {
    constructor(){
        this.service = orderModel
    }
    createOrder = async(prod,purcharser,code)=>{
        try {
            return await this.service.create({amount:prod,code:code,purchaser:purcharser})    
        } catch (error) {
            console.log("error en la creacion de datos" + error)
         throw Error   
        }
    }
    findBy = async(filter)=>{
        try {
            return await this.service.findOne(filter)
        } catch (error) {
            console.log("error buscando datos o el filtro ingresado" + error)
             throw Error   
        }
    }
    deleteOrder = async(id,filter)=>{
        try {
            return await this.service.deleteOne({_id:id})///tener 1 hr para poder borrarla
        } catch (error) {
            console.log("error borrando orden" + error)
            throw Error              
        }
    }
}
export default Orders