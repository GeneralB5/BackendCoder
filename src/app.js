import express, {json, urlencoded } from 'express';
import  path  from "path"
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import {connectDb,configObject} from './config/indexDb.js';
import cookieParser from 'cookie-parser'
import passport from 'passport';
import initializePassport from './config/passportConfig.js';
import route from './routes/indexRouter.js';
import cors from "cors"
import handleErrors from './middleware/error/handleError.js';
import compression from 'express-compression';
import { addLogger, logger } from './utilis/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import  SwaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './config/swaggerOptions.js';
import socket from './socket/socket.js';
const app = express()
connectDb()
app.use(json())
app.use(urlencoded({extended:true}))
app.use(cors({credentials: true, origin: true}))

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apiDocs', SwaggerUiExpress.serve,SwaggerUiExpress.setup(specs))

app.use(compression({
  brotli:{enable:true,zlib:{}}
}))
app.use(cookieParser())

initializePassport()
app.use(passport.initialize())

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

const httpsServer =()=>{
  const PORT = configObject.PORT
  return app.listen(PORT,(err) =>{
  if (err)  logger.error(err)
  logger.info(`Escuchando en el puerto ${PORT}`)
})}
httpsServer()

// const io = new Server(httpsServer())
// io.on('connect', socket )
// io.on('disconnected', ()=>{
//   console.log("usuario desconectado")
// })
export default httpsServer