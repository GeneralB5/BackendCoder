import{ Router } from "express";
import passport from "passport";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
import logsRouters from "../../controller/sessionController.js";

const logsRoutes = Router()
const control = new logsRouters
logsRoutes.post("/register",control.postRegister)
logsRoutes.post("/login", control.postLogin)
logsRoutes.post("/forgotten_password", control.postForgottenPass)
logsRoutes.post("/new_password",control.postNewPassword)
logsRoutes.post("/premiumUser",[passportCall('jwt')],control.PremiumUserPass)
logsRoutes.get("/user", control.getUserData)
logsRoutes.get('/current', [passportCall('jwt'),authentication(["PUBLIC","USUARIO","USUARIO_PREMIUN","ADMIN"])],control.getCurrent)
logsRoutes.post('/logout',control.postLogout)
 logsRoutes.get('/github', passport.authenticate('github',{failureRedirect:'/api/session/failGithub'}, {scope:['user:email']}),control.getGithub)
 logsRoutes.get('/GitRegister', passport.authenticate('github', {failureRedirect: '/login'}),control.getGitRegister)
 logsRoutes.get('failGithub',control.getFail)
export default logsRoutes