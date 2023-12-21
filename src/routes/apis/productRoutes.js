import { Router} from "express";
import daoProducts from "../../daos/mongoDB/daoProducts.js";
const prodsServices = new daoProducts()
const routes = Router()
routes.get('/',async (req, res) => {
    // const prodsParams = req.query.productos
    // const limites = req.query.limit
    // console.log(limites)
    // const Prods = await Send()
    // if(limites > 0 ){
    //   const recache = Prods.slice(0, limites)
    //   res.json(recache)
    // }else{
    //   res.json(Prods)
    // }
    const prods = await prodsServices.seeAllProducts()
    res.json({
      status:"success",
      payload:prods
    })
    
})

routes.delete('/:id', async (req, res) => {
  const id = req.params.id
  // const Prods = await deletedDataById(id)
  const Prods = await prodsServices.deletedProd(id)
  res.json({
    status: "success",
    payload: Prods
  })
})

routes.put('/:id',async (req, res) => {
  const Update = req.body;
  const id = req.params.id
//   const Prods = await Send()
//   const index = Prods.findIndex(x=>x.id  == id)
//   if(index == -1){
//     res.json({status:"ok", data :  'No hay '})
//   }else{
//     const SIG = await uploadProd(id,Update)
//   if(SIG != false){
//     Prods[index] = { ...Update , id : Prods[index].id}
//     res.status(200).json({status:"okey",data:Prods})
//   }else{
//     res.status(400).json({status:"Err",err:"No has ingresado correctamente el producto"})
//   }
// }   
const updatedProd = await prodsServices.uploadProd(id,Update)
res.json({
  status: "success",
  payload: updatedProd
})
})

routes.post('/',async (req, res) => {
   const prodsParams = req.body
  // // const Prods = await Send()
  // const created = await createProd(prodsParams)
  // //  Prods.push(created)
  
  //   res.json(created)
  const prods = await prodsServices.createProds(prodsParams)
  res.json({
    status: "success",
    payload: prods
  })
  
})

routes.get('/:id', async (req, res) => {
    const idParams = req.params.id
    // console.log(idParams)
    // const cache = await Send()
    // console.log(cache)
    // const encontrar = cache.find((x)=> x.id == idParams )
    // if(encontrar != -1){
    //   res.json(encontrar)
    // }else{
    //   res.json("no hay id que coincida")
    // }
    const prodId = await prodsServices.seeProductId(idParams)
    res.json({
      status: "success",
      payload: prodId
    })
  
})


export default routes