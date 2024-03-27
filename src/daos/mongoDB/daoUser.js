import { userModel } from "./models/modules.js";
import { logger } from "../../utilis/logger.js";
class userDao{
    constructor(){

    }
    async readMessages(){
        try {
            const {messages} = await userModel.findOne({NameId:'messages'})
            return messages
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
    async createMessage(x){
        try {
            return await userModel.create({NameId:"messages",messages:[x]})  
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
   async addMessages(x){
        try {    
        return await userModel.updateOne({NameId:"messages"},{$push:{messages:x}})
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
}
export default userDao