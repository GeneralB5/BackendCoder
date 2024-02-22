import daoProducts from "../daos/mongoDB/daoProducts.js";
import UsersDB from "../daos/mongoDB/daoUsersdb.js";

class productControl{
    constructor(){
        this.prodsServices = new daoProducts()
        this.userServices = new UsersDB()

    }
gets = async (req, res) => {
  const {limit,numPage,sort,query} = req.query
  let fn = undefined
  let ln = undefined
console.log(req.session.user)
  if(req.session.user){
  const email = req.session.user.email
  if(email != "adminCoder@coder.com"){
 const {first_name,last_name} = await this.userServices.searchUserby({email})
 fn = first_name
 ln = last_name
}else{
 fn = email
 ln = 'admin'
 
}
}

let querys 
if(isNaN(query) && query != undefined){
  querys = {title: {$in:query}}
}
if(!isNaN(query)&& query != undefined){
   querys = {price: {$in:query}}
}

  const {
    docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
  } = await this.prodsServices.seeProductsLimit(limit,sort,numPage,querys)
  res.render('getSeeProd',{
    name:"comercio",
    Title:"E-commerce",
    userName:fn,
    userLastname:ln,
    isAdmin: true,
    products:docs,
    hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        limit
  })
}

deleteProd = async (req, res) => {
  try {
    const id = req.params.id
  if(id == undefined){
    res.send({status:"Error" , payload: "Falta id"})
  }
  const Prods = await this.prodsServices.deletedProd(id)
  res.json({
    status: "success",
    payload: Prods
  })
  } catch (error) {
    console.log(error)
    res.send({status:"Error" , payload: "Sistem error"})
  }
}

putProd = async (req, res) => {
try {
  const prodsParams = req.body;
  const id = req.params.id
  if(prodsParams.code == undefined || prodsParams.title == undefined || prodsParams.price == undefined || prodsParams.stock == undefined || id == undefined ){
    return res.send({status:"Error" , payload:"Faltan parametros"})
  }
const updatedProd = await this.prodsServices.uploadProd(id,prodsParams)
res.json({
  status: "success",
  payload: updatedProd
})
} catch (error) {
  console.log(error)
  res.send({status:"Error" , payload: "Sistem error"})
}
  
}

postProd = async (req, res) => {
  try {
    const prodsParams = req.body
    const code = prodsParams.code
    const signal = await this.prodsServices.seeAll({code:code})
    console.log(signal)
  if(signal != null){
    return res.send({status:"error",payload:"Producto ya existente"})
  }
  if(prodsParams.code == undefined || prodsParams.title == undefined || prodsParams.price == undefined || prodsParams.stock == undefined ){
    return res.send({status:"Error" , payload:"Faltan parametros"})
  }
 const prods = await this.prodsServices.createProds(prodsParams)
   return res.json({
     status: "success",
     payload: prods
   })
    
  } catch (error) {
    console.log(error)  
    res.send({ status:"Error" , payload: "Sistem error"})
  }
   
}

getIdProd = async (req, res) => {
    const idParams = req.params.id
    const prodId = await this.prodsServices.seeAll(idParams)
    res.json({
      status: "success",
      payload: prodId
    }) 
}

}
export default productControl