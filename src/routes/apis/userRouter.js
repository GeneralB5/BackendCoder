import{ Router } from "express";
const usersRoutes = Router()
///login
usersRoutes.get('/login',async (req,res)=>{
res.render("login")
})

///Register
usersRoutes.get('/register',async (req,res)=>{
    res.render("register")
})

export default usersRoutes