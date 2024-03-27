import daoProducts from "../daos/mongoDB/daoProducts.js"
import userDao from "../daos/mongoDB/daoUser.js"


const prodServices = new daoProducts()
const userServices = new userDao()

const socket = async (socket)=>{
       socket.on('agregar', async (data)=>{
         await prodServices.createProds(data)
         io.emit("products",await prodServices.seeAllProducts())
       })
       socket.on('delete', async data=>{
         const prod = await  prodServices.seeAllProducts()
         const findedProd= prod.find( x=> x._id == data )
        
        
         if(findedProd != undefined){
         await prodServices.deletedProd(data)
         io.emit("products",await prodServices.seeAllProducts())
       }else{
         console.log(`no se encontro producto con el nombre ${data}`)
       }
       })
    
      
       io.emit("products",await prodServices.seeAllProducts())
    
    
     io.emit('chat', await userServices.readMessages())
     socket.on('mensajesEnviados', async data=>{
      
       const userArray = await userServices.readMessages()
       const FinalSend = {nick:data.nick,message:data.message}
       if(userArray.lenght==0){
       await userServices.createMessage(FinalSend)
     }else{
       await userServices.addMessages(FinalSend)
     }
     io.emit('chat', await userServices.readMessages())
     })
     }
export default socket