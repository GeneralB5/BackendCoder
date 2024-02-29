import ErrorNum from "../../services/error/errorNum.js";
const handleErrors = (err,req,res,next)=>{
switch(err.code){
    case ErrorNum.InvalidTypes:
        return res.send({status:"Error", error: err.message})
        break;
    case ErrorNum.DBError:
        return res.send({status:"Error", error: err.message})
        break;
    case ErrorNum.RoutingError:
        return res.send({status:"Error", error: err.message})
        break;
    default:
        return res.send({status:"Error", error:"Error server"})
}
}
export default handleErrors