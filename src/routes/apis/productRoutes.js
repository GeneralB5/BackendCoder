import { Router} from "express";
import daoProducts from "../../daos/mongoDB/daoProducts.js";
const prodsServices = new daoProducts()
const routes = Router()
routes.get('/gets',async (req, res) => {
  const {limit,numPage,sort,query} = req.query
  const {
    docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
  } = await prodsServices.seeProductsLimit(limit,sort,numPage,query)
  res.render('getSeeProd',{
    name:"comercio",
    Title:"E-commerce",
    isAdmin: true,
    products:docs,
    hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        limit

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
const updatedProd = await prodsServices.uploadProd(id,Update)
res.json({
  status: "success",
  payload: updatedProd
})
})

routes.post('/',async (req, res) => {
   const prodsParams = req.body
  const prods = await prodsServices.createProds(prodsParams)
  res.json({
    status: "success",
    payload: prods
  })
  
})

routes.get('/:id', async (req, res) => {
    const idParams = req.params.id
    const prodId = await prodsServices.seeProductId(idParams)
    res.json({
      status: "success",
      payload: prodId
    })
  
})


export default routes