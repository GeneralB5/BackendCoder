import jwt  from "jsonwebtoken";
import { configObject } from "../config/indexDb.js";
const JwtPrivateKey = configObject.jwt_secret_key

const createToken = user => jwt.sign(user, JwtPrivateKey, {expiresIn: '1d'})
const decodeToken = token => jwt.decode(token,{complete:true})
const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    req.logger.info(authHeader)
    if (!authHeader) res.status(401).json({stauts: 'error', error: 'not authenticated'})

    //'Bearer lñasjfdlasjfdlñasjdflñasjdflasjflasdflñhjasldfkjlñsafjlak' -> split -> ['Bearer', 'añlsjfdkalñsjdflñajflajsdf']
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JwtPrivateKey, (err, userDecoded)=>{
        if(err) return res.status(401).json({status: 'error', error: 'not authorized'})
        req.logger.info(userDecoded)
        req.user = userDecoded
        next()
    })
}

export {
    createToken,
    decodeToken,
    authenticationToken,
    JwtPrivateKey
}