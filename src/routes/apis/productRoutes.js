import { Router} from "express";
import productControl from "../../controller/productController.js";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
import { upload } from "../../helper/middleMulter.js";
const Control = new productControl
const routes = Router()
routes.get('/gets',Control.GETQUERY)
routes.get('/get',Control.GET)
routes.delete('/:id',[passportCall('jwt'),authentication(["USUARIO_PREMIUM","ADMIN"])],Control.DELETEDPROD)
routes.put('/:id',[passportCall('jwt'),authentication(["ADMIN"])],Control.PUTPROD)
routes.post('/',[passportCall('jwt'),authentication(["USUARIO_PREMIUM","ADMIN"]),upload.single('product')] ,Control.POSTPROD)
routes.get('/:id', Control.GETIDPROD)
routes.get('/owner/products',[passportCall('jwt'),authentication(["USUARIO_PREMIUM","ADMIN"])],Control.GETBYOWNER)


//mocking
// routes.post('/mockingproducts',Control.POST100PROD) para desafio
export default routes