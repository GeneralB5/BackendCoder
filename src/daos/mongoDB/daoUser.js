import { userModel } from "./models/modules.js";
class userDao{
    constructor(){

    }
    async readMessages(){
        try {
            const {messages} = await userModel.findOne({NameId:'messages'})
            return messages
        } catch (error) {
            console.log(error)
        }
    }
    async createMessage(x){
        try {
            return await userModel.create({NameId:"messages",messages:[x]})  
        } catch (error) {
            console.log(error)
        }
    }
   async addMessages(x){
        try {    
        return await userModel.updateOne({NameId:"messages"},{$push:{messages:x}})
        } catch (error) {
            console.log(error)
        }
    }
}
export default userDao