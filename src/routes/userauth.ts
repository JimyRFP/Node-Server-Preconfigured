import  express  from "express";
import { JSONResponse, sendIError } from "../utils/response";
import { userIsLogged } from "../auth/auth";
import meta_sanitizer from 'meta-sanitizer';
import { checkUserPassword, updateUserLastAction } from "../users/users";
import { createUser } from "../users/users";
import { setUserDataMiddleware } from "../middlewares/auth";
import { setUserLogged } from "../auth/auth";
import { logoutUser } from "../auth/auth";
import { User } from "../server";


const router=express.Router();
router.post('/logout',(req,res)=>{
   let is_ok=false;
   if(userIsLogged(req)){
       logoutUser(req)
       is_ok=true;
   }
   res.send(JSONResponse("OK"));
});
router.post('/login',async (req,res)=>{
    let email="";
    let password="";
    try{
      email=meta_sanitizer.sanitizeEmail(req.body.email);
      password=meta_sanitizer.queryProtector(req.body.password);
    }catch(e){
      return res.status(403).send(JSONResponse({},"Must have 'email' and 'password' params"))
    }
    if(password==""||email=="")
      return res.status(403).send(JSONResponse({},"Must have 'email' and 'password' params"));
    email=email.toLocaleLowerCase();
    try{
      const checkPass=await checkUserPassword(email,password);
      if(checkPass){
         const user:User=await User.findOne({where:{email:email}});
         if(!user)
            throw "Dont find User";
         if(!user.is_active){
             return res.status(403).send(JSONResponse({},"User deleted"));
         }
         setUserLogged(req,email);
         await updateUserLastAction(user)
         return res.status(200).send(JSONResponse("Login Ok"));
      }
      return res.status(403).send(JSONResponse({},"Invalid Password"));
    }catch(e){
      return sendIError(req,res,e);
    }  
    
});

router.post('/getuser',setUserDataMiddleware,async (req:any,res)=>{
    res.send(JSONResponse({email:req.user.email,id:req.user.id}));
});
export default router;
