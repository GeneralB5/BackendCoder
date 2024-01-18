import { usersModels } from "./models/modules.js";
class UsersDB{
    constructor(){

    }
    async createUser(fm,ln,email,age,pass,r){
        const userFinded = await usersModels.findOne({email})
        if(fm.trim() !='' || email.trim() !=''||pass.trim() !='', userFinded == undefined){
            const userCreate = await usersModels.create({first_name:fm,last_name:ln,email,age,password:pass,role:r})
            return  userCreate
        }
    }
    async searchUser(ema){
        const userFinded = await usersModels.findOne({email:ema})    
        return userFinded    
    }
    async searchUserby(all){
        const userFinded = await usersModels.findOne(all)    
        return userFinded    
    }
   async logUser(email,pass){
    const userFinded = await usersModels.findOne({$and:[{email:email},{password:pass}]})
    return userFinded
   }
}
export default UsersDB