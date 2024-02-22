import { Router} from "express";
import productControl from "../../controller/productController.js";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
const Control = new productControl
const routes = Router()
routes.get('/gets',Control.gets)
routes.delete('/:id',[passportCall('jwt'),authentication(["ADMIN"])],Control.deleteProd)
routes.put('/:id',[passportCall('jwt'),authentication(["ADMIN"])],Control.putProd)
routes.post('/',[passportCall('jwt'),authentication(["ADMIN"])] ,Control.postProd)
routes.get('/:id', Control.getIdProd)

export default routes