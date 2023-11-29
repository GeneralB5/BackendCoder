import express, {json, urlencoded } from 'express';
import handlebars from 'express-handlebars';
import routes from './src/routes/productRoutes.js';
import Cartroutes from './src/routes/cartRoute.js';
import __dirname from './utils.js';
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))

app.use('/api/productos',routes)
app.use('/api/cart',Cartroutes)
//motor de plantilla
app.engine('handlebars',handlebars.engine())//definimos engine
app.set('view engine','handlebars')// definimos que engine usar
app.set('views',__dirname+'/src/views')//definimos a donde ir a buscar el handlebars
const port = 8080

app.get('/views',(req,res)=>{
  res.render('index',{
    name:"toma",
    title:"arriba"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
