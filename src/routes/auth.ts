import  express  from "express";
import { deleteSessionValue ,setSessionValue} from "../sessions/secureset";
import { SESSION_LOGGED_DATA } from "../auth/config";
import { JSONResponse } from "../utils/response";
import { userIsLogged } from "../auth/auth";
import meta_sanitizer from 'meta-sanitizer';
import { checkUserPassword } from "../users/users";
enum LoginErrorCode{
    NoError=0,
    InvalidParams,
    InvalidPassword,

}
const router=express.Router();
router.post('/logout',(req,res)=>{
   let is_ok=false;
   if(userIsLogged(req)){
       deleteSessionValue(req,SESSION_LOGGED_DATA);
       is_ok=true;
   }
   res.send(JSONResponse(is_ok,0,is_ok?"":"User Must be logged",{}));
});
router.post('/login',async (req,res)=>{
    let email="";
    let password="";
    try{
      email=meta_sanitizer.sanitizeEmail(req.body.email);
      password=meta_sanitizer.queryProtector(req.body.password);
    }catch(e){
      return res.send(JSONResponse(false,LoginErrorCode.InvalidParams,"Must have 'email' and 'password' params"))
    }
    if(password==""||email=="")
      return res.send(JSONResponse(false,LoginErrorCode.InvalidParams,"Must have 'email' and 'password' params"));
    const checkPass=await checkUserPassword(email,password);
    if(checkPass){
       setSessionValue(req,SESSION_LOGGED_DATA,email);
       return res.send(JSONResponse(true,LoginErrorCode.NoError,"Login Ok"));
    }
    return res.send(JSONResponse(false,LoginErrorCode.InvalidPassword,"Invalid Password"));
});

export default router;