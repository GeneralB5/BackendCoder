import userRepo from "../repositories/userRepo.js";
import UsersDB from "../daos/mongoDB/daoUsersdb.js";
const services = new userRepo(new UsersDB)
export default services