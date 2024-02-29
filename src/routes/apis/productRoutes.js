import { Router} from "express";
import productControl from "../../controller/productController.js";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
const Control = new productControl
const routes = Router()
routes.get('/gets',[passportCall('jwt'),authentication(["USUARIO","ADMIN"])],Control.gets)
routes.get('/get',Control.get)
routes.delete('/:id',[passportCall('jwt'),authentication(["ADMIN"])],Control.deleteProd)
routes.put('/:id',[passportCall('jwt'),authentication(["ADMIN"])],Control.putProd)
routes.post('/',[passportCall('jwt'),authentication(["ADMIN"])] ,Control.postProd)
routes.get('/:id', Control.getIdProd)


//mocking
// routes.post('/mockingproducts',Control.Post100Prod) para desafio
export default routes