import fs from "fs"
class ProductManager {
    static count = 0;///fijarse como hacer por si tiene ya strings
    static productos = []
    constructor() {
        this.path = "productos.json"
    }
    async addProduct(title, description, price, thumbnail, code, stock,category,status) {
        let readedFile = undefined;
        if(ProductManager.productos.length > 0){
        readedFile = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
    }else{
        readedFile = await fs.promises.readFile(this.path, "utf-8")
}
        const sig = ProductManager.productos.find(x => x.code == code)
        if (title != undefined &&
            description != undefined &&
            price != undefined &&
            thumbnail != undefined &&
            code != undefined &&
            stock != undefined &&
            category != undefined &&
            status != undefined &&
            !sig){

            const id = ++ProductManager.count
            const producto={ title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock,category:category,status:status, id: id }
            
            ProductManager.productos.push(producto)
            let mandar = undefined
            if(ProductManager.productos.length > 1){
                readedFile.push(producto)
                mandar = readedFile  
            }else{
                mandar = ProductManager.productos
            }
            const prodString = JSON.stringify(mandar, null, 2)
            await fs.promises.writeFile(this.path, prodString)
            return producto
        } else {
            console.log(" no has ingresado datos suficientes")
        }
    }
    async getAllProducts() {
        let prods = await fs.promises.readFile(this.path, 'utf-8')
        prods = JSON.parse(prods)
        return prods
    }
    async getProductById(id) {
        const prods = await fs.promises.readFile(this.path, "utf-8")
        const prodParse = await JSON.parse(prods)
        const pro = prodParse.find(x => x.id == id)
        const mostrar = pro || "not found"
        return mostrar
    }
    async updateProd(id, title, description, price, thumbnail, code, stock, category, status) {
        if (id != undefined &&
            title != undefined &&
            description != undefined &&
            price != undefined &&
            thumbnail != undefined &&
            code != undefined &&
            stock != undefined&&
            category != undefined &&
            status != undefined ){
            const prods = await fs.promises.readFile(this.path, "utf-8")
            const prodParse = JSON.parse(prods)
            const index = prodParse.findIndex(x => x.id == id)
            if(index != -1){
            const prodsLocal = ProductManager.productos
            const x = prodsLocal[index]
            prodsLocal.splice(index, 1, { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock,category:category,status:status, id: id })
            const proFinal = prodParse.splice(index, 1, { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock,category:category,status:status, id: id })
            const prodString = JSON.stringify(prodParse, null, 2)
            await fs.promises.writeFile(this.path, prodString)
        }else{
            console.log("No se ha encontrado producto")
            return false
        }
        } else {
            console.log(" no has ingresado datos suficientes")
            return false
        }

    }
    async deletedProd(id) {
        if (id != undefined ) {
            const prods = await fs.promises.readFile(this.path, "utf-8")
            const prodParse = JSON.parse(prods)
            const index = prodParse.findIndex(x => x.id == id)
            if(index != -1){
            const prodsLocal = ProductManager.productos
            prodsLocal.splice(index, 1)
            const proFinal = prodParse.splice(index, 1)
            const prodString = JSON.stringify(prodParse, null, 2)
            await fs.promises.writeFile(this.path, prodString)
            return "Se ha borrado el producto correctamente"
        }else{
            console.log("No se ha encontrado producto")
        }
        } else {
            console.log("Datos insuficientes")
        }

    }
}
//creo algunos productoss
async function funcAsyn(){
    const products = new ProductManager()
    await products.addProduct("helado1", "frio", 34, "dada", "JS",23,"Computacion",true)
    await products.addProduct("helado2","frio",34,"dada","papa",13,"Computacion",true)
    await products.addProduct("helado3", "frio", 34, "dada", "afda",13,"Computacion",true) 
    await products.addProduct("helado4", "frio", 34, "d1a", "afassss",23,"Computacion",true) 
}
// hago las funciones para que se manden al router
const  getAllProduct= async ()=>{
    await funcAsyn()
    const products =  new ProductManager()
    const leerTdos = await products.getAllProducts()
    return leerTdos
}
const getProductById= async(id)=>{
    await funcAsyn()
    const products = new ProductManager()
    const leer = await products.getProductById(id)
    return leer
}
const deletedDataById= async(id)=>{
    await funcAsyn()
    const products =  new ProductManager()
    const deleted = await products.deletedProd(id)
    return deleted
}
const uploadProd= async(id,x)=>{
    const products =  new ProductManager()
    const uploadprod = await products.updateProd(id,x.title, x.description, x.price, x.thumbnail, x.code, x.stock,x.category, x.status)
    return uploadprod
}
const createProd = async(x)=>{
    await funcAsyn()
    const products =  new ProductManager()    
    const NewProd = await products.addProduct(x.title, x.description, x.price, x.thumbnail, x.code, x.stock, x.category, x.status)
    return NewProd
}
export {getAllProduct,getProductById,deletedDataById,uploadProd,createProd}