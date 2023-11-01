const productos= []
class ProductManager{ 
    static count = 0;
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail =thumbnail
        this.code = code
        this.stock = stock
    }
    addProduct(){

    const t = this.title
    const d = this.description
     const p = this.price
    const th  = this. thumbnail
      const c = this.code
      const s = this.stock
      const sig = productos.find(x => x.c == c)
    if(!sig && t && d && p && th && s){
        const id = ++ProductManager.count
        productos.push({t,d,p,th,c,s,id})
    }else{
        console.log("hubo un error al ingresar el producto")
    }
    }
    getAllProducts(){
        const ProductosAct = productos
        console.log(ProductosAct)
    }
    getProductById(id){
        const pro = productos.find(x => x.id == id)
      const mostrar =  pro || "not found"
        console.log(mostrar)
    }
}
const pro1 = new ProductManager("helado","frio",34,"dada","JS",13)
pro1.addProduct()
const pro2 = new ProductManager("heo","caliente",24,"dpapa","TS",23)
pro2.addProduct()
const pro3 = new ProductManager("helio","ca",21,"apa","TS",213)
pro3.addProduct()
console.log(pro2.getAllProducts())
console.log(pro2.getProductById(1))
