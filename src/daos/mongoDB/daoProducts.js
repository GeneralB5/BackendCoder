import { prodsModel } from "./models/modules.js";

class daoProducts{
    constructor(){

    }
   async seeAllProducts(){
    try {
        return await prodsModel.find()
    } catch (error) {
     console.log(error)   
    }
    }
   async seeProductId(id){
    try {
        return await prodsModel.findById({_id:id})        
    } catch (error) {
        console.log(error)
    }

    }
    async createProds(prod){  
        try {
            const signal = await prodsModel.findOne({code:prod.code})
            if(signal == []){   
            return await prodsModel.create(prod)
        }else{
            console.error('Ya existe');
        }
        } catch (error) {
            console.log(error)
        }

    }
   async uploadProd(id,prods){
try {
    return await prodsModel.updateOne({_id:id},prods)
} catch (error) {
    console.log(error)
}
    }
   async deletedProd(id){
        try {
        return await prodsModel.deleteOne({_id:id})    
        } catch (error) {
            console.log(error)
        }
    }
}
export default daoProducts