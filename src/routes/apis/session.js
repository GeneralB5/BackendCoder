import{ Router } from "express";
import UsersDB from "../../daos/mongoDB/daoUsersdb.js";
import passport from "passport";
import { createToken } from "../../utilis/Jwt.js";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
import { createPassword, validatePassword } from "../../utilis/hashPassword.js";
const userServices = new UsersDB()
const logsRoutes = Router()

///passport
///register
logsRoutes.post("/register",async (req, res)=>{ 
    try {
            
                const {email,password,first_name, last_name, age } = req.body

                let Found = await userServices.searchUser(email)
                if(Found) return res.send({status:"error",data:"Usuario ya existente"})
        
                const pass = createPassword(password)
                const role = 'usuario'
                const result = await userServices.createUser(first_name,last_name,email,age,pass,role)
                
                const token =   createToken({_id:result._id})
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true})
                res.json({status: 'success', payload: 'user created',token})
    
            } catch (error) {
                return res.send('Error al crear un usuario: '+error)
            }
})

// ///log-in
logsRoutes.post("/login", async (req, res)=>{   
   const  {email,password} = req.body
    try {
        if(email.trim() === 'adminCoder@coder.com' && password.trim() === 'adminCod3r123'){
            const token = createToken({_id:'1',role:"admin"})
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true})
            req.session.user = {
                email: email,
                rol: "admin"
            }
          return  res.redirect('/api/productos/gets')
            }

                const user = await userServices.searchUser(email)
                if(!user){
                    console.log('Usuario no encontrado')
                    return res.send({
                        status:"error",
                        data:"no existe usuario"
                    })
                }
                const userpass = user.password
                console.log(password, userpass)
                if(!validatePassword(password, userpass)){
                    return res.send({
                        status:"error",
                        data:"no coinciden las contraseñas"
                    })}
                    console.log(user.role)
                const token = createToken({_id:user._id,role:user.role})
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true})
                 req.session.user = {
                     email: email,
                     rol: user.role
                 }
                res.redirect('/api/productos/gets')
            } catch (error) {
                console.log(error)
            }


    
})
//current
logsRoutes.get('/current', [passportCall('jwt'),authentication(["PUBLIC","USUARIO","USUARIO_PREMIUN","ADMIN"])]
, async (req,res)=>{
    res.send("datos")
 })

///logout
logsRoutes.post('/logout',async (req,res)=>{
req.session.destroy(err=>{
    if (err) return res.send({status: 'error', error: err})
})
res.send("Se a deslogueado correctamente")
})
///GitHub
// routes de passport

 logsRoutes.get('/github', passport.authenticate('github',{failureRedirect:'/api/session/failGithub'}, {scope:['user:email']}), async (req,res)=>{})

 logsRoutes.get('/GitRegister', passport.authenticate('github', {failureRedirect: '/login'}),(req, res)=>{
     req.session.user = req.user
     console.log(req.user)
     res.redirect('/api/productos/gets')

 })
 logsRoutes.get('failGithub',(req, res)=>{
     res.json({status: 'error GitHub', payload: 'Failure on getting info'})
 })
export default logsRoutes