import { WebSocketAuth } from "../server";

import {randomString} from "./../utils/string/random";

export async function getWSAuthDataByUserId(userId:number):Promise<any>{
   try{
      let u=await WebSocketAuth.findOne({where:{user_id:userId.toString()}});
      return u;
   }catch(e){
       throw e;
   }
}

export async function setWSAuthDataNewToken(userId:number,expiration_hours:number=72){
   try{
      let ws=await getWSAuthDataByUserId(userId);
      let token=randomString(50);
      let expiration=new Date();
      expiration.setTime(expiration.getTime()+expiration_hours*60*60*1000);
      if(!Boolean(ws)){
          return await WebSocketAuth.create({user_id:userId.toString(),
                                             token:token,
                                             expiration:expiration,
                                             is_active:true,
                                             auth_connection_token:"",
                                             });
      }else{
         ws.token=token;
         ws.expiration=expiration;
         ws.is_active=true;
         ws.auth_connection_token="";
         return await ws.save();
      }
   }catch(e){
       throw e;
   }
}

export async function checkWSAuthToken(userId:number,token:string):Promise<boolean>{
    try{
       let ws=await getWSAuthDataByUserId(userId);
       if(!Boolean(ws))
         return false;
       if(!ws.dataValues.is_active)
         return false;  
       if(ws.dataValues.token!=token)  
          return false;
       if(Date.now()>ws.dataValues.expiration.getTime())   
          return false;
       return true;   
    }catch(e){
       throw e;
    }
}

export async function authenticateWS(userId:number,token:string,connection_token:string):Promise<boolean>{
    try{
      if(!(await checkWSAuthToken(userId,token)))
         return false; 
      let ws=await getWSAuthDataByUserId(userId);  
      ws.auth_connection_token=connection_token;
      await ws.save();
      return true;
    }catch(e){
       throw e;
    } 
}

export async function checkConnectionAuth(userId:number,connection_token:string):Promise<boolean>{
   try{
     let ws=await getWSAuthDataByUserId(userId);
     if(!Boolean(ws))
        return false;
     if(!ws.dataValues.is_active)
        return false;
     if(Date.now()>ws.dataValues.expiration.getTime())   
        return false;   
     if(ws.dataValues.auth_connection_token!==connection_token)
        return false;   
     return true;
   }catch(e){
      throw e;
   }
}