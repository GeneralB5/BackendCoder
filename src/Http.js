import express, {json, urlencoded } from 'express';
import  path  from "path"
import handlebars from 'express-handlebars';
//rutas
import routes from './routes/apis/productRoutes.js';
import Cartroutes from './routes/apis/cartRoute.js';
import viewRoutes from './routes/viewsRouter.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { createProd, deletedDataById, getAllProduct, getProductById } from './ProductManager.js';
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
app.use(express.static(path.join(__dirname + '/public')))

app.use('/api/productos',routes)
app.use('/api/cart',Cartroutes)

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

///prueba de post y del



// app.post('/views/realtimeproducts/add',async (req, res) => {
//   const prodsParams = req.body
//   ///crea el producto
//   await createProd(prodsParams)
//   io.emit("products", await getAllProduct())
//     res.send("se ha creado correctamente")
  
// })

// app.delete('/views/realtimeproducts/:id', async (req, res) => {
//   const id = req.params.id
//   const Prods = await deletedDataById(id)
//   io.emit("products", await getAllProduct())
//     res.send('se ha borrado correctamente')
// })



/////////////////////// Hecho de otra manera
let Products = 0
io.on('connect', async (socket)=>{
  //recibir productos
  socket.on('agregar', async (data)=>{
    
    await createProd(data)
  })
  ///delete del producto segun el nombre enviado
  socket.on('delete', async data=>{
    const prod =  await getAllProduct()
    const findedProd= prod.find( x=> x.id == data )
    console.log(findedProd)
    /// me fijo si el producto existe
    if(findedProd != undefined){
    await deletedDataById(findedProd.id)
  }else{
    console.log(`no se encontro producto con el nombre ${data}`)
  }
  })

  /// emito el array de prouctos que sale de la funcion getAllProduct()
  io.emit("products",await getAllProduct())

})
io.on('disconnected', ()=>{
  console.log("usuario desconectado")
})