function authentication(req, res, next) {
    // // pedir el user a la base de datos 
    // if(req.session.email === 'adminCoder@coder.com' || !req.session.password === 'adminCod3r123') {
    //     //return res.session.rol = "admin" 
    //     //rol admin
    // } 
    // // return res.session.rol = "usuario" 
    // //rol usuario
    next()

}
export default authentication