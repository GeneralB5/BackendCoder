import bcrypt from 'bcrypt'
const createPassword = pass=>bcrypt.hashSync(pass,bcrypt.genSaltSync(10))
const validatePassword = (logPass,userPass)=>bcrypt.compareSync(logPass,userPass)
export {createPassword,validatePassword}