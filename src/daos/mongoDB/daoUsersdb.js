import { usersModels } from "./models/modules.js";
class UsersDB{
    constructor(){

    }
    async createUser(fm,ln,email,age,pass,r,cartId,fullname){
        try {
            return await usersModels.create({first_name:fm,last_name:ln,email,age,password:pass,role:r,cartId,fullname})   
        } catch (error) {
            console.log(error)
            throw Error
        }
    }
    async searchUserby(all){
        try {
            return await usersModels.findOne(all)    
        } catch (error) {
            console.log(error)
            throw Error
        }
    }
}
export default UsersDB