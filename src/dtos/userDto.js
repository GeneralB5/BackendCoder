class  UserConstructor{
    constructor(newUser){
        this.first_name = newUser.first_name
        this.last_name  = newUser.last_name
        this.email= newUser.email
        this.password= newUser.password
        this.fullname= `${newUser.first_name} ${newUser.last_name}`
        this.age= newUser.age
        this.cartId= newUser.cartId
    }

}
export default UserConstructor