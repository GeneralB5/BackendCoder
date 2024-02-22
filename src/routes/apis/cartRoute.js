import{ Router } from "express";
import cartControl from "../../controller/cartController.js";
import passportCall from "../../middleware/passportCall.js";

const control = new cartControl
const Cartroutes = Router()
//primer post manda a crear carrito
Cartroutes.post('/',control.postCreate)
//segundo post manda el producto seleccionado y si se manda mas de una vez se suma el quantity
Cartroutes.post('/:Cid/productos/:Pid',control.postAdd)
// el get te obtiene los productos con el quantity
Cartroutes.get('/:Cid',control.getCart)
//deleted de productos
Cartroutes.delete("/:Cid/products/:Pid",control.deleteProd)
/// vaciar cart completo
Cartroutes.delete("/:Cid",control.deleteCart)
///actualizar cart entero
///se pasa cart por body [{Prod},{Prod}....]
Cartroutes.put("/:Cid",control.putCustomCart)
/// actualizar quantity del determinado producto
//// quantity se pasa por body de tal manera
/// quant: numero
Cartroutes.post('/:Cid/purchase' , passportCall('jwt'), control.postPurchase)
Cartroutes.put('/:Cid/products/:Pid',control.putCustomQuant)

export default Cartroutes