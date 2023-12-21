import { userModel } from "./models/modules.js";
class userDao{
    constructor(){

    }
    async readMessages(){
        try {
            const {messages} = await userModel.findOne({NameId:'messages'})
            console.log(messages)
            return messages
        } catch (error) {
            console.log(error)
        }
    }
   async addMessages(Email,message){
        try {
            const userArray = await userModel.find({NameId:'messages'})
            console.log(userArray)
            const FinalSend = {nick:Email,message:message}
        if(userArray.length == 0){
        return await userModel.create({NameId:"messages",messages:[FinalSend]})    
    }else{
        return await userModel.updateOne({NameId:"messages"},{$push:{messages:FinalSend}})
    }
        } catch (error) {
            console.log(error)
        }
    }
}
export default userDao