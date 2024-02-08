import { Router } from "express";
import viewRouter from "../controller/viewController.js";
const control = new viewRouter
const viewRoutes = Router()
  viewRoutes.get('/',control.getView)
  viewRoutes.get('/home',control.getAsync)
  viewRoutes.get('/realtimeproducts',control.getRealTime)
  viewRoutes.get('/chatRealTime',control.getChatRealTime)
export default viewRoutes