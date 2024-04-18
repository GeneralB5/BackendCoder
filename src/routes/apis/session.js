import{ Router } from "express";
import passport from "passport";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
import logsRouters from "../../controller/sessionController.js";
import { upload } from "../../helper/middleMulter.js";

const logsRoutes = Router()
const control = new logsRouters
logsRoutes.post("/register",control.postRegister)
logsRoutes.post("/login", control.postLogin)
logsRoutes.post("/forgotten_password", control.postForgottenPass)
logsRoutes.post("/new_password",control.postNewPassword)
logsRoutes.post("/premiumUser",[passportCall('jwt')],control.PremiumUserPass)
logsRoutes.post("/documents",[upload.fields([
    {name:'identification',maxCount:1},
    {name:'comprobant_domic',maxCount:1},
    {name:'Comprobant_de_estado',maxCount:1}
]),passportCall('jwt')],control.postDocuments)
logsRoutes.post("/picture",[upload.single('profile'),passportCall('jwt')],control.PremiumUserPass)
logsRoutes.get("/user",[passportCall('jwt')] ,control.getUserData)
logsRoutes.get('/current', [passportCall('jwt'),authentication(["PUBLIC","USUARIO","USUARIO_PREMIUN","ADMIN"])],control.getCurrent)
logsRoutes.post('/logout',[passportCall('jwt')],control.postLogout)
 logsRoutes.get('/github', passport.authenticate('github',{failureRedirect:'/api/session/failGithub'}, {scope:['user:email']}),control.getGithub)
 logsRoutes.get('/GitRegister', passport.authenticate('github', {failureRedirect: '/login'}),control.getGitRegister)
 logsRoutes.get('failGithub',control.getFail)
export default logsRoutes