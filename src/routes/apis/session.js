import{ Router } from "express";
import UsersDB from "../../daos/mongoDB/daoUsersdb.js";
const userServices = new UsersDB()
const logsRoutes = Router()
///login POST
logsRoutes.post('/login',async (req,res)=>{
    const {email,password } = req.body
    // simulando consulta a la base de datos
    if (email.trim() === '' || password.trim() === '') {
        return res.send('Faltan campos')
    }
    if(email.trim() === 'adminCoder@coder.com' && password.trim() === 'adminCod3r123'){
        req.session.user = {
            email: email,
            rol: "admin"
        }
      return  res.redirect('/api/productos/gets')
    }


    const users = await userServices.searchUser(email)
    
    if (users == null) {
        return res.send('email o contraseña equivocado')
    }

    // validar password
    if (password !== users.password) {
        return res.send('email o contraseña equivocado')
    }

    console.log(email)
    req.session.user = {
        email: email,
        rol: 'usuario'
    }
    res.redirect('/api/productos/gets')///para el login redirect a prod
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
///logout
logsRoutes.post('/logout',async (req,res)=>{
req.session.destroy(err=>{
    if (err) return res.send({status: 'error', error: err})
})
res.send("Se a deslogueado correctamente")
})
export default logsRoutes