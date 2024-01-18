import passport from "passport";
import local from "passport-local"
import UsersDB from "../daos/mongoDB/daoUsersdb.js";
import { createPassword,validatePassword } from "../utilis/hashPassword.js";
import GithubStrategy from "passport-github2"
const LocalStrategy = local.Strategy
const userService   = new UsersDB()
///////////////////////////////re ver copiado de git completo
const initializePassport = () => {
    // una estrategia es un middleware
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            
            const {first_name, last_name, age } = req.body
            let Found = await userService.searchUser(username)
            if(Found) return done(null, false)
            const email = username
            const pass = createPassword(password)
            const role = 'usuario'
            const result = await userService.createUser(first_name,last_name,email,age,pass,role)
            
            return done(null, result)

        } catch (error) {
            return done('Error al crear un usuario: '+error)
        }
    })) 

    // credenciales
    //GUARDAR
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    //RECUPERAR
    passport.deserializeUser(async (id, done)=>{
        let user = await userService.searchUserby({_id:id})
        done(null, user)
    })
    ////armar funcion de deserializeUser
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done)=>{
        try {
            console.log(username,password)
            if(username.trim() === 'adminCoder@coder.com' && password.trim() === 'adminCod3r123'){
                const user = await userService.searchUser(username)    
              return  done(null,user)
              
            }

            const user = await userService.searchUser(username)
            if(!user) {
                console.log('Usuario no encontrado')
                return done(null, false)
            }
            const userpass = user.password
            console.log(password, userpass)
            if(!validatePassword(password, userpass)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
    //// login gitHub

    // passport.use('github', new GithubStrategy({
    //     clientID: 'Iv1.66422475381709fe',
    //     clientSecret: '4c88fbb3d726864dcbaeb92853ed86291941cff6',
    //     callbackURL: 'http://localhost:8080/api/session/GitRegister'
    // }, async (accesToken, refreshToken, profile, done)=> {
    //     try {
    //         console.log(profile)
    //         let user = await userService.geUsertBy({email: profile._json.email})
    //         if (!user) {
    //             // para registrar en caso de que no exista
    //             let newUser = {
    //                 first_name: profile.username,
    //                 last_name: profile.username,
    //                 email: profile.email,
    //                 password: '123456'
    //             }
    //             const userCreated = await userService.createUser(newUser)
    //             return done(null, userCreated)
    //         }
    //         done(null, user)

    //     } catch (error) {
    //         return done(error)
    //     }
    // }))
}

export default initializePassport