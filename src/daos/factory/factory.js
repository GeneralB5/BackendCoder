import { configObject } from "../../config/indexDb.js"
//daos
import UsersDB from "../mongoDB/daoUsersdb";
import daoProducts from "../mongoDB/daoProducts.js";
import daoCarts from "../mongoDB/daoCarts.js";
import cartManager from "../FSmanager/cartManager.js"
import prodManager from "../FSmanager/ProductManager.js"
let userDao
let productDao
let cartDao

switch (configObject.persistence.toUpperCase()) {
    case "MONGO":
            cartDao = daoCarts
            userDao = UsersDB      
            productDao = daoProducts
        break;

    case "SQL":
        
        break;

    case "FS":
            cartDao = cartManager        
            productDao = prodManager
        break;    
    default:
            userDao = UsersDB      
            productDao = daoProducts
        break;
}

export {
    userDao,
    productDao
}