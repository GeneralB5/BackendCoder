import { connect } from "mongoose";
class mongoSingleton{
    static instance
    constructor(url){
        connect(url)
    }
    static getInstance(url){
        if(this.instance){
            console.log("base de datos ya conectada")
            return this.instance
        }
        this.instance = new mongoSingleton(url)
        console.log("base de datos conectada")
        return this.instance
    }
}
export default mongoSingleton