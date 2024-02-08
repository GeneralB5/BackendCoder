import UsersDB from "../daos/mongoDB/daoUsersdb.js";
import { createToken } from "../utilis/Jwt.js";
import { createPassword, validatePassword } from "../utilis/hashPassword.js";
class logsRouter{
    constructor(){
        this.userServices = new UsersDB()
    }
///passport
///register
postRegister = async (req, res)=>{ 
    try {
            
                const {email,password,first_name, last_name, age } = req.body

                let Found = await this.userServices.searchUserby({email})
                if(Found) return res.send({status:"error",data:"Usuario ya existente"})
                let randomnumber 
                let findedNumber 

                do {
                    randomnumber = parseInt(Math.floor(Math.random()*65536),16)
                    findedNumber = await this.userServices.searchUserby({cartId:randomnumber})
                    console.log(findedNumber)
                } while (findedNumber != null);
                
                if(first_name.trim() !='' || email.trim() !=''||password.trim() !='',findedNumber != null) return res.send({status:"error",data:"Faltan datos"})
                const pass = createPassword(password)           
                const role = 'usuario'
                const result = await this.userServices.createUser(first_name,last_name,email,age,pass,role,randomnumber)
                
                const token =   createToken({_id:result._id})
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true})
                res.json({status: 'success', payload: 'user created',token})
    
            } catch (error) {
                return res.send('Error al crear un usuario: '+error)
            }
}

// ///log-in
postLogin = async (req, res)=>{   
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

                const user = await this.userServices.searchUserby({email})
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


    
}
//current
getCurrent = async (req,res)=>{
    res.send("datos")
 }

///logout
postLogout =async (req,res)=>{
    req.session.destroy(err=>{
        if (err) return res.send({status: 'error', error: err})
    })
    res.send("Se a deslogueado correctamente")
    }

 getGithub = async (req,res)=>{}

 getGitRegister = async (req, res)=>{
     req.session.user = req.user
     console.log(req.user)
     res.redirect('/api/productos/gets')

 }

 getFail = async (req, res)=>{
     res.json({status: 'error GitHub', payload: 'Failure on getting info'})
 }

}

export default logsRouter