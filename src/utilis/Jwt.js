import jwt  from "jsonwebtoken";
const JwtPrivateKey = "CoderSecretoJWT"

const createToken = user => jwt.sign(user, JwtPrivateKey, {expiresIn: '1d'})

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    if (!authHeader) res.status(401).json({stauts: 'error', error: 'not authenticated'})

    //'Bearer lñasjfdlasjfdlñasjdflñasjdflasjflasdflñhjasldfkjlñsafjlak' -> split -> ['Bearer', 'añlsjfdkalñsjdflñajflajsdf']
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JwtPrivateKey, (err, userDecoded)=>{
        if(err) return res.status(401).json({status: 'error', error: 'not authorized'})
        // console.log(userDecode)
        req.user = userDecoded
        next()
    })
}

export {
    createToken,
    authenticationToken,
    JwtPrivateKey
}