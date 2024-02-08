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
    async getByProds(all){
        try {
            return await prodsModel.findOne(all)            
        } catch (error) {
            console.log(error)
        }
    }
    async getByCart(all){
        try {
            return await cartsModel.find(all)            
        } catch (error) {
            console.log(error)
        }
    }
    async addCart(idCart,prod){   
        try {
        await cartsModel.updateOne(
                 {_id:idCart}
                ,{$inc:{'products.$[e].quant':1}}
                ,{arrayFilters:[
                    {"e.id":prod}
                 ],
             multi:true
         })           
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
                new console.error("no se encontro producto");
             }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll(Cid){
        try {
            return await cartsModel.updateOne({_id:Cid},{products:[]})
        } catch (error) {
            console.log("no existe")
        }
    }
    ///update del cart (solo funciona con todas las condiciones cumplidas)
    async addToCart(Cid,prod){
        try {
            console.log(prod)
            return await cartsModel.updateOne({_id:Cid},{$push:{products:prod}})    
            } catch (error) {
                console.log(error)
            }
    }
    async updateCart(Cid,prod){
            try {
            return await cartsModel.updateOne({_id:Cid},prod)    
            } catch (error) {
                console.log(error)
            }
    }
    /// update de quant
    async updateQuant(Cid,Pid,quant){
    if(!isNaN(quant)){
        return await cartsModel.updateOne( 
        {_id:Cid},
        {'products.$[e].quant':quant},
        {arrayFilters:[
            {"e.id":Pid}
        ],
    multi:true
})
    }else{
        return new Error
    }
        
    }
}
export default daoCarts