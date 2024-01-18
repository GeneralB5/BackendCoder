import{ Router } from "express";
import UsersDB from "../../daos/mongoDB/daoUsersdb.js";
import passport from "passport";
import { createToken } from "../../utilis/Jwt.js";
const userServices = new UsersDB()
const logsRoutes = Router()
// ///login POST
// logsRoutes.post('/login',async (req,res)=>{
//     const {email,password } = req.body
//     // simulando consulta a la base de datos
//     if (email.trim() === '' || password.trim() === '') {
//         return res.send('Faltan campos')
//     }
//     if(email.trim() === 'adminCoder@coder.com' && password.trim() === 'adminCod3r123'){
//         req.session.user = {
//             email: email,
//             rol: "admin"
//         }
//       return  res.redirect('/api/productos/gets')
//     }


//     const users = await userServices.searchUser(email)
    
//     if (users == null) {
//         return res.send('email o contraseña equivocado')
//     }

//     // validar password
//     if (password !== users.password) {
//         return res.send('email o contraseña equivocado')
//     }

//     console.log(email)
//     req.session.user = {
//         email: email,
//         rol: 'usuario'
//     }
//     res.redirect('/api/productos/gets')///para el login redirect a prod
// })
// //agregar
// logsRoutes.post('/register',async (req,res)=>{

// const {first_name,last_name,age,email,password} = req.body

// if(first_name.trim()== "" ||  password.trim()== ""||email.trim()== ""){
//  return res.status(401).send(`<h1>Faltan datos</h1>`)
// }
//  const Finded = await userServices.searchUser(email) 
//  console.log(Finded)
// if(Finded != null){
//     console.log('anashe')
//    return res.status(401).send(`<h1>Ya existe cuenta con este Email</h1>`)
// }
// const crearUser = await userServices.createUser(first_name,last_name,email,age,password)
// res.status(200).send(`Usuario creado correctamente`)
// })

///passport
///register
logsRoutes.post("/register",passport.authenticate('register',{failureRedirect:'/api/session/failureRegister'}), (req, res)=>{ 
    console.log(req.user)
    const token =   createToken({_id:req.user._id})
    res.json({status: 'success', payload: 'user created',token})

})
logsRoutes.get('/failureRegister',(req, res)=>{
    res.json({status: 'error', payload: 'Failure'})
})

///log-in
logsRoutes.post("/login",passport.authenticate('login',{failureRedirect:'/api/session/failLogin'}), (req, res)=>{   
    if(!req.user) return res.status(400).send({status: 'error', error: 'invalid credential'})


    if(req.user.email.trim() === 'adminCoder@coder.com' && req.user.password.trim() === 'adminCod3r123'){
            req.session.user = {
                email: req.user.email,
                rol: "admin"
            }
          return  res.redirect('/api/productos/gets')
     }
    const token =  createToken({_id:req.user._id,role:req.user._role})
    req.session.user = {
        email: req.user.email,
        rol: 'usuario'
    }
    res.json({
        token
    })
    res.redirect('/api/productos/gets')

})
logsRoutes.get('/failLogin',(req, res)=>{
    res.json({status: 'error', payload: 'Failure'})
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

//  logsRoutes.get('/github', passport.authenticate('github',{failureRedirect:'/api/session/failGithub'}, {scope:['user:email']}), async (req,res)=>{})

//  logsRoutes.get('/GitRegister', passport.authenticate('github', {failureRedirect: '/login'}),(req, res)=>{
//      req.session.user = req.user
//      res.redirect('/api/productos/gets')

//  })
//  logsRoutes.get('failGithub',(req, res)=>{
//      res.json({status: 'error GitHub', payload: 'Failure on getting info'})
//  })
export default logsRoutes