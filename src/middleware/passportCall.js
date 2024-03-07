import passport from "passport"
import services from "../services/userServ.js"

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy,async function(err, user, info){
            if (err) return next(err)          
            if(!user) return res.status(401).send({status: 'error', error: info.message ? info.message : info.toString()})
            const users = await services.searchUserby({_id:user._id})            
            req.user = users
            next()
        })(req, res, next)
    }
}

export default passportCall