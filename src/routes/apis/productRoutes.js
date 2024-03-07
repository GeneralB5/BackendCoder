import { Router} from "express";
import productControl from "../../controller/productController.js";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
const Control = new productControl
const routes = Router()
routes.get('/gets',Control.GETQUERY)
routes.get('/get',Control.GET)
routes.delete('/:id',[passportCall('jwt'),authentication(["ADMIN"])],Control.DELETEDPROD)
routes.put('/:id',[passportCall('jwt'),authentication(["ADMIN"])],Control.PUTPROD)
routes.post('/',[passportCall('jwt'),authentication(["ADMIN"])] ,Control.POSTPROD)
routes.get('/:id', Control.GETIDPROD)


//mocking
// routes.post('/mockingproducts',Control.POST100PROD) para desafio
export default routes