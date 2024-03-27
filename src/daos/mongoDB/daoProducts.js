import { prodsModel } from "./models/modules.js";
import { logger } from "../../utilis/logger.js";
class daoProducts{
    constructor(){

    }
    
   async seeAllProducts(all={}){
    try {
        return await prodsModel.find(all)
    } catch (error) {
     logger.error(error)   
     throw Error
    }
    }
    
   async seeAll(all){
    try {
        return await prodsModel.findOne(all)        
    } catch (error) {
        logger.error(error)
        throw Error
    }
    }
    
    async seeProductsLimit(limit=10,sort='asc',page=1,query={}){
        try {
            return await prodsModel.paginate(query,{limit,sort:{price:sort},page,lean:true})        
        } catch (error) {
            logger.error(error)
            throw Error
        }
        }
    
    async createProds(prod){  
        try {
            return await prodsModel.create(prod)
        }catch (error) {
            logger.error(error)
            throw Error
        }

    }
   async uploadProd(id,prods){
try {
    return await prodsModel.updateOne({_id:id},prods)
} catch (error) {
    logger.error(error)
    throw Error
}
    }
   async deletedProd(id){
        try {
        return await prodsModel.deleteOne({_id:id})    
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
}
export default daoProducts