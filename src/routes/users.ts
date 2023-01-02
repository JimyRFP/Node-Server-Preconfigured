import  express  from "express";
import { deleteSessionValue ,setSessionValue} from "../sessions/secureset";
import { SESSION_LOGGED_DATA } from "../auth/config";
import { JSONResponse } from "../utils/response";
import { userIsLogged } from "../auth/auth";
import meta_sanitizer from 'meta-sanitizer';
import { checkUserPassword } from "../users/users";
import { createUser } from "../users/users";
import { setUserDataMiddleware } from "../middlewares/auth";
import ENV from "../settings/env";
import { setUserLogged } from "../auth/auth";
import { logoutUser } from "../auth/auth";

const DEBUG=ENV.NODE_ENV==='development'?true:false;
enum LoginErrorCode{
    NoError=0,
    InvalidParams,
    InvalidPassword,
    InternalError,

}
enum RegisterUserErrorCode{
   NoError=0,
   InvalidParams,
   UserExist,
   InternalError
}
const router=express.Router();
router.post('/logout',(req,res)=>{
   let is_ok=false;
   if(userIsLogged(req)){
       logoutUser(req)
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
    email=email.toLocaleLowerCase();
    try{
      const checkPass=await checkUserPassword(email,password);
      if(checkPass){
         setUserLogged(req,email);
         return res.send(JSONResponse(true,LoginErrorCode.NoError,"Login Ok"));
      }
      return res.send(JSONResponse(false,LoginErrorCode.InvalidPassword,"Invalid Password"));
    }catch(e){
      let more=null;
      if(DEBUG)
        more=e;
      return res.send(JSONResponse(false,LoginErrorCode.InternalError,"I-Error",more));
    }  
    
});
router.post('/register',async (req,res)=>{
    try{
      let email=meta_sanitizer.sanitizeEmail(req.body.email||'');
      let password=meta_sanitizer.queryProtector(req.body.password||'');
      let name=meta_sanitizer.SanitizerEngine(req.body.name||'',true,false,[' ']).sanitizedData;
      if(email=="" || password=="" || name=="")
        return res.send(JSONResponse(false,RegisterUserErrorCode.InvalidParams,"Invalid params"));
      email=email.toLocaleLowerCase();  
      await createUser({first_name:name,email:email,password_string:password});
      return res.send(JSONResponse(true,RegisterUserErrorCode.NoError,"","REGISTER OK"));
    }catch(e){
       if(e==="User exist")
         return res.send(JSONResponse(false,RegisterUserErrorCode.UserExist,"User Exist"));
       return res.send(JSONResponse(false,RegisterUserErrorCode.InternalError,"I-Error"));  
    }
});

router.post('/getuser',setUserDataMiddleware,async (req:any,res)=>{
    res.send(JSONResponse(true,0,"",{email:req.user.email,id:req.user.id}));
});
export default router;