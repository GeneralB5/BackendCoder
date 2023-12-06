import { Router } from "express";
import { getAllProduct } from "../ProductManager.js";
const viewRoutes = Router()

viewRoutes.get('/',(req,res)=>{
    res.render('index',{
      name:"toma",
      title:"arriba"
    })
  })

  viewRoutes.get('/home', async (req,res)=>{
    res.render('home.hbs',{
      name:"toma",
      Title:"E-commerce",
      isAdmin: true,
      products: await getAllProduct()
    })
  })

  viewRoutes.get('/realtimeproducts', async (req,res)=>{
    res.render('realTimeproducts.hbs',{
      name:"toma",
      Title:"E-commerce",
      isAdmin: true,
      products: await getAllProduct()
    })
  })
export default viewRoutes