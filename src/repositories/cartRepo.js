class cartRepo{
    constructor(dao){
        this.Service = dao
    }
    post= () => this.Service.createCart()
    getBy = (filter)=> this.Service.getByCart(filter)
    getByPro = (filter)=> this.Service.getByProds(filter)
    postAdd = (Cid,prod)=>this.Service.addToCart(Cid,prod)
    postIncP = (Cid,idProd)=>this.Service.addCart(Cid,idProd)
    putP = (Pid,quant)=>this.Service.updateProd(Pid,quant)
    putC = (Cid,Prod)=>this.Service.updateCart(Cid,prod)
    putQua = (Cid,Pid,quant)=>this.Service.updateQuant(Cid,Pid,quant)
    deleteP = (Cid,Pid)=>this.Service.deleteProd(Cid,Pid)
    deleteALl = (Cid)=>this.Service.deleteAll(Cid)
    deleteCart = (Cid)=>this.Service.deletedCart(Cid)
    deletePpull = (Cid,Pid)=>this.Service.pullProd(Cid,Pid)
}
export default cartRepo