import { usersModels } from "./models/modules.js";
class UsersDB{
    constructor(){

    }
    async postUser(fm,ln,email,age,pass,r,cartId,fullname){
        try {
            return await usersModels.create({first_name:fm,last_name:ln,email,age,password:pass,role:r,cartId,fullname})   
        } catch (error) {
            throw new Error
        }
    }
    async findAll(){
        try {
            return await usersModels.find({}).lean()    
        } catch (error) {
            throw new Error
        }
    }
    async getBy(all){
        try {
            return await usersModels.findOne(all).lean()    
        } catch (error) {
            throw new Error
        }
    }
    async putBy(ema, filterChange){
        try {
            return await usersModels.findOneAndUpdate({email:ema},filterChange,{
                new:true
            })
        } catch (error) {
            throw new Error
        }
    }
    async addNewDoc(email,doc){
        try {
            return await usersModels.updateOne({email},{$push:{documents:doc}})
        } catch (error) {
            throw new Error
        }
    }
    async deleteUser(_id){
        try {
            return await usersModels.deleteOne({_id:_id})
        } catch (error) {
            throw new Error
        }
    }
    async updateDoc(email,dcoPath,fieldName){
        try {
            return await usersModels.updateOne({email},
                {$set:{'documents.$[e].reference':dcoPath}}
                ,{arrayFilters:[
                    {"e.name":fieldName}
                 ],
                multi:true
                }
                 
            )
        } catch (error) {
            console.log(error)
            throw new Error
        }
    }
}
export default UsersDB