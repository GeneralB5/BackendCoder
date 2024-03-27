import { usersModels } from "./models/modules.js";
import { logger } from "../../utilis/logger.js";
class UsersDB{
    constructor(){

    }
    async postUser(fm,ln,email,age,pass,r,cartId,fullname){
        try {
            return await usersModels.create({first_name:fm,last_name:ln,email,age,password:pass,role:r,cartId,fullname})   
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
    async getBy(all){
        try {
            return await usersModels.findOne(all).lean()    
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
    async putBy(ema, filterChange){
        try {
            return await usersModels.findOneAndUpdate({email:ema},filterChange,{
                new:true
            })
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
}
export default UsersDB