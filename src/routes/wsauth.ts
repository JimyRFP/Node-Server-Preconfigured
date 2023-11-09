import  express  from "express";
import { JSONResponse, sendIError } from "../utils/response";
import { setWSAuthDataNewToken } from "../wsauth/wsauth";
import { setUserDataMiddleware } from "../middlewares/auth";
export const router=express.Router();

router.post('/gettoken',setUserDataMiddleware,async (req:any,res:any)=>{
   try{
       let userId:number=req.user.id;
       let n=await setWSAuthDataNewToken(userId);
       return res.send(JSONResponse({token:n.dataValues.token,
                                               expiration:n.dataValues.expiration,
                                               userId:userId
                                               }));
   }catch(e){
      return sendIError(req,res,e);
   }
});
