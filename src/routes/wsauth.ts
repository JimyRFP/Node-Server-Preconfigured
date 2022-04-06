import  express  from "express";
import { JSONResponse } from "../utils/response";
import { setWSAuthDataNewToken } from "../wsauth/wsauth";
import ENV from "../settings/env";
import { setUserDataMiddleware } from "../middlewares/auth";
export const router=express.Router();
const DEBUG=ENV.NODE_ENV==='development'?true:false;
enum GenerateTokenError{
   UserMustBeLogged=1,
   GetUserError,
   InternalError,
};
router.post('/gettoken',setUserDataMiddleware,async (req:any,res:any)=>{
   try{
       let userId:number=req.user.id;
       let n=await setWSAuthDataNewToken(userId);
       return res.send(JSONResponse(true,0,"",{token:n.dataValues.token,
                                               expiration:n.dataValues.expiration,
                                               userId:userId
                                               }));
   }catch(e){
      let more=null;
      if(DEBUG)
         more=e;
      return res.status(500).send(JSONResponse(false,GenerateTokenError.InternalError,"I-Error",more));
   }
});
