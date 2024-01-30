const authentication = roleArray => {
        return async (req, res, next) => {
             console.log(req.user)
            if(!req.user) return res.status(401).send({error: 'no autorizado'})
            if(!roleArray.includes(req.user.role.toUpperCase())) return res.status(401).send({error: 'sin permisos'})
            next()
        }
    }
export default authentication