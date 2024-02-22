import daoProducts from "../daos/mongoDB/daoProducts.js"; //usar factory desp
import productRepo from "../repositories/productRepo.js";
const servicesP = new productRepo(new daoProducts)
export default servicesP