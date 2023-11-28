import express, {json, urlencoded } from 'express';
import routes from './src/public/routes/serversRoutes.js';
import Cartroutes from './src/public/routes/cartRoute.js';
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))

app.use('/productos',routes)
app.use('/cart',Cartroutes)
const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
