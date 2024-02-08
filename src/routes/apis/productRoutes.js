import { Router} from "express";
import productControl from "../../controller/productController.js";
const Control = new productControl
const routes = Router()

routes.get('/gets',Control.gets)
routes.delete('/:id', Control.deleteProd)
routes.put('/:id',Control.putProd)
routes.post('/',Control.postProd)
routes.get('/:id', Control.getIdProd)

export default routes