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
    }
    }
    ///see only one
   async seeProductId(id){
    try {
        return await prodsModel.findById({_id:id})        
    } catch (error) {
        console.log(error)
    }

    }
    ////see with limitations
    async seeProductsLimit(limit,sort,page,query){
        try {
            
            const pa = page || 1
            const li = limit || 10
            const sorted = {price:sort || 'asc'}
            let querys = {}
            if(isNaN(query) && query != undefined){
            querys = {title: {$in:query}}
        }
        if(!isNaN(query)&& query != undefined){
             querys = {price: {$in:query}}
        }
        
            return await prodsModel.paginate(querys,{limit:li,sort:sorted,page:pa,lean:true})        
        } catch (error) {
            console.log(error)
        }
    
        }
    ////create
    async createProds(prod){  
        try {
            const signal = await prodsModel.find({code:prod.code})
            console.log(signal.length)
            if(signal.length == 0){   
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