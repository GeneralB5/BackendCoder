import { connectDb } from "../src/config/indexDb.js";
import UsersDB from "../src/daos/mongoDB/daoUsersdb.js";
import Assert from 'assert'
import { logger } from "../src/utilis/logger.js";
import { createPassword, validatePassword } from "../src/utilis/hashPassword.js";
import supertest from "supertest";
import { expect } from "chai";
import UserConstructor from "../src/dtos/userDto.js";
connectDb()
const assert = Assert.strict
const requester = supertest('http://localhost:8080')
describe('testing de web ', ()=>{
 //user
 describe('Testing user dao', ()=>{
     before(function(){
         this.userServices = new UsersDB()    })

     const userToCreate={
         first_name:'lean',
         last_name:'',
         email:'leand@gmail',
         age: 13,
         password:"1234567",
         role:'usuario',
         cartId:'',
     }        

       it('debe crear un usuario con fullname y traer un objeto (seria el usuario)',async function(){
           const user = new UserConstructor(userToCreate)
           const password = createPassword(user.password)
           const returnedUser = await this.userServices.postUser(user.first_name,user.last_name,user.email,user.age,password,'usuario',user.cartId,user.fullname)
           assert.strictEqual(typeof returnedUser === 'object',true)
       }).timeout(5000)
    const email = userToCreate.email
     it('debe loggear (deberia validar password)',async function(){
         const user = await this.userServices.getBy({email})
         const password = userToCreate.password
         console.log(password)
         assert.strictEqual(validatePassword(password, user.password),true)
     }).timeout(10000)
    
      it('debe actualizar contraseña',async function(){
          const user = await this.userServices.getBy({email})
          const newPassword = '9087651'
          const hashPassword = createPassword(newPassword)
          logger.info(user)
          const returnedUser = this.userServices.putBy(user.email, {password:hashPassword})
          assert.strictEqual(typeof returnedUser === 'object',true)
      }).timeout(5000)
     const userToLog= {
         email:"ia@gmail.com",
         password:"1234"
     }
     it('debe hacer un GET por id y traer un producto ', async ()=>{
         const {statusCode, _body} = await requester.post('api/session/login').send(userToLog)
         expect(_body.payload).to.have.property('status')
         })
     })

})