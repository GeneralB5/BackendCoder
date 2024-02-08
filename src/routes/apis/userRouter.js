import{ Router } from "express";
import userRouter from "../../controller/userController.js";
const usersRoutes = Router()
const control = new userRouter
///login
usersRoutes.get('/login',control.getLogin)
///Register
usersRoutes.get('/register',control.getRegister)
export default usersRoutes