class productRepo{
    constructor(dao){
        this.services = dao
    }
    getProducts=()=>this.services.seeAllProducts()
    getBy=(filter)=>this.services.seeAll(filter)
    getLim=(limit,sort,page,query)=>this.services.seeProductsLimit(limit,sort,page,query)
    put=(id,prod)=>this.services.uploadProd(id,prod)
    post=(prod)=>this.services.createProds(prod)
    delete=(id)=>this.services.deletedProd(id)
}
export default productRepo