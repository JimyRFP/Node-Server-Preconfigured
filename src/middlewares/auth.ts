import { User, updateUserLastAction, userIsLogged } from "../server";
import { JSONResponse } from "../server";
import { getUserSessionData } from "../server";
import { sendIError } from "../utils/response";
import { NextFunction, Request, Response } from "express"
export interface RequestAuthenticated extends Request{
    user:User,
}
export async function setUserDataMiddleware(req:any,res:any,next:any){
    if(!userIsLogged(req))
      return res.status(401).send(JSONResponse({},"User Must Be Logged"));
    try{
        const dealerEmail=getUserSessionData(req);
        const user=await User.findOne({where:{email:dealerEmail,is_active:true}});
        if(!user)
          throw "Unknown user";
        req.user=user;
        await updateUserLastAction(user);
        next();
     }catch(e){
       return sendIError(req,res,e);
     }  
}