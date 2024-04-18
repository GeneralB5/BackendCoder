import ErrorNum from "../../services/error/errorNum.js";
const handleErrors = (err,req,res,next)=>{
    console.log(err)
switch(err.code){
    case ErrorNum.InvalidTypes:
        return res.send({status:"Invalid types Error", error: err.message})
        break;
    case ErrorNum.DBError:
        return res.send({status:"DataBase Error Error", error: err.message})
        break;
    case ErrorNum.RoutingError:
        return res.send({status:"Routing Error", error: err.message})
        break;
    case ErrorNum.InsufficientDT:
        return res.send({status:"Insufficient data Error", error: err.message})
        break;
    default:
        return res.send({status:"Error", error:"Error server"})
}
}
export default handleErrors