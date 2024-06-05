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

postAdd = async (req, res) => {
  try {
    const {quant} = req.body
    const idCartparams = req.user.cartId;
    const idProdsParams = req.params.Pid;
    const existProd = await this.cartServices.getByPro({_id:idProdsParams})
    const existCart = await this.cartServices.getByCa({$and:[{_id:idCartparams},{"products.id":idProdsParams}]})
    if( existProd.owner == req.user.email) res.send({status:'You are the owner product'})
    if(!existProd) return res.send({status:"Error",payload:"Product not found"})
      if(!existCart){
        const prod = await this.cartServices.addProduct(idCartparams,{id:idProdsParams, quant:quant})
        return res.send({status:"success",payload:prod});  
      }else{
        const usedFunc = await this.cartServices.postIncP(idCartparams,idProdsParams,quant)
        res.send({status:"success",payload:usedFunc});  
      }
  } catch (error) {
    res.send({
      status:"Error hola"
    })   
  } 
}
getCart = async (req, res, next) => {
  try {
    if(!req.user.cartId) throw new Error 
    const {products} = await this.cartServices.getByCa({_id:req.user.cartId})
    const cart = []
    if(products.length == 0) return res.send({status:"ok",payload:products})
    const ProdsSearch = products.map( async (product)=>{
        const {id , quant} = product
        const prods = await this.productServices.getBy({_id:id})
        ///// no agrego el quantity
        prods.quantity = quant
        cart.push(prods)
    })
    await Promise.all(ProdsSearch)  
    res.send({status:"ok",payload:cart})
  } catch (error) {
    next(error)
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

pullCartProd = async(req,res,next)=>{
  try {
    const {cartId} = req.user
    const {Pid} = req.body
    const result = await this.cartServices.deletePpull(cartId,Pid)
    res.status(200).send({status:'Ok',payload:result})
  } catch (error) {
    next(error)
  }
}

putCustomCart = async(req,res,next)=>{
  try {
    const {products} =  req.body
    const Cid = req.user.cartId
    console.log(products)
    if(!req.body) throw new Error
    const newCart = await this.cartServices.updateC(Cid,products)
    res.send({
      status:"New cart updated",
      payload:newCart
    })  
  } catch (error) {
    next(error)
  } 
}

putCustomQuant = async (req, res) => {
  try {
    const {Pid} = req.params;
    const {quant} = req.body
    const {cartId} = req.user
    if(quant != 0) throw new Error
    const usedFunc = await this.cartServices.updateQua(cartId,Pid,quant)
    console.log(usedFunc)
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
    const {stock , price , owner} = await this.productServices.getBy({_id:id})
    if(stock >= quant && owner != req.user.email){
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