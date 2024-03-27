import { logger } from "../../utilis/logger.js";
import { cartsModel,prodsModel } from "./models/modules.js";

class daoCarts{
    constructor(){

    }
   
    async postCart(){  
        try {
            return await cartsModel.create({products:[]})
        } catch (error) {
            logger.error(error)
        }

    }
    async getByProds(all){
        try {
            return await prodsModel.findOne(all)            
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
    async getByCart(all){
        try {
            return await cartsModel.findOne(all)            
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
    async postToCart(idCart,prod ,quant){   
        try {
        await cartsModel.updateOne(
                 {_id:idCart}
                ,{$inc:{'products.$[e].quant':quant}}
                ,{arrayFilters:[
                    {"e.id":prod}
                 ],
             multi:true
         })           
        }catch (error) {
            logger.error(error)            
            throw Error
        }
    }
   async deletedCart(id){
        try {
        return await cartsModel.deleteOne({_id:id})    
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
    async pullProd(idCart,Pid){
        try {
            return await cartsModel.updateOne({_id:idCart},{$pull:{products:{id:Pid}}},{multi:true})
        } catch (error) {
            throw Error
        }
    }
    ///deleteo productos si se queda sin quant lo borra
    async deleteProd(idCart,Pid){
        try {
            const existProdQuest = await prodsModel.findById({_id:Pid})
            if(existProdQuest != []){
            const producto = await cartsModel.findOne({$and:[{_id:idCart},{"products.id":Pid}]})
            ///verifico que exista en el cart y depende si exite lo aumento o creo
            
             if(producto.products[0].quant == 1){
            
                 return await cartsModel.updateOne({_id:idCart},{$pull:{products:{id:Pid}}},{multi:true})
             }else{
                 return await cartsModel.updateOne(
                     {_id:idCart}
                 ,{$inc:{'products.$[e].quant':-1}}
                 ,{arrayFilters:[
                     {"e.id":Pid}
                 ],
             multi:true
         })
             }}else{
                
                return "no se encontro producto"
             }
        } catch (error) {
            logger.error(error)
            throw Error
        }
    }
    async deleteAll(Cid){
        try {
            return await cartsModel.updateOne({_id:Cid},{products:[]})
        } catch (error) {
            logger.error("no existe")
            throw Error
        }
    }
    async addToCart(Cid,prod){
        try {
            logger.info(prod)
            return await cartsModel.updateOne({_id:Cid},{$push:{products:prod}})    
            } catch (error) {
                logger.error(error)
                throw Error
            }
    }
    async putCart(Cid,prod){
            try {
            return await cartsModel.updateOne({_id:Cid},prod)    
            } catch (error) {
                logger.error(error)
                throw Error
            }
    }
    async putQuant(Cid,Pid,quant){
        try {
            return await cartsModel.updateOne( 
                {_id:Cid},
                {'products.$[e].quant':quant},
                {arrayFilters:[
                    {"e.id":Pid}
                ],
                multi:true
            })
        }catch (error) {
            throw new Error
        }
    
        
}
    
        
    
   async putProd (Pid,quant){
    try {
        return await prodsModel.updateOne({_id:Pid},{stock:quant})    
    } catch (error) {
        throw Error(error)
    }}
}
export default daoCarts