import  argon2  from "argon2";
import {PasswordVerifyResult} from './types';
export async function createArgon2Hash(password_string:string){
   try{
       let hash=await argon2.hash(password_string);
       return hash;
   }catch(e){
       return false;
   }
}

export async function checkArgon2Password(password_hash:string,password_string:string):Promise<PasswordVerifyResult>{
  try{
     if(await argon2.verify(password_hash,password_string))
        return "Match";
     return "Dont Match";   
  }catch(e){
     return "Dont Match";
  }
}