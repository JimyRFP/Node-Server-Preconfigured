import {dataBase} from "./../database/database";
import { User } from "./../database/models/User";
import { createArgon2Hash,checkArgon2Password } from "./password";
import {UserCreateInterface} from "./types";
import {SESSION_LOGGED_DATA} from "../auth/config";
import {getSessionValue} from "../sessions/secureget";
User.init(dataBase);

export function getUserSessionData(req:any):string{
   return getSessionValue(req,SESSION_LOGGED_DATA);
}
export async function getUserById(id:Number):Promise<any>{
     let result=await User.findOne({where:{id:id.toString()}});
     return (result);
}

export async function getUserByEmail(email:string):Promise<any>{
     let result=await User.findOne({where:{email:email}});
     return (result);
}
export async function getUserIdByUserEmail(email:string):Promise<number>{
     try{
        let u=await getUserByEmail(email);
        if(!Boolean(u))
          return NaN;
        return u.dataValues.id;
     }catch(e){
        return NaN;
     }
}

export async function deleteUserById(id:Number):Promise<any>{
     let result=await User.destroy({where:{id:id.toString()}});
     return result;
}
export async function isUserExist(email:string):Promise<boolean>{
     try{
          let user=await getUserByEmail(email);
          return Boolean(user);
     }catch(e){
          throw (e);
     }     
}

export async function createUser(data:UserCreateInterface):Promise<any>{
     let user_exist=false;
     try{
          user_exist=await isUserExist(data.email);
     }catch(e){
          throw(e);
     }
     if(user_exist)
       throw "User exist";
     let hash=await createArgon2Hash(data.password_string);
     if(!hash)
       throw "Create argon2 hash error";
     try{  
          let user_instance=await User.create({email:data.email,
                                        first_name:data.first_name,
                                        password_hash:hash});
          return user_instance;                              
     }catch(e){
        throw e;
     }
}

export async function checkUserPassword(email:string,password_string:string):Promise<boolean>{
    let user;
    try{
         user=await getUserByEmail(email);
    }catch(e){
         throw e;
    }
    if(!user)
      return false;
    let hash=user.dataValues.password_hash;
    if(await checkArgon2Password(hash,password_string)=='Match')
       return true;
    return false;     
}
