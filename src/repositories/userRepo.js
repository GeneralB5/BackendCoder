class userRepo{
    constructor(dao){
        this.userServices = dao
    }getBy
    searchUserby=(filter) => this.userServices.getBy(filter)
    logInUser=(user)=>this.userServices.getBy({email:user.email,password:user.password})
    createUser=(user,role)=>this.userServices.postUser(user.first_name,user.last_name,user.email,user.age,user.password,role,user.cartId,user.fullname)
}
export default userRepo