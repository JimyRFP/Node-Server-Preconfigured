import { randomString } from "../utils/string/random";
import { checkConnectionAuth } from "../wsauth/wsauth";
import { WSResponse } from "../utils/response";
import { authenticateWS } from "../server";
import meta_sanitizer from "meta-sanitizer";
const DEBUG=true;
export async function checkWSAuth(ws:any,msg:any):Promise<boolean>{
    try{
        if(ws.userId && ws.connectionToken){
            if((await checkConnectionAuth(ws.userId,ws.connectionToken)))
                return true;
        }
        const message=JSON.parse(msg);
        if(message.action==="Authenticate"){
            const token=meta_sanitizer.justCharsAndNumbers(message.token,false);
            const userId=parseInt(meta_sanitizer.justNumbers(message.userId,false));
            const connectionToken=randomString(35);
            if((await authenticateWS(userId,token,connectionToken))){
               ws.userId=userId;
               ws.connectionToken=connectionToken;
               return true;
            }else{
               return sendError(false,"Invalid Token or UserID");
            }
        }else{
            return sendError(false,"Need auth","'action'='Authenticate' and must have 'token' and 'userId'");
        }   
    }catch(e){
           return sendError(false,"Internal Error","",e);
    }  

    function sendError(isOk:boolean,message:string,errorMessage:string="",data:any={}){
        ws.send(WSResponse(isOk,message,errorMessage,data));
        return false;
    }
}