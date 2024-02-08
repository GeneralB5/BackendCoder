import { connect } from "mongoose"
import dotenv from "dotenv"
import { program } from "../utilis/commander.js"
import mongoSingleton from "../utilis/mongoSingleton.js"


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
     ghSecret:process.env.secretGH
}
//'mongodb+srv://ianmarco:ian240904@cluster0.tfejsks.mongodb.net/ecommerce?retryWrites=true&w=majority'
const connectDb = async () => {
    try {
        mongoSingleton.getInstance(configObject.mongo_url)
    } catch (error) {
        console.log(error)
    }
}
export { 
    connectDb,
    configObject
 }