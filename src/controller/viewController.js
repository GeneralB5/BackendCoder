import servicesP from "../services/prodServ.js";
import services from "../services/userServ.js";
class viewRouter{
    constructor(){
        this.prodServices = servicesP
        this.userServices = services
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
      products: await this.prodServices.getProducts()
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
  document = async(req,res)=>{
    res.render('docs')
  }
  adminUpdates =async(rea,res)=>{
    res.render('adminUpdate',{
      users: await this.userServices.findAllUsers()
    })
  }
}
export default viewRouter