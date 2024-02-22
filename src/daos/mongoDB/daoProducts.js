import { prodsModel } from "./models/modules.js";

class daoProducts{
    constructor(){

    }
    //see all
   async seeAllProducts(){
    try {
        return await prodsModel.find()
    } catch (error) {
     console.log(error)   
     throw Error
    }
    }
    ///see only one
   async seeAll(all){
    try {
        return await prodsModel.findOne(all)        
    } catch (error) {
        console.log(error)
        throw Error
    }
    }
    ////see with limitations
    async seeProductsLimit(limit=10,sort='asc',page=1,query={}){
        try {
            return await prodsModel.paginate(query,{limit,sort:{price:sort},page,lean:true})        
        } catch (error) {
            console.log(error)
            throw Error
        }
        }
    ////create
    async createProds(prod){  
        try {
            return await prodsModel.create(prod)
        }catch (error) {
            console.log(error)
            throw Error
        }

    }
   async uploadProd(id,prods){
try {
    return await prodsModel.updateOne({_id:id},prods)
} catch (error) {
    console.log(error)
    throw Error
}
    }
   async deletedProd(id){
        try {
        return await prodsModel.deleteOne({_id:id})    
        } catch (error) {
            console.log(error)
            throw Error
        }
    }
}
export default daoProducts