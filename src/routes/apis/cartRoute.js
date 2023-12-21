import{ Router } from "express";
import daoCarts from "../../daos/mongoDB/daoCarts.js";
const cartServices = new daoCarts()
const Cartroutes = Router()
//primer post manda a crear carrito
Cartroutes.post('/',async (req, res) => {
  
  // const usedFunc = await createCart()
  const usedFunc = await cartServices.createCart()
    res.json(usedFunc);
  
})
//segundo post manda el producto seleccionado y si se manda mas de una vez se suma el quantity
Cartroutes.post('/:Cid/productos/:Pid',async (req, res) => {
  const idCartparams = req.params.Cid;
  const idProdsParams = req.params.Pid;
  // const usedFunc = await addCart(idCartparams,idProdsParams)
  const usedFunc = await cartServices.addCart(idCartparams,idProdsParams)
    res.json(usedFunc);
})
// el get te obtiene los productos con el quantity
Cartroutes.get('/:Cid', async (req, res) => {
    const idParams = req.params.Cid;
    // const usedFunc = await seeCart(idParams)
    const usedFunc = await cartServices.seeCart(idParams)
    res.json(usedFunc) ;
})

export default Cartroutes