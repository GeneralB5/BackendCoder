import winston from "winston";
import { program } from "./commander.js";
const {mode} = program.opts()

const cstmLevelOpt ={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4,
        http:5
    },
    color:{
        fatal:"red",
        error:"yellow",
        warning:"yellow",
        info:"green",
        debug:"white",
        http:"blue"
    }

} 
const logger = winston.createLogger({
    levels:cstmLevelOpt.levels,
    transports:[
new winston.transports.Console({
    level: mode == "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.colorize({colors:cstmLevelOpt.color}) ,
        winston.format.simple()
    )
}),
new winston.transports.File({
    filename: './errors.log',
    level: 'error',
    format: winston.format.simple()
})
    ]
})
const addLogger = (req, res, next) => {
    req.logger = logger
    
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}
export{
    addLogger,
    logger
}