import{ Router } from "express";
import daoCarts from "../../daos/mongoDB/daoCarts.js";
const cartServices = new daoCarts()
const Cartroutes = Router()
//primer post manda a crear carrito
Cartroutes.post('/',async (req, res) => {
  try {
    const usedFunc = await cartServices.createCart()  
    res.json(usedFunc);
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
})
//segundo post manda el producto seleccionado y si se manda mas de una vez se suma el quantity
Cartroutes.post('/:Cid/productos/:Pid',async (req, res) => {
  try {
    const idCartparams = req.params.Cid;
    const idProdsParams = req.params.Pid;
    // const usedFunc = await addCart(idCartparams,idProdsParams)
    const usedFunc = await cartServices.addCart(idCartparams,idProdsParams)
      res.json(usedFunc);  
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
  
})
// el get te obtiene los productos con el quantity
Cartroutes.get('/:Cid', async (req, res) => {
  try {
    const idParams = req.params.Cid;
    // const usedFunc = await seeCart(idParams)
    const usedFunc = await cartServices.seeCart(idParams)
    res.json(usedFunc) ;
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
    
})
//deleted de productos
Cartroutes.delete("/:Cid/products/:Pid", async(req,res)=>{
  try {
    const {Cid,Pid} = req.params
    const Products = await cartServices.deleteProd(Cid,Pid)
    res.send({
      status:"success",
      payload:Products
    })  
  } catch (error) {
    res.send({
      status:"Error"
    })  
  }
  
})
/// vaciar cart completo
Cartroutes.delete("/:Cid", async(req,res)=>{
  try {
    const {Cid} = req.params
    const Products = await cartServices.deleteAll(Cid)
    res.send({
      status:"success",
      payload:Products
    })  
  } catch (error) {
    res.send({
      status:"Error"
    })  
  }
  
})
///actualizar cart entero
///se pasa cart por body [{Prod},{Prod}....]
Cartroutes.put("/:Cid",async(req,res)=>{
  try {
    const body = req.body
    const {Cid} = req.params
    const newCart = await cartServices.updateCart(Cid,body)
    res.send({
      status:"success",
      payload:newCart
    })  
  } catch (error) {
    res.send({
      status:"Error"
    })  
  }
  
})
/// actualizar quantity del determinado producto
//// quantity se pasa por body de tal manera
/// quant: numero
Cartroutes.put('/:Cid/products/:Pid',async (req, res) => {
  try {
    const {Cid,Pid} = req.params;
    const {quant} = req.body
    const usedFunc = await cartServices.updateQuant(Cid,Pid,quant)
      res.json({
        status:"success",
        payload:usedFunc
      });  
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
})
export default Cartroutes