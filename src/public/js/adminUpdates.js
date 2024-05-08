const form = document.querySelector("#LoginForm")

form.addEventListener("submit",async (e)=>{
    try {
        e.preventDefault()
await fetch('http://localhost:8080/api/session/deleteInactives',{
    method:"DELETE",
    headers: {
        'Access-Control-Allow-Origin': '*' ,
        'Content-type': 'application/json'
    }

})
    } catch (error) {
        alert(error)
    }
})