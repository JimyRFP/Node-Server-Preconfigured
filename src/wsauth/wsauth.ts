import { WebSocketAuth } from "../server";
import { dataBase } from "../server";
import {randomString} from "./../utils/string/random";
WebSocketAuth.init(dataBase);
export async function getWSAuthDataByUserId(userId:number){
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
      if(ws==null || ws==undefined){
          return await WebSocketAuth.create({user_id:userId.toString(),
                                             token:token,
                                             expiration:expiration,
                                             });
      }else{
         ws.token=token;
         ws.expiration=expiration;
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
       if(ws.dataValues.token!=token)  
          return false;
       if(Date.now()>ws.dataValues.expiration.getTime())   
          return false;
       return true;   
    }catch(e){
       return false;
    }
}