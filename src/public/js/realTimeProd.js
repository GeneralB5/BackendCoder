const socket = io()
const div = document.querySelector('#DivContainer')
const deleteButtom = document.querySelector('#deleteProd')
const form = document.querySelector('#formDeAgregarProds')

//agrego los productos
form.addEventListener('submit',(e)=>{
    e.preventDefault()
   const title = document.querySelector('#title').value
   const price = parseInt(document.querySelector('#price').value)
   const description = document.querySelector('#description').value
   const stock = parseInt(document.querySelector('#stock').value)
   const code = document.querySelector('#code').value
   let status = document.querySelector('#status').value
   const category = document.querySelector('#category').value
   const thumbnail = document.querySelector('#thumbnail').value
    status =  status.toLowerCase() 
     const data= {title, description, price, thumbnail, code, stock,category,status}
    
    console.log(JSON.stringify(status))
    if(title != '' && 
    price != null&&
    description !=''&&
    stock != null&&
    code !=''&&
    status == 'true'||
    status == 'false'&&
    category != ""&&
    thumbnail !=""){
     socket.emit('agregar',data)  
    }else{
        console.log("Falta informacion")
    }
    form.reset()
})

//deleteo los productos con su nombre
deleteButtom.addEventListener('keyup',(e)=>{
    e.preventDefault()
    if(e.key == 'Enter'){
        const value = `${deleteButtom.value}`
        if(value.trim().length > 0 ){
        socket.emit('delete',value.trim())
        deleteButtom.value = " "
    }
    }
})

//recibo los productos y los itero para formar divs con su informacion
socket.on("products",data=>{
    div.innerHTML = " "
    if(true){
        data.forEach(element => {

        const divsInsider = document.createElement('div')
        divsInsider.setAttribute('id',element.id)
        const price = document.createElement('p')
        price.textContent = "price : "  +element.price
        const name = document.createElement('p')
        name.textContent = "Name : "+element.title
        const stock = document.createElement('p')
        stock.textContent = "Stock : "+element.stock
        const description = document.createElement('p')
        description.textContent = "Description : " + element.description
        const id = document.createElement('p')
        id.textContent = "id : " + element.id
        const hr = document.createElement('hr')
        divsInsider.appendChild(price)
        divsInsider.appendChild(name)
        divsInsider.appendChild(stock)
        divsInsider.appendChild(description)
        divsInsider.appendChild(id)
        divsInsider.appendChild(hr)
        div.appendChild(divsInsider)
        

    });}
    
})

