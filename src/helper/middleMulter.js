import multer from "multer";
import{ dirname } from 'node:path';

const Almacenamiento = multer.diskStorage({destination:
    function(req, file, cb){
    cb(null, `${dirname(__dirname)}/public/uploads`)
},
filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
}})
export default Almacenamiento