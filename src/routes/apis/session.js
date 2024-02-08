import{ Router } from "express";
import passport from "passport";
import passportCall from "../../middleware/passportCall.js";
import authentication from "../../middleware/auth.js";
import logsRouters from "../../controller/sessionController.js";

const logsRoutes = Router()
const control = new logsRouters
///passport
///register
logsRoutes.post("/register",control.postRegister)
// ///log-in
logsRoutes.post("/login", control.postLogin)
//current
logsRoutes.get('/current', [passportCall('jwt'),authentication(["PUBLIC","USUARIO","USUARIO_PREMIUN","ADMIN"])],control.getCurrent)
///logout
logsRoutes.post('/logout',control.postLogout)
///GitHub
// routes de passport
 logsRoutes.get('/github', passport.authenticate('github',{failureRedirect:'/api/session/failGithub'}, {scope:['user:email']}),control.getGithub)
 logsRoutes.get('/GitRegister', passport.authenticate('github', {failureRedirect: '/login'}),control.getGitRegister)
 logsRoutes.get('failGithub',control.getFail)
export default logsRoutes