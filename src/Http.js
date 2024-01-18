import express, {json, urlencoded } from 'express';
import  path  from "path"
import handlebars from 'express-handlebars';
//rutas
import routes from './routes/apis/productRoutes.js';
import Cartroutes from './routes/apis/cartRoute.js';
import logsRoutes from './routes/apis/session.js';
import viewRoutes from './routes/viewsRouter.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import daoProducts from './daos/mongoDB/daoProducts.js';
import connectDb from './config/indexDb.js';
import userDao from './daos/mongoDB/daoUser.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import usersRoutes from './routes/apis/userRouter.js';
import passport from 'passport';
import initializePassport from './config/passportConfig.js';
const app = express()
//conectar a db
connectDb()



//cookie y session
app.use(cookieParser('p@l@br@seCret@'))
app.use(session({
  store: MongoStore.create({
    mongoUrl:'mongodb+srv://ianmarco:ian240904@cluster0.tfejsks.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions:{
      useNewUrlParser:true,
      useUnifiedTopology: true
    },
    ttl:1500000
  }),
    secret: 'secretCoder',
    resave: true, 
    saveUninitialized: true
}))

///passport
initializePassport()
// JWT Github

// app.use(session({
//   secret:"SecretWorDs123"
// }))

///////
app.use(passport.initialize())
app.use(passport.session())

///services
const prodServices = new daoProducts()
const userServices = new userDao()

//modificar el de arriba
app.use(json())
app.use(urlencoded({extended:true}))
app.use(express.static(path.join(__dirname + '/public')))

//apis cart y products
app.use('/api/productos',routes)
app.use('/api/cart',Cartroutes)
app.use('/api/session',logsRoutes)
app.use('/',usersRoutes)

//motor de plantilla
app.engine('hbs',handlebars.engine({
extname : 'hbs'
}))//definimos engine
app.set('view engine','hbs')// definimos que engine usar
app.set('views', __dirname + '/views')//definimos a donde ir a buscar el handlebars
const port = 8080
app.use("/views",viewRoutes)
app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('error de server')
})

const httpsServer = app.listen(port, (err) =>{
  if (err)  console.log(err)
  console.log(`Escuchando en el puerto ${port}`)
})


const io = new Server(httpsServer)
//////////// IO server
let Products = 0
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
  await userServices.addMessages(data.nick,data.message)
  
io.emit('chat', await userServices.readMessages())
})


})
io.on('disconnected', ()=>{
  console.log("usuario desconectado")
})