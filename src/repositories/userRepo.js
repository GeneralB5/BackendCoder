import UsersDB from "../daos/mongoDB/daoUsersdb.js"

class userRepo{
    constructor(dao){
        this.userServices = new UsersDB
    }
    searchUserby=(filter) => this.userServices.getBy(filter)
    logInUser=(user)=>this.userServices.getBy({email:user.email,password:user.password})
    createUser=(user,role)=>this.userServices.postUser(user.first_name,user.last_name,user.email,user.age,user.password,role,user.cartId,user.fullname)
    changePassword=(email,pass)=>this.userServices.putBy(email,{password:pass})
    changePremiumUser=(email,rol)=>this.userServices.putBy(email,{role:rol})
}
export default userRepo