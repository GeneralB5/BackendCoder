const socket = io()
const nick = document.querySelector('#nickName')
const msg = document.querySelector('#texto')
let nickTosend = ''

nick.addEventListener('keyup',(e)=>{
    e.preventDefault()
    const name = document.querySelector("#name")
    if(e.key == 'Enter'){
        nickTosend = nick.value.trim()
        name.innerHTML = `Nickname: ${nick.value.trim()}`
    }

})

msg.addEventListener('keyup',(e)=>{
    e.preventDefault()
    nickTosend = document.querySelector('#nickName').value.trim()
    if(e.key == 'Enter'){
        if(msg.value.trim().length > 0   ){
            socket.emit('mensajesEnviados',{nick:nickTosend,message:msg.value})
            msg.value = ''
            }
    }

})


socket.on('chat',(data)=>{
    const p = document.querySelector('#PMessages')
    let mensajesAChat = ''
data.forEach(x => {
    mensajesAChat += `
    ${x.nick} dice:${x.message}</br>
    `
});
p.innerHTML = mensajesAChat
})