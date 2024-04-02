import { connectDb } from "../src/config/indexDb.js";
import daoCarts from "../src/daos/mongoDB/daoCarts.js";
import Assert from 'assert'
import { logger } from "../src/utilis/logger.js";
connectDb()
const assert = Assert.strict
describe('testing de web ', ()=>{
 //cart
 describe('Testing cart dao', ()=>{
     before(function(){
         this.cartServices = new daoCarts()
     })
     //id de cart
     let cartId
     it('debe crear un carrito',async function(){
         logger.info(this.cartServices)
         const cart = await this.cartServices.postCart()
         logger.info(cart)
         cartId = cart._id
         assert.strictEqual(typeof cart === 'object',true)
     })
     //prod id
     let prodId = '65887cda9c2861fd2451d0a4'
     it('debe retornar un producto',async function(){
         let quant = 1
         const products = await this.cartServices.addToCart(cartId,{id:prodId, quant:quant})
         logger.info(products) 
         assert.strictEqual(typeof products === 'object',true)
     }).timeout(5000)
    
     it('debe eliminar un objeto',async function(){
         const products = await this.cartServices.pullProd(cartId,prodId)
         logger.info(products)
         assert.strictEqual(typeof products === 'object',true)
     })
     })
})