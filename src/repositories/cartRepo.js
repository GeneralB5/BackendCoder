class cartRepo{
    constructor(dao){
        this.Service = dao
    }
    createCart= () => this.Service.postCart()
    getByCa = (filter)=> this.Service.getByCart(filter)
    getByPro = (filter)=> this.Service.getByProds(filter)
    addProduct = (Cid,prod)=>this.Service.postToCart(Cid,prod)
    postIncP = (Cid,idProd)=>this.Service.addCart(Cid,idProd)
    updateP = (Pid,quant)=>this.Service.putProd(Pid,quant)
    updateC = (Cid,Prod)=>this.Service.putCart(Cid,Prod)
    updateQua = (Cid,Pid,quant)=>this.Service.putQuant(Cid,Pid,quant)
    deleteP = (Cid,Pid)=>this.Service.deleteProd(Cid,Pid)
    deleteAll = (Cid)=>this.Service.deleteAll(Cid)
    deleteCart = (Cid)=>this.Service.deletedCart(Cid)
    deletePpull = (Cid,Pid)=>this.Service.pullProd(Cid,Pid)
}
export default cartRepo