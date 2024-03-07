import services from "../services/userServ.js";
import generateProd from "../mocking/prodMock.js";
import servicesP from "../services/prodServ.js";
class productControl{
    constructor(){
        this.prodsServices = servicesP
        this.userServices = services
           
    }
GET = async(req,res)=>{
  try {
    const prod = await this.prodsServices.getProducts()
    res.send({status:"succes", payload:prod})
  } catch (error) {
    res.send({status:"Error", payload:"Request error"})
  }
}
GETQUERY = async (req, res) => {
  try {
    const {limit,numPage,sort,query} = req.query
  let fn = undefined
  let ln = undefined
  
  
  if(req.user){
  const role = req.user.role
  if(role != "admin"){
 const {first_name,last_name} = await this.userServices.searchUserby({_id:req.user._id})
 fn = first_name
 ln = last_name
}else{
  const {first_name} = await this.userServices.searchUserby({_id:_id})
 fn = first_name
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
  } = await this.prodsServices.getLim(limit,sort,numPage,querys)
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
  } catch (error) {
    req.logger.error(error)
  }
  
}

DELETEDPROD = async (req, res) => {
  try {
    const id = req.params.id
  if(id == undefined){
    res.send({status:"Error" , payload: "Falta id"})
  }
  const Prods = await this.prodsServices.delete(id)
  res.json({
    status: "success",
    payload: Prods
  })
  } catch (error) {
    res.send({status:"Error" , payload: "Sistem error"})
  }
}

PUTPROD = async (req, res) => {
try {
  const prodsParams = req.body;
  const id = req.params.id
  if(prodsParams.code == undefined || prodsParams.title == undefined || prodsParams.price == undefined || prodsParams.stock == undefined || id == undefined ){
    return res.send({status:"Error" , payload:"Faltan parametros"})
  }
const updatedProd = await this.prodsServices.put(id,prodsParams)
res.json({
  status: "success",
  payload: updatedProd
})
} catch (error) {
  res.send({status:"Error" , payload: "Sistem error"})
}
  
}

POSTPROD = async (req, res) => {
  try {
    const prodsParams = req.body
    const code = prodsParams.code
    const signal = await this.prodsServices.getBy({code:code})
    
  if(signal != null){
    return res.send({status:"error",payload:"Producto ya existente"})
  }
  if(prodsParams.code == undefined || prodsParams.title == undefined || prodsParams.price == undefined || prodsParams.stock == undefined ){
    return res.send({status:"Error" , payload:"Faltan parametros"})
  }
 const prods = await this.prodsServices.post(prodsParams)
   return res.json({
     status: "success",
     payload: prods
   })
    
  } catch (error) {
    
    res.send({ status:"Error" , payload: "Sistem error"})
  }
   
}

GETIDPROD = async (req, res) => {
    const idParams = req.params.id
    const prodId = await this.prodsServices.getBy({_id:idParams})
    res.json({
      status: "success",
      payload: prodId
    }) 
}
POST100PROD = async (req,res)=>{
  const prodArray = []
  for( let i = 0 ; i < 100 ; i++ ){
    prodArray.push(generateProd())
  }
}
}
export default productControl