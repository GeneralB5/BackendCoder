process.on('exit', exit=>{
    console.log('Hasta la proxima' + exit)
})
process.on('uncaughtException', code=>{
    console.log('Oh ho!?' + code)
})
process.on('message', code=>{
    console.log('Mensaje: ' + code)
})