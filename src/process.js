import { logger } from "./utilis/logger"
process.on('exit', exit=>{
    logger.info('Hasta la proxima' + exit)
})
process.on('uncaughtException', code=>{
    logger.info('Oh ho!?' + code)
})
process.on('message', code=>{
    logger.info('Mensaje: ' + code)
})