import daoCarts from "../daos/mongoDB/daoCarts.js";
import cartRepo from "../repositories/cartRepo.js";
const servicesC = new cartRepo(new daoCarts)
export default servicesC