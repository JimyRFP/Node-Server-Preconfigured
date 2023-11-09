import { User, updateUserLastAction, userIsLogged } from "../server";
import { JSONResponse } from "../server";
import { getUserSessionData } from "../server";

import ENV from "../settings/env";
import { sendIError } from "../utils/response";
const DEBUG=ENV.NODE_ENV==='development'?true:false;
export async function setUserDataMiddleware(req:any,res:any,next:any){
    if(!userIsLogged(req))
      return res.status(401).send(JSONResponse({},"User Must Be Logged"));
    try{
        const dealerEmail=getUserSessionData(req);
        const user=await User.findOne({where:{email:dealerEmail,is_active:true}});
        if(!user)
          throw "Unknown user";
        req.user={email:dealerEmail,id:user.id};
        await updateUserLastAction(user);
        next();
     }catch(e){
       return sendIError(req,res,e);
     }  
}