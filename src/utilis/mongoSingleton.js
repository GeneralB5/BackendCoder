import {logger} from "./logger.js"
import { connect } from "mongoose";
class mongoSingleton{
    static instance
    constructor(url){
        connect(url)
    }
    static getInstance(url){
        if(this.instance){
            logger.info("base de datos ya conectada")
            return this.instance
        }
        this.instance = new mongoSingleton(url)
        logger.info("base de datos conectada")
        return this.instance
    }
}
export default mongoSingleton