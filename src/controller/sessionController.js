import services from "../services/userServ.js";
import UserConstructor from "../dtos/userDto.js";
import { createToken, decodeToken } from "../utilis/Jwt.js";
import { createPassword, validatePassword } from "../utilis/hashPassword.js";
import servicesC from "../services/cartServices.js";
import customError from "../services/error/customError.js";
import { generateInfoError, generateInfoErrorLogin } from "../services/error/infoError.js";
import ErrorNum from "../services/error/errorNum.js";
import sendEmail from "../utilis/email.js";
class logsRouter{
    constructor(){
        this.userServices = services
        this.cartServices = servicesC
    }
    //revisar el register y login por seguridad
postRegister = async (req, res, next)=>{ 
    try {
                
                const {email,password,first_name, last_name, age } = req.body
                
                let Found = await this.userServices.searchUserby({email})
                if(Found) return res.send({status:"error",data:"Usuario ya existente"})
                const cartId = await this.cartServices.createCart()
                
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
                next(err)
            }
}
postLogin = async (req, res)=>{   
    try {
        
        const  {email,password} = req.body

        if(email.trim() === 'adminCoder@coder.com' && password.trim() === 'adminCod3r123'){
            const {_id} = await this.userServices.searchUserby({email})
            const token = createToken({_id,role:"admin"})
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true})
    
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
                res.cookie('isLogged','isLogged',{
                    maxAge: 60 * 60 * 1000 * 24,
                    secure:false            
                        })
                res.cookie('token', token,{
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true,
                secure:false            
                    })
                
                res.status(200).send({status:"ok"})
                
                res.redirect('/api/productos/gets')
                
            } catch (error) {
                req.logger.error(error)
                throw Error
            }
}
postForgottenPass=async (req,res,next)=>{
    try {
       const {email} = req.body
       if(!email) res.status(401).send({status:"Error"})//errorhandle
       const check = await this.userServices.searchUserby({email:email})
       if(!check) res.status(401).send({status:"Error" ,payload:"Non-existent user"})//errorhandle
       const lifeTime = (new Date().getTime()) + 60*60*1000
       const token =  createToken({email:check.email,lifeTime})
      sendEmail(
        email,
        "New password / Nueva contraseña",
        `
        <p>Si quieres recuperar la contraseña haz click <a href="http://localhost:8080/views/newPassword/?token=${token}" target="_blank" >aqui</a></p>
        `
       )
       
       
       
            
       res.status(200).send({status:"succes", token})

    } catch (error) {
        next(error)
    }
}
postNewPassword = async(req,res,next)=>{
    try {    
        const {password,password2,token} = req.body
        if(password !== password2) throw new Error //hancle err
        if(!token)throw new Error
        const {payload} = decodeToken(token)
        const {email , lifeTime} = payload
        if(lifeTime < new Date().getTime()) return res.status(400).send({status:"Error",payload:'Ya pasaste el tiempo limite'})
        const userPassword = await this.userServices.searchUserby({email})
        if(validatePassword(password,userPassword.password)) throw new Error
        const passwordToSend = createPassword(password)
        await this.userServices.changePassword(email,passwordToSend)
        res.redirect('/login')
    } catch (error) {
        next(error)
    }
}
getCurrent = async (req,res)=>{
    try {
    
    const data = await this.userServices.getBy({_id:req.user._id})
    const user = new UserConstructor(data)
    res.send({status:"succesful",payload:user})    
    } catch (error) {
        
     res.send({status:"error",payload:"error de session"})
    }
 }
getUserData = async(req,res,next)=>{
    try {
        const {email} = req.user
        const data = await this.userServices.searchUserby({email})
        delete data.password
        if(!data) throw new Error
        res.status(200).send({staus:"ok", payload:data})
    } catch (error) {
        next(error)
    }
}
PremiumUserPass = async(req,res,next)=>{
    try {
    const {email,role} = req.user
    if(!email || !role) res.status(401).send({status:"error",payload:"Falta de informacion"})
    let change = role == "usuario" ? "usuario_premium" : "usuario"
    await this.userServices.changePremiumUser(email,change)
    res.status(200).send({status:"success",payload:`Role: ${change}`})
    } catch (error) {
        next(error)
    } 
}
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