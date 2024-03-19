const form = document.querySelector("#LoginForm")

form.addEventListener("submit",async (e)=>{
    try {
        e.preventDefault()
const data = new FormData(form)
const formJson = Object.fromEntries(data.entries())
const {password, password2} = formJson
if(password != password2) throw new Error("Contraseñas no iguales")
const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get('token')
if(!token) throw new Error("Non valid token")
await fetch('http://localhost:8080/api/session/new_password',{
    method:"POST",
    body:JSON.stringify({
        password,
        password2,
        token
    }),
    headers: {
        'Access-Control-Allow-Origin': '*' ,
        'Content-type': 'application/json'
    }

})
    } catch (error) {
        alert(error)
    }
})