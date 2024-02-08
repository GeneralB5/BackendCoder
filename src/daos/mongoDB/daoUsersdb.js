import { usersModels } from "./models/modules.js";
class UsersDB{
    constructor(){

    }
    async createUser(fm,ln,email,age,pass,r,cartId){
        try {
            return await usersModels.create({first_name:fm,last_name:ln,email,age,password:pass,role:r,cartId})   
        } catch (error) {
            console.log(error)
        }
    }
    async searchUserby(all){
        try {
            return await usersModels.findOne(all)    
        } catch (error) {
            console.log(error)
        }
    }
   async logUser(email,pass){
    try {
        return  await usersModels.findOne({$and:[{email:email},{password:pass}]})
    } catch (error) {
        console.log(error)
    }
    
   }
}
export default UsersDB