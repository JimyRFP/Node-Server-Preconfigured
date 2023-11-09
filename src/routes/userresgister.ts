import { Router } from "express";
import { checkEmail } from "../utils/validators/email";
import { createUser } from "../server";
import { JSONResponse } from "../server";
import { sendIError } from "../utils/response";
import meta_sanitizer from "meta-sanitizer";
const router=Router();
router.post('/register',async (req,res)=>{
    try{
      let email=meta_sanitizer.sanitizeEmail(req.body.email||'');
      let password=meta_sanitizer.queryProtector(req.body.password||'');
      let name=meta_sanitizer.SanitizerEngine(req.body.name||'',true,false,[' ']).sanitizedData;
      if(email=="" || password=="" || name=="")
        return res.send(JSONResponse({},"Invalid params"));
      email=email.toLocaleLowerCase();  
      if(!checkEmail(email)){
        return res.status(403).send(JSONResponse({},"Invalid Email"));
      }
      await createUser({first_name:name,email:email,password_string:password});
      return res.send(JSONResponse("REGISTER OK"));
    }catch(e){
       if(e==="User exist")
         return res.send(JSONResponse({},"User Exist"));
       return sendIError(req,res,e); 
    }
});

export default router;