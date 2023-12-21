import { Router } from "express";
import daoProducts from "../daos/mongoDB/daoProducts.js";
const prodServices = new daoProducts()
const viewRoutes = Router()

viewRoutes.get('/',(req,res)=>{
    res.render('index',{
      name:"toma",
      title:"arriba"
    })
  })

  viewRoutes.get('/home', async (req,res)=>{
    res.render('home',{
      name:"toma",
      Title:"E-commerce",
      isAdmin: true,
      products: await prodServices.seeAllProducts()
    })
  })

  viewRoutes.get('/realtimeproducts', async (req,res)=>{
    res.render('realTimeproducts',{
      name:"toma",
      Title:"E-commerce",
      isAdmin: true,
      products: await prodServices.seeAllProducts()
    })
  })
  viewRoutes.get('/chatRealTime',async(req,res)=>{
    res.render('chat',{
      name:'chat'
    })
  })
export default viewRoutes