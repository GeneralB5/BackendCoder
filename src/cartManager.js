import fs from 'fs'
class Cart{
    static count = 0
    //static cart = []
    constructor(){
        this.prodPath='productos.json'
        this.path= 'cart.json'
    }
    async readFiles(){
        try {
            const data = await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }
    async createCart(){
        console.log('hola')
        try {
            const cart = await this.readFiles()
            const id = ++Cart.count     
            const sendCart = {id,Products:[]}  
            cart.push(sendCart)
            await fs.promises.writeFile(this.path,JSON.stringify(cart,null,2))    
        } catch (error) {
            console.log(error)
        }
        
    }
    async addCart(id,Pid){
        try {
        if(
            Pid != undefined &&
            id != undefined){
        const cartReaded = await this.readFiles()
        const index = cartReaded.findIndex(x => x.id == id)
        
        // cartReaded.findIndex((x)=>{x.id == id})
        if(index != -1){
        //   cartReaded[index].Products.findIndex((x)=>{x.id == Pid })
          const validation = cartReaded[index].Products.findIndex(x => x.id == Pid )
            if(validation == -1){
        cartReaded[index].Products.push({id:Pid,quantity:1})
        await fs.promises.writeFile(this.path,JSON.stringify(cartReaded,null,2))
    }else{
        cartReaded[index].Products[validation].quantity ++
        await fs.promises.writeFile(this.path,JSON.stringify(cartReaded,null,2))
    }
    }else{  
            console.log(`No se ha encontrado carrito con el index: ${id}`)
    }
        }else{
            console.log("No has ingresado los datos necesarios")
        }
    } catch (error) {
            
    }
    }
    async readCart(id){
        const Mostrar = []
      const cartReaded =  await this.readFiles()
      const ProdsReaded = JSON.parse(await fs.promises.readFile(this.prodPath,'utf-8'))
      const index = cartReaded.findIndex( x => x.id == id )
      console.log(index)
      if(index != -1){
      cartReaded[index].Products.map( x => {
        const quan = x.quantity;
        const ids = x.id;
        const Prod = ProdsReaded.find( x => x.id == ids)
        if(Prod != undefined || Prod != null){
            Prod.quantity = quan
            Mostrar.push(Prod)
        } 
      })
    
      if(Mostrar.length > 0){
      return Mostrar
    }else{
        return "No has metido nada todavia"
    }}else{ console.log("Has ingresado mal el id, prueba reintentarlo")}
    }
}

const createCart= async()=>{
    const ToDo = new Cart()
    await ToDo.createCart()

}
const addCart= async(Cid,Pid,quantity)=>{
   const ToDo = new Cart()
   return await ToDo.addCart(Cid,Pid,quantity)
    
}
const seeCart= async(id)=>{
    const ToDo = new Cart()
    return await ToDo.readCart(id)

}
export {createCart,addCart,seeCart}