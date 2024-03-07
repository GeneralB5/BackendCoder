class orderRepo{
constructor(dao){
    this.service = dao
}
createOrder =(prod,purc,code)=> this.service.postOrder(prod,purc,code)
findBy =(filter)=> this.service.getBy(filter)
}
export default orderRepo