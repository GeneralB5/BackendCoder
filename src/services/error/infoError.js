const generateInfoError = (user)=>{
return `One or more properties are incorrect or invalid:
* first_name : need to be a string, we recived ${user.first_name}
* last_name : need to be a string, we recived ${user.last_name}
* email : need to be a string, we recived ${user.email}
`
}
const generateInfoErrorLogin = (user)=>{
    return `One or more properties are incorrect or invalid:
    * email : need to be a string, we recived ${user.email}
    * password : need to be a string, we recived ${user.password}
    `
    }
export {generateInfoError , generateInfoErrorLogin}