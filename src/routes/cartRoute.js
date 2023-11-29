import{ Router } from "express";
import { createCart,addCart,seeCart } from "../cartManager.js";
const Cartroutes = Router()
//primer post manda a crear carrito
Cartroutes.post('/',async (req, res) => {
  
  const usedFunc = await createCart()
  
    res.json(usedFunc);
  
})
//segundo post manda el producto seleccionado y si se manda mas de una vez se suma el quantity
Cartroutes.post('/:Cid/productos/:Pid',async (req, res) => {
  const idCartparams = req.params.Cid;
  const idProdsParams = req.params.Pid;
  const usedFunc = await addCart(idCartparams,idProdsParams)
    res.json(usedFunc);
})
// el get te obtiene los productos con el quantity
Cartroutes.get('/:Cid', async (req, res) => {
    const idParams = req.params.Cid;
    const usedFunc = await seeCart(idParams)
    res.json(usedFunc) ;
})

export default Cartroutes