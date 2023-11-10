const moment = require("moment/moment");
const BrD = moment('2004-09-24', 'YYYY-MM-DD')
if(BrD.isValid()){
    console.log(BrD.diff())
}else{
    console.log("pene")
}
