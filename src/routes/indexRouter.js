import { Router } from "express"
import routes from './apis/productRoutes.js';
import Cartroutes from './apis/cartRoute.js';
import logsRoutes from './apis/session.js';
import viewRoutes from './viewsRouter.js';
import usersRoutes from './apis/userRouter.js';
const route = Router()

route.use('/api/productos',routes)
route.use('/api/cart',Cartroutes)
route.use('/api/session',logsRoutes)
route.use('/',usersRoutes)
route.use("/views",viewRoutes)

route.use("/loggerTest" , (req,res)=>{
req.logger.debug("debug de endpoint /logger")
req.logger.http("http de endpoint /logger")
req.logger.info("info de endpoint /logger")
req.logger.error("error de endpoint /logger")
req.logger.fatal("fatal de endpoint /logger")
req.logger.warning("warning de endpoint /logger")
res.send("Logger")
})

route.use('*',(req,res)=>{
    res.status(500).send("Not found")
})
export default route