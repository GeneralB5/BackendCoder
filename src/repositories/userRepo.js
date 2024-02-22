class userRepo{
    constructor(dao){
        this.userServices = dao
    }
    getBy=(filter) => this.userServices.searchUserby(filter)
    postLog=(user)=>this.userServices.logUser(user.email,user.password)
    postReg=(user,role)=>this.userServices.createUser(user.first_name,user.last_name,user.email,user.age,user.password,role,user.cartId,user.fullname)
}
export default userRepo