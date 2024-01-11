import{ Router } from "express";
import UsersDB from "../../daos/mongoDB/daoUsersdb.js";
const userServices = new UsersDB()
const logsRoutes = Router()
///login
logsRoutes.get('/login',async (req,res)=>{
res.render("login")
})
///login POST
logsRoutes.post('/login',async (req,res)=>{
    const {email,password } = req.body
    // simulando consulta a la base de datos
    if (email.trim() === '' || password.trim() === '') {
        return res.send('Faltan campos')
    }
    const users = await userServices.searchUser(email)
    
    if (users == null) {
        return res.send('email o contraseña equivocado')
    }

    // validar password
    if (password !== users.password) {
        return res.send('email o contraseña equivocado')
    }

    let rol = 'usuario'
    
    if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
        rol = "admin"
    }
    req.session.user = {
        email: users.email,
        rol: rol
    }
    res.redirect('/api/productos/gets')///para el login redirect a prod
})
///Register
logsRoutes.get('/register',async (req,res)=>{
    res.render("register")
})
//agregar
logsRoutes.post('/register',async (req,res)=>{

const {first_name,last_name,age,email,password} = req.body

if(first_name.trim()== "" ||  password.trim()== ""||email.trim()== ""){
 return res.status(401).send(`<h1>Faltan datos</h1>`)
}
 const Finded = await userServices.searchUser(email) 
 console.log(Finded)
if(Finded != null){
    console.log('anashe')
   return res.status(401).send(`<h1>Ya existe cuenta con este Email</h1>`)
}
const crearUser = await userServices.createUser(first_name,last_name,email,age,password)
res.status(200).send(`Usuario creado correctamente`)
})

export default logsRoutes