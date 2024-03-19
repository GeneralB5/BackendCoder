import daoProducts from "../daos/mongoDB/daoProducts.js";
class viewRouter{
    constructor(){
        this.prodServices = new daoProducts()

    }
getView = (req,res)=>{
    res.render('index',{
      name:"toma",
      title:"arriba"
    })
  }

  getAsync = async (req,res)=>{
    res.render('home',{
      name:"toma",
      Title:"E-commerce",
      isAdmin: true,
      products: await this.prodServices.seeAllProducts()
    })
  }

  getRealTime = async (req,res)=>{
    res.render('realTimeproducts',{
      name:"toma",
      Title:"E-commerce",
      isAdmin: true,
      products: await this.prodServices.seeAllProducts()
    })
  }
  getChatRealTime = async(req,res)=>{
    res.render('chat',{
      name:'chat',
      role: req.user.role.toUpperCase() != "ADMIN"
    })
  }
  forgottenPassword = async(req,res)=>{
    res.render('forgotten')
  }
  newpassword = async(req,res)=>{
    res.render('newPassword')
  }
}
export default viewRouter