import { orderModel } from "./models/modules.js";
import { logger } from "../../utilis/logger.js";

class Orders {
    constructor(){
        this.service = orderModel
    }
    postOrder = async(prod,purcharser,code)=>{
        try {
            return await this.service.create({amount:prod,code:code,purchaser:purcharser})    
        } catch (error) {
            logger.error("error en la creacion de datos" + error)
         throw Error   
        }
    }
    getBy = async(filter)=>{
        try {
            return await this.service.findOne(filter)
        } catch (error) {
            logger.error("error buscando datos o el filtro ingresado" + error)
             throw Error   
        }
    }
    deleteOrder = async(id,filter)=>{
        try {
            return await this.service.deleteOne({_id:id})///tener 1 hr para poder borrarla
        } catch (error) {
            logger.error("error borrando orden" + error)
            throw Error              
        }
    }
}
export default Orders