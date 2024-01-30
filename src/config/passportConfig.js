import passport from "passport";
import local from "passport-local"
import UsersDB from "../daos/mongoDB/daoUsersdb.js";
import { createPassword,validatePassword } from "../utilis/hashPassword.js";
import GithubStrategy from "passport-github2"
import JWT from 'passport-jwt'

const jwtStrategy = JWT.Strategy
const ExtractJWT = JWT.ExtractJwt
const userService   = new UsersDB()

const initializePassport = () => {
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
    
    ///cookie
    const cookieExtractor = req => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['token']
        }
        return token

    }
    // una estrategia es un middleware

    passport.use('jwt', new jwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'CoderSecretoJWT'
    }, async (jwtPayload, done) => {
        try {
            return done(null, jwtPayload)
        } catch (error) {
            return done(error)
        }
    }))
    //// login gitHub

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.66422475381709fe',
        clientSecret: '4c88fbb3d726864dcbaeb92853ed86291941cff6',
        callbackURL: 'http://localhost:8080/api/session/GitRegister'
    }, async (accesToken, refreshToken, profile, done)=> {
        try {
            console.log(profile)
            let user = await userService.searchUserby({email: profile._json.email})
            if (!user) {
                // para registrar en caso de que no exista
                const userCreated = await userService.createUser(
                     profile.username,
                     profile.username,
                     profile.age,
                     profile.email,
                     '123456',
                     "usuario")
                return done(null, userCreated)
            }
            done(null, user)

        } catch (error) {
            return done(error)
        }
    }))
}

export default initializePassport