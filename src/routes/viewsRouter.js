import { Router } from "express";
import viewRouter from "../controller/viewController.js";
import passportCall from "../middleware/passportCall.js";
import authentication from "../middleware/auth.js";
const control = new viewRouter
const viewRoutes = Router()
  viewRoutes.get('/',control.getView)
  viewRoutes.get('/home',control.getAsync)
  viewRoutes.get('/realtimeproducts',control.getRealTime)
  viewRoutes.get('/chatRealTime',[passportCall('jwt')],control.getChatRealTime)
  viewRoutes.get('/forgottenPass',control.forgottenPassword)
  viewRoutes.get('/newPassword',control.newpassword)
  viewRoutes.get('/documents',control.document)
  viewRoutes.get("/adminUpdates",[passportCall('jwt'),authentication(["ADMIN"])],control.adminUpdates)
export default viewRoutes