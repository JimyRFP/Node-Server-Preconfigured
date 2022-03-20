import  express  from "express";
import { JSONResponse } from "../utils/response";
import { userIsLogged } from "../auth/auth";
import { setWSAuthDataNewToken } from "../wsauth/wsauth";
import { getUserIdByUserEmail } from "../users/users";
import { getSessionValue } from "../server";
import { SESSION_LOGGED_DATA } from "../auth/config";
export const router=express.Router();
enum GenerateTokenError{
   UserMustBeLogged=1,
   GetUserError,
   InternalError,
};
router.post('/gettoken',async (req,res)=>{
   if(!userIsLogged(req))
       return res.send(JSONResponse(false,GenerateTokenError.UserMustBeLogged,"User Must Be Logged"));
   try{
       let userId=await getUserIdByUserEmail(getSessionValue(req,SESSION_LOGGED_DATA));
       if(userId==NaN)
         return res.send(JSONResponse(false,GenerateTokenError.GetUserError,"Get user error"));
       let n=await setWSAuthDataNewToken(userId);
       return res.send(JSONResponse(true,0,"",{token:n.dataValues.token,
                                               expiration:n.dataValues.expiration,
                                               userId:userId
                                               }));
   }catch(e){

   }
});
