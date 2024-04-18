import multer from "multer";
import __dirname from "../utils.js";

const filedDestination =(fieldName)=>{
    const docmt = ['identification','comprobant_domic','Comprobant_de_estado']
    let name = 'profile'

    if(fieldName == "product")name = 'product'
    if(docmt.includes(fieldName))name = 'documents'

    return name
}
const Almacenamiento = multer.diskStorage({
destination: function(req, file, cb){
    const FDestination = filedDestination(file.fieldname)
    cb(null, `${__dirname}/public/${FDestination}`)
},

filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
}})

const uploaderFilter = (req, file, cb) => {
    if ( file.mimetype == "image/png" 
    || file.mimetype == "image/jpeg" 
    || file.mimetype == "image/jpg") {
    cb(null, true) }else{ cb(null, false)}
    }

const incld =(documents,na)=>{ 
        const ref = []
        documents.map( obj =>{ref.push(obj.name)})
        return ref.includes(na)
}
const upload = multer({storage:Almacenamiento , fileFilter:uploaderFilter})

export {
    upload,
    incld
}