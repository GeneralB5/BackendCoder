import{ Router } from "express";
import { createCart,addCart,seeCart } from "../../cartManager.js";
const Cartroutes = Router()

Cartroutes.post('/',async (req, res) => {
  
  const usedFunc = await createCart()
  
    res.json(usedFunc);
  
})

Cartroutes.post('/:Cid/productos/:Pid',async (req, res) => {
  const idCartparams = req.params.Cid;
  const idProdsParams = req.params.Pid;
  const usedFunc = await addCart(idCartparams,idProdsParams)
    res.json(usedFunc);
})

Cartroutes.get('/:Cid', async (req, res) => {
    const idParams = req.params.Cid;
    const usedFunc = await seeCart(idParams)
    res.json(usedFunc) ;
})

export default Cartroutes