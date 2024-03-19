import cluster from "cluster"
import { cpus } from "os";
import httpsServer from "./src/app.js";
import { logger } from "./src/utilis/logger.js";


if(cluster.isPrimary){
    for (let x = 0; x < cpus().length; x++) {
        cluster.fork()
    }
    
    cluster.on('message', worker => {
        logger.info(`Mensaje recibido de el worker ${worker.process.pid}`)
    })
}else{
    logger.info("Soy un worker")
    
    httpsServer()
}