import express, {json, urlencoded } from 'express';
import  path  from "path"
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import daoProducts from './daos/mongoDB/daoProducts.js';
import {connectDb,configObject} from './config/indexDb.js';
import userDao from './daos/mongoDB/daoUser.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passportConfig.js';
import route from './routes/indexRouter.js';
const app = express()
//conectar a db
connectDb()
 app.use(cookieParser())

///passport
initializePassport()
// JWT Github
 app.use(session({
   secret:configObject.ghSecret
 }))

///////
app.use(passport.initialize())
// app.use(passport.session())

///services
const prodServices = new daoProducts()
const userServices = new userDao()

//modificar el de arriba
app.use(json())
app.use(urlencoded({extended:true}))
app.use(express.static(path.join(__dirname + '/public')))

//motor de plantilla
app.engine('hbs',handlebars.engine({
extname : 'hbs'
}))//definimos engine
app.set('view engine','hbs')// definimos que engine usar
app.set('views', __dirname + '/views')//definimos a donde ir a buscar el handlebars
const port = configObject.PORT
// app.use("/views",viewRoutes)
app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('error de server')
})
//rutas
app.use(route)

const httpsServer = app.listen(port,(err) =>{
  if (err)  console.log(err)
  console.log(`Escuchando en el puerto ${port}`)
})


const io = new Server(httpsServer)
//////////// IO server
io.on('connect', async (socket)=>{
  //recibir productos
  socket.on('agregar', async (data)=>{
    await prodServices.createProds(data)
    io.emit("products",await prodServices.seeAllProducts())
  })
  ///delete del producto segun el nombre enviado
  socket.on('delete', async data=>{
    const prod = await  prodServices.seeAllProducts()
    const findedProd= prod.find( x=> x._id == data )
    console.log(findedProd)
    /// me fijo si el producto existe
    if(findedProd != undefined){
    await prodServices.deletedProd(data)
    io.emit("products",await prodServices.seeAllProducts())
  }else{
    console.log(`no se encontro producto con el nombre ${data}`)
  }
  })

  /// emito el array de prouctos que sale de la funcion seeAllProduct()
  io.emit("products",await prodServices.seeAllProducts())

//////////IO chat
io.emit('chat', await userServices.readMessages())
socket.on('mensajesEnviados', async data=>{
  console.log(data)
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