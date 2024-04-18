function dateTime(){
    const date = new Date()
    const dias = ["Lun","Mar","Mie","Jue","Vier","Sab","Dom"]

    const diaActual = dias[date.getDay()-1]
    const numDia = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    let PmOAm = "AM"
    if(hours > 12) PmOAm = "PM"

    return `${diaActual} ${numDia} ${hours % 12}:${minutes} ${PmOAm} `
}
export default dateTime