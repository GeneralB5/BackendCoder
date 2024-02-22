import Orders from "../daos/mongoDB/daoOrders.js";
import orderRepo from "../repositories/orderRepo.js"; 
const servicesO = new orderRepo(new Orders)
export default servicesO