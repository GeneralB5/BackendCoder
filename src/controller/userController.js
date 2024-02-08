class userRouter{
    constructor(){}
    ///login
getLogin = async (req,res)=>{
    res.render("login")
    }    
    ///Register
getRegister = async (req,res)=>{
        res.render("register")
    }
}


export default userRouter