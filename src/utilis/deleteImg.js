import fs from "fs"
const deleteWPathDocs = (array,identificador)=>{
const object = array.find(x=> x.reference == identificador)
const path = object.reference
fs.unlink(path,(err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('¡La imagen ha sido eliminada correctamente!');
})
}

export {deleteWPathDocs}