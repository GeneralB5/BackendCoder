import express, {json, urlencoded } from 'express';
import {getAllProduct,uploadProd,deletedDataById,createProd} from "./ProductManager.js"
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
const port = 8080
const getItAll= async () =>{
  const Inv = await getAllProduct()
  return Inv
}
const Send = async ()=>{
 const Gua = await getItAll()
 return Gua
}
app.get('/productos',async (req, res) => {
    const prodsParams = req.query.productos
    const limites = req.query.limit
    console.log(limites)
    const Prods = await Send()
    if(limites > 0 ){
      const recache = Prods.slice(0, limites)
      res.json(recache)
    }else{
      res.json(Prods)
    }
    
})

app.delete('/productos/:id', async (req, res) => {
  const id = req.params.id
  const Prods = await deletedDataById(id)
    res.json(Prods)
})

app.put('/productos/:id',async (req, res) => {
  const Update = req.body;
  const id = req.params.id
  const Prods = await Send()
  const index = Prods.findIndex(x=>x.id  == id)
  if(index == -1){
    res.json({status:"ok", data :  'No hay '})
  }else{
    const upload = await uploadProd(id,Update)
    Prods[index] = { ...Update , id : Prods[index].id}
    res.status(200).json({status:"okey",data:Prods})
  }
    
})

app.post('/productos',async (req, res) => {
  const prodsParams = req.body
  // const Prods = await Send()
  const created = await createProd(prodsParams)
  //  Prods.push(created)
    res.json(created)
  
})

app.get('/productos/:id', async (req, res) => {
    const idParams = req.params.id
    console.log(idParams)
    const cache = await Send()
    console.log(cache)
    const encontrar = cache.find((x)=> x.id == idParams )
    if(encontrar != -1){
      res.json(encontrar)
    }else{
      res.json("no hay id que coincida")
    }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
