import { connectDb } from "../src/config/indexDb.js";
import daoProducts from "../src/daos/mongoDB/daoProducts.js";
import Assert from 'assert'
import { logger } from "../src/utilis/logger.js";
import supertest from "supertest";
import { expect } from "chai";
connectDb()
const assert = Assert.strict
const requester = supertest('http://localhost:8080')
describe('testing de web ', ()=>{

describe('Testing product dao', ()=>{
before(function(){
    this.ProductServices = new daoProducts()
})

it('debe traer todos los productos',async function(){
    const products = await this.ProductServices.seeAllProducts({})
    //me trae un array pero no funciona...
    assert.strictEqual(products.lenght > 0,true)
}).timeout(5000)
const prod = {
title:'Helado 20',
price:34,  
stock:15,
thumbnail:"kojinadfsfaojnf",
description:"frio y demasiado rico",
status:true,
code:"heladisisimosi",
category:"Refrigerios",
}

 it('debe retornar un producto',async function(){
     const products = await this.ProductServices.createProds(prod)
     assert.strictEqual(typeof products === 'object',true)
 })

 it('debe eliminar un objeto',async function(){
     const id = '660c3e7b092543b360a8eb95'
     const products = await this.ProductServices.deletedProd(id)
     logger.info(id , products)
     assert.strictEqual(typeof products === 'object',true)
 })
it('debe hacer un GET por id y traer un producto ', async ()=>{
const {statusCode} = await requester.get('api/productos/65887cda9c2861fd2451d0a4')
logger.info(statusCode)
expect(statusCode).to.be.equal(200)
})

})
})