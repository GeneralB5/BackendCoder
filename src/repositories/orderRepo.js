class orderRepo{
constructor(dao){
    this.service = dao
}
post =(prod,purc,code)=> this.service.createOrder(prod,purc,code)
get =(filter)=> this.service.findBy(filter)
}
export default orderRepo