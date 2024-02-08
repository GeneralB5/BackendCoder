import daoCarts from "../daos/mongoDB/daoCarts.js";

class cartControl{
    constructor(){
        this.cartServices = new daoCarts()
    }
//primer post manda a crear carrito
postCreate= async (req, res) => {
  try {
    const usedFunc = await this.cartServices.createCart()  
    res.json(usedFunc);
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
}
//segundo post manda el producto seleccionado y si se manda mas de una vez se suma el quantity
postAdd = async (req, res) => {
  try {
    const idCartparams = req.params.Cid;
    const idProdsParams = req.params.Pid;
    // const usedFunc = await addCart(idCartparams,idProdsParams)
    const existProd = await this.cartServices.getByProds({_id:idProdsParams})
    const existCart = await this.cartServices.getByCart({$and:[{_id:idCartparams},{"products.id":idProdsParams}]})
    if(existProd != []){
      if(existCart.length == 0){
        await this.cartServices.addToCart(idCartparams,{id:idProdsParams, quant:1})
        return res.json({status:"success",payload:"Added"});  
      }else{
        const usedFunc = await this.cartServices.addCart(idCartparams,idProdsParams)
        res.json({status:"success",payload:usedFunc});  
      }
    }else{
      res.send({status:"Error",payload:"Product not found"})
    }
    
  } catch (error) {
    res.send({
      status:"Error hola"
    })   
  } 
}
// el get te obtiene los productos con el quantity
getCart = async (req, res) => {
  try {
    const idParams = req.params.Cid;
    // const usedFunc = await seeCart(idParams)
    const usedFunc = await this.cartServices.seeCart(idParams)
    res.json(usedFunc) ;
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
    
}
//deleted de productos
deleteProd = async(req,res)=>{
  try {
    const {Cid,Pid} = req.params
    const Products = await this.cartServices.deleteProd(Cid,Pid)
    res.send({
      status:"success",
      payload:Products
    })  
  } catch (error) {
    res.send({
      status:"Error"
    })  
  }
  
}
/// vaciar cart completo
deleteCart = async(req,res)=>{
  try {
    const {Cid} = req.params
    const Products = await this.cartServices.deleteAll(Cid)
    res.send({
      status:"success",
      payload:Products
    })  
  } catch (error) {
    res.send({
      status:"Error"
    })  
  }
  
}
///actualizar cart entero
///se pasa cart por body [{Prod},{Prod}....]
putCustomCart = async(req,res)=>{
  try {
    const body = req.body
    const {Cid} = req.params
    if(body.quant > 0){
    const newCart = await this.cartServices.updateCart(Cid,{products:body})
    return newCart
  }else{
    res.send("quant error")
  }
    res.send({
      status:"success",
      payload:newCart
    })  
  } catch (error) {
    res.send({
      status:"Error"
    })  
  } 
}
/// actualizar quantity del determinado producto
//// quantity se pasa por body de tal manera
/// quant: numero
putCustomQuant = async (req, res) => {
  try {
    const {Cid,Pid} = req.params;
    const {quant} = req.body
    const usedFunc = await this.cartServices.updateQuant(Cid,Pid,quant)
      res.json({
        status:"success",
        payload:usedFunc
      });  
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
}

}
export default cartControl