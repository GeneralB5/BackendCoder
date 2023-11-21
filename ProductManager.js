import fs from "fs"
class ProductManager {
    static count = 0;///fijarse como hacer por si tiene ya strings
    productos = []
    constructor() {
        this.path = "productos.json"
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        const sig = this.productos.find(x => x.code == code)
        if (title != undefined &&
            description != undefined &&
            price != undefined &&
            thumbnail != undefined &&
            code != undefined &&
            stock != undefined &&
            !sig) {
            console.log(typeof stock)
            const id = ++ProductManager.count
            const pro = this.productos.push({ title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: id })
            const prodString = JSON.stringify(this.productos, null, 2)
            await fs.promises.writeFile(this.path, prodString)
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
    async updateProd(id, title, description, price, thumbnail, code, stock) {
        if (id != undefined &&
            title != undefined &&
            description != undefined &&
            price != undefined &&
            thumbnail != undefined &&
            code != undefined &&
            stock != undefined){
            const prods = await fs.promises.readFile(this.path, "utf-8")
            const prodParse = JSON.parse(prods)
            const index = prodParse.findIndex(x => x.id == id)
            if(index != -1){
            const prodsLocal = this.productos
            prodsLocal.splice(index, 1, { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: id })
            const proFinal = prodParse.splice(index, 1, { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: id })
            const prodString = JSON.stringify(prodParse, null, 2)
            await fs.promises.writeFile(this.path, prodString)
        }else{
            console.log("No se ha encontrado producto")
        }
        } else {
            console.log(" no has ingresado datos suficientes")
        }

    }
    async deletedProd(id) {
        if (id != undefined ) {
            const prods = await fs.promises.readFile(this.path, "utf-8")
            const prodParse = JSON.parse(prods)
            const index = prodParse.findIndex(x => x.id == id)
            if(index != -1){
            const prodsLocal = this.productos
            prodsLocal.splice(index, 1)
            const proFinal = prodParse.splice(index, 1)
            const prodString = JSON.stringify(prodParse, null, 2)
            await fs.promises.writeFile(this.path, prodString)
        }else{
            console.log("No se ha encontrado producto")
        }
        } else {
            console.log("Datos insuficientes")
        }

    }
}
async function funcAsyn() {
    const products = new ProductManager()
    const pro1 = await products.addProduct("helado", "frio", 34, "dada", "JS",23)
     const pro2 = await products.addProduct("helado","frio",34,"dada","papa",13)
    //  const leerTdos = await products.getAllProducts()
    //  const leer = await products.getProductById(1)
 
    //  const upload = await products.updateProd(1,"ca","sa",14,"asdc","eq",11)
    //  const leerTdos2 = await products.getAllProducts()
     const pro3 = await products.addProduct("helado", "frio", 34, "dada", "afda",13)
 
    //  const deleted = await products.deletedProd(2)
    //  const leerTdos3 = await products.getAllProducts()
 
}
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
export {getAllProduct,getProductById,deletedDataById}