import services from "../services/userServ.js";
import UserConstructor from "../dtos/userDto.js";
import { createToken } from "../utilis/Jwt.js";
import { createPassword, validatePassword } from "../utilis/hashPassword.js";
import servicesC from "../services/cartServices.js";
import customError from "../services/error/customError.js";
import { generateInfoError, generateInfoErrorLogin } from "../services/error/infoError.js";
import ErrorNum from "../services/error/errorNum.js";
class logsRouter{
    constructor(){
        this.userServices = services
        this.cartServices = servicesC
    }
///passport
///register
postRegister = async (req, res, next)=>{ 
    try {
            
                const {email,password,first_name, last_name, age } = req.body

                let Found = await this.userServices.searchUserby({email})
                if(Found) return res.send({status:"error",data:"Usuario ya existente"})

                const cartId = await this.cartServices.post()
                
                if(!first_name||!email ||!password||!cartId){
                  customError.createError({
                    name:"User creation error",
                    cause:generateInfoError({first_name , last_name, email}), 
                    message:"Error trying to create user",
                    code:ErrorNum.InvalidTypes
                    })
                }
                
                const pass = createPassword(password)           
                const role = 'usuario'
                const result = await this.userServices.createUser(new UserConstructor({first_name,last_name,email,age,password:pass,cartId:cartId._id}),role)
                
                const token =   createToken({_id:result._id})
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true})
                res.json({status: 'success', payload: 'user created',token})
    
            } catch (err) {
                // return res.send('Error al crear un usuario: '+error)
                next(err)
            }
}

// ///log-in
postLogin = async (req, res)=>{   
    try {
        const  {email,password} = req.body
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
            if(!email ||!password){
                customError.createError({
                    name:"User creation error",
                    cause:generateInfoErrorLogin({email,password}), 
                    message:"Error trying to create user",
                    code:ErrorNum.InvalidTypes
                    })
            }
                const user = await this.userServices.searchUserby({email})
                if(!user){
                    req.logger.warning('Usuario no encontrado')
                    return res.send({
                        status:"error",
                        data:"no existe usuario"
                    })
                }
                const userpass = user.password
               
                if(!validatePassword(password, userpass)){
                    return res.send({
                        status:"error",
                        data:"no coinciden las contraseñas"
                    })}
                    
                const token = createToken({_id:user._id,role:user.role})
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true})
                 req.user = {
                     email: email,
                     rol: user.role
                 }
                res.redirect('/api/productos/gets')
            } catch (error) {
                req.logger.error(error)
                throw Error
            }
}
//current
getCurrent = async (req,res)=>{
    try {
    
    const data = await this.userServices.getBy({_id:req.user._id})
    const user = new UserConstructor(data)
    res.send({status:"succesful",payload:user})    
    } catch (error) {
        
     res.send({status:"error",payload:"error de session"})
    }
 }

///logout
postLogout =async (req,res)=>{
    res.clearCookie('token')
    res.send("Se a deslogueado correctamente")
    }

getGithub = async (req,res)=>{}

getGitRegister = async (req, res)=>{
    req.logger.debug(req.user)

     
     res.redirect('/api/productos/gets')

 }

 getFail = async (req, res)=>{
    
     res.json({status: 'error GitHub', payload: 'Failure on getting info'})
 }

}

export default logsRouter