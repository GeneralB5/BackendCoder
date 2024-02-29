import{ Router } from "express";
import cartControl from "../../controller/cartController.js";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
const control = new cartControl
const Cartroutes = Router()
Cartroutes.post('/',[passportCall('jwt'),authentication(["USUARIO"])],control.postCreate)
Cartroutes.post('/:Cid/productos/:Pid',[passportCall('jwt'),authentication(["USUARIO"])],control.postAdd)
Cartroutes.get('/:Cid',[passportCall('jwt'),authentication(["USUARIO"])],control.getCart)
Cartroutes.delete("/:Cid/products/:Pid",[passportCall('jwt'),authentication(["USUARIO"])],control.deleteProd)
Cartroutes.delete("/:Cid",[passportCall('jwt'),authentication(["USUARIO"])],control.deleteCart)
Cartroutes.put("/:Cid",[passportCall('jwt'),authentication(["USUARIO"])],control.putCustomCart)
Cartroutes.post('/:Cid/purchase' , passportCall('jwt'), control.postPurchase)
Cartroutes.put('/:Cid/products/:Pid',[passportCall('jwt'),authentication(["USUARIO"])],control.putCustomQuant)

export default Cartroutes