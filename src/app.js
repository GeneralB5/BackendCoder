import express, {json, urlencoded } from 'express';
import  path  from "path"
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import daoProducts from './daos/mongoDB/daoProducts.js';
import {connectDb,configObject} from './config/indexDb.js';
import userDao from './daos/mongoDB/daoUser.js';
import cookieParser from 'cookie-parser'
import passport from 'passport';
import initializePassport from './config/passportConfig.js';
import route from './routes/indexRouter.js';
import cors from "cors"
import handleErrors from './middleware/error/handleError.js';
import compression from 'express-compression';
import { addLogger } from './utilis/logger.js';
const app = express()
connectDb()
app.use(compression({
  brotli:{enable:true,zlib:{}}
}))
app.use(cookieParser())

initializePassport()
app.use(passport.initialize())


const prodServices = new daoProducts()
const userServices = new userDao()


app.use(json())
app.use(urlencoded({extended:true}))
app.use(cors())
app.use(express.static(path.join(__dirname + '/public')))


app.engine('hbs',handlebars.engine({
extname : 'hbs'}))
app.set('view engine','hbs')
app.set('views', __dirname + '/views')
app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('error de server')
})

app.use(addLogger)
app.use(route)
app.use(handleErrors)

const httpsServer = app.listen(configObject.PORT,(err) =>{
  if (err)  console.log(err)
  console.log(`Escuchando en el puerto ${configObject.PORT}`)
})


const io = new Server(httpsServer)

io.on('connect', async (socket)=>{
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
})
io.on('disconnected', ()=>{
  console.log("usuario desconectado")
})