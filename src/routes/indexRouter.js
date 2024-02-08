import { Router } from "express"
import routes from './apis/productRoutes.js';
import Cartroutes from './apis/cartRoute.js';
import logsRoutes from './apis/session.js';
import viewRoutes from './viewsRouter.js';
import usersRoutes from './apis/userRouter.js';
const route = Router()
//apis cart y products
route.use('/api/productos',routes)//done
route.use('/api/cart',Cartroutes)
route.use('/api/session',logsRoutes)//done
route.use('/',usersRoutes)//done
route.use("/views",viewRoutes)//done

route.use('*',(req,res)=>{
    res.status(400).send("Not found")
})
export default route