import Orders from "../daos/mongoDB/daoOrders";

class orderController{
    constructor(){
        this.services = new Orders
    }
    post = async(req,res)=>{
        
        this.services.createOrder()
    }
}