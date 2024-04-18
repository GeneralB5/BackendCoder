import UsersDB from "../daos/mongoDB/daoUsersdb.js"
import dateTime from "../utilis/dayTime/dayTime.js"

class userRepo{
    constructor(dao){
        this.userServices = new UsersDB
    }
    searchUserby=(filter) => this.userServices.getBy(filter)
    logInUser=(user)=>this.userServices.getBy({email:user.email,password:user.password})
    createUser=(user,role)=>this.userServices.postUser(user.first_name,user.last_name,user.email,user.age,user.password,role,user.cartId,user.fullname)
    changeProfilePic=(email,picPath)=>this.userServices.putBy(email,{thumbnail:picPath})
    changePassword=(email,pass)=>this.userServices.putBy(email,{password:pass})
    changePremiumUser=(email,rol)=>this.userServices.putBy(email,{role:rol})
    lastConnection=(email)=>this.userServices.putBy(email,{last_connection:dateTime()})
    addNewDocument=(email,dco)=>this.userServices.addNewDoc(email,dco)
    updateDco=(email,dcoPath,dcofieldNa)=>this.userServices.updateDoc(email,dcoPath,dcofieldNa)
}
export default userRepo