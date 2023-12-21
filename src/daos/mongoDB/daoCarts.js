import { Schema } from "mongoose";
import { cartsModel,prodsModel } from "./models/modules.js";

class daoCarts{
    constructor(){

    }
   async seeCart(id){
    try {
      //poner el pre del github del profe en elmodel :)
        const products = await cartsModel.findOne({_id:id})        
      
        return products
    } catch (error) {
        console.log(error)
    }

    }
    async createCart(){  
        try {
            return await cartsModel.create({products:[]})
        } catch (error) {
            console.log(error)
        }

    }
    async addCart(idCart,prod){   
        try {
            ///reviso que exista el producto
            const existProdQuest = await prodsModel.findById({_id:prod})
            if(existProdQuest != []){
            const producto = await cartsModel.find({$and:[{_id:idCart},{"products.id":prod}]})
            ///verifico que exista en el cart y depende si exite lo aumento o creo
             if(producto.length == 0){
            
                const prodQuan = {id:prod, quant:1}
                 return await cartsModel.updateOne({_id:idCart},{$push:{products:prodQuan}})
             }else{
                 return await cartsModel.updateOne(
                     {_id:idCart}
                 ,{$inc:{'products.$[e].quant':1}}
                 ,{arrayFilters:[
                     {"e.id":prod}
                 ],
             multi:true
         })
        
             }}else{
                new console.error("no se encontro producto");
             }
        }catch (error) {
            console.log(error)            
        }
    }
   async deletedCart(id){
        try {
        return await cartsModel.deleteOne({_id:id})    
        } catch (error) {
            console.log(error)
        }
    }
}
export default daoCarts