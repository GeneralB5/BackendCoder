import dotenv from "dotenv"
import { program } from "../utilis/commander.js"
import mongoSingleton from "../utilis/mongoSingleton.js"
import { logger } from "../utilis/logger.js"
import customError from "../services/error/customError.js";
import { generateInfoError, generateInfoErrorLogin } from "../services/error/infoError.js";
import ErrorNum from "../services/error/errorNum.js";

const {mode} = program.opts()
dotenv.config({
    path: mode === 'production' ? './src/.env.production' : './src/.env.development' 
})

const configObject = {
    PORT: process.env.PORT || 4000,
     mongo_url: process.env.MONGOURI,
     jwt_secret_key: process.env.JwtPrivateKey,
     gh_client_id:process.env.clientID,
     gh_client_secret:process.env.clientSecret,
     ghSecret:process.env.secretGH,
     persistence:process.env.persistence
}

const connectDb = async () => {
    try {
        if(!configObject.mongo_url){
            customError.createError({
                name:"User creation error",
                cause:"DataBase not found", 
                message:"Error trying to connect to DataBase",
                code:ErrorNum.DBError
                })
        }
        mongoSingleton.getInstance(configObject.mongo_url)

    } catch (error) {
            next(error)
    }
}
export { 
    connectDb,
    configObject
 }