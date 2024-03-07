import servicesC from "../services/cartServices.js";
import servicesO from "../services/orderService.js";
import servicesP from "../services/prodServ.js";
import services from "../services/userServ.js";
import {v4 as uuid } from "uuid"
class cartControl{
    constructor(){
        this.cartServices = servicesC
        this.productServices = servicesP
        this.orderServices = servicesO
        this.userServices = services
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
    const existProd = await this.cartServices.getByPro({_id:idProdsParams})
    const existCart = await this.cartServices.getByCa({$and:[{_id:idCartparams},{"products.id":idProdsParams}]})
    if(existProd != []){
      if(existCart.length == 0){
        await this.cartServices.addProduct(idCartparams,{id:idProdsParams, quant:1})
        return res.json({status:"success",payload:"Added"});  
      }else{
        const usedFunc = await this.cartServices.postIncP(idCartparams,idProdsParams)
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
    if( req.params.Cid ) return await this.cartServices.getByCa({_id:req.params.Cid})
  } catch (error) {
    res.send({
      status:"Error"
    })   
  }
    
}

deleteProd = async(req,res)=>{
  try {
    const {Cid,Pid} = req.params
    const Products = await this.cartServices.deleteP(Cid,Pid)
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

putCustomCart = async(req,res)=>{
  try {
    const body =  req.body
    const {Cid} = req.params
    if(body.quant > 0){
    const newCart = await this.cartServices.updateC(Cid,{products:body})
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

putCustomQuant = async (req, res) => {
  try {
    const {Cid,Pid} = req.params;
    const {quant} = req.body
    let usedFunc
    if(quant != 0){
      usedFunc = await this.cartServices.updateQua(Cid,Pid,quant)
    }
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
postPurchase= async(req,res)=>{
try {
req.logger.info(req.user.email)
const { Cid } = req.params;
const cart = await this.cartServices.getByCa({_id:Cid})
if(!cart || req.user.email == undefined) res.send({status:"error", payload:"without information"})

  let ticketProd = 0
    const updateCart = cart.products.map(async ({id , quant}) => {
    const {stock , price} = await this.productServices.getBy({_id:id})
    if(stock >= quant){
      ticketProd += quant*price
      const quantF = stock - quant
      await this.cartServices.updateP(id,quantF)
      await this.cartServices.deletePpull(Cid,id)
    }
    })

  await Promise.all(updateCart)
  const {products} = await this.cartServices.getByCa({_id:Cid})
  if(ticketProd != 0){
  let randomString = uuid()
  await this.orderServices.createOrder(ticketProd,req.user.email,randomString)
  }
  res.send({status:"succesful" , payload:products})
} catch (error) {
  req.logger.error(error)
  res.send({
    status:"Error"
  })   
}
}
}
export default cartControl