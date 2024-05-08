import{ Router } from "express";
import cartControl from "../../controller/cartController.js";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
const control = new cartControl
const Cartroutes = Router()
Cartroutes.post('/',[passportCall('jwt'),authentication(["USUARIO"])],control.postCreate)
Cartroutes.post('/userCart/products/:Pid',[passportCall('jwt'),authentication(["USUARIO","USUARIO_PREMIUM"])],control.postAdd)
Cartroutes.get('/userCart',[passportCall('jwt'),authentication(["USUARIO","USUARIO_PREMIUM"])],control.getCart)
Cartroutes.delete("/:Cid/products/:Pid",[passportCall('jwt'),authentication(["USUARIO"])],control.deleteProd)
Cartroutes.delete("/:Cid",[passportCall('jwt'),authentication(["USUARIO"])],control.deleteCart)
Cartroutes.put("/userCart",[passportCall('jwt'),authentication(["USUARIO"])],control.putCustomCart)
Cartroutes.post('/:Cid/purchase' , passportCall('jwt'), control.postPurchase)
Cartroutes.post('/products/:Pid',[passportCall('jwt'),authentication(["USUARIO"])],control.putCustomQuant)
export default Cartroutes