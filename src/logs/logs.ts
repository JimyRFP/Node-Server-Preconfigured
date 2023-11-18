import fs from 'fs';
import path from 'path';
import { Request } from 'express';
export const BASE_LOG_PATH='./logs';
export enum LogSeverity{
    danger='danger',
    servere='severe',
    moderate='moderate',
    info='info',
}
export interface SaveLogOptions{
    userId?:number;
    data:string;
    severity:LogSeverity;
    penTestSuspcion?:boolean;
    req?:Request;
    ip?:string;
    url?:string;
}


function stringfyError(err:any):string{
   const type=typeof(err);
   if(type!=='object')
      return err.toString();
   let ret:any={};
   for(let key of Object.keys(err)){
       let value=err[key];
       ret[key]=typeof(value)=='object'?'Is Object':value.toString();
   }
   let retData="";
   try{
      retData=JSON.stringify(ret);
   }catch(e){
      retData="error on stringfy error data";
   }
   return retData;
}
export async function saveInternalErrorLog(req:Request,error:any,options?:{penTestSuspcion?:boolean,severity?:LogSeverity}){
     try{
         const ip=req.ip;
         const url=req.url;
         //@ts-ignore
         const userId=req.user?.id;
         let errorString=stringfyError(error);
         saveLog({
            ip:ip,
            url:url,
            userId:userId,
            data:errorString,
            severity:options?.severity||LogSeverity.info,
            penTestSuspcion:options?.penTestSuspcion,
         });
     }catch(e){
        console.log("Error ON Save Log",e);
     }
}
export function saveLog(options:SaveLogOptions){
    if(!fs.existsSync(BASE_LOG_PATH)){
        fs.mkdirSync(BASE_LOG_PATH);
    }
    let basePath=BASE_LOG_PATH;
    if(options.userId){
         basePath=path.join(basePath,options.userId.toString());
    }else{
        basePath=path.join(basePath,"unlogged");
    } 
    if(!fs.existsSync(basePath)){
        fs.mkdirSync(basePath);
    }
    let fileName=path.join(basePath,`${getDateString(new Date())}.csv`);
    let data="";
    if(fs.existsSync(fileName)){
        data=fs.readFileSync(fileName).toString()+"\n";
    }
    if(!data){
        data='Data;Severidade;Usuário;Dados;IP;URL;Supeita de Ataque\n';
    }
    data+=`${new Date()};${options.severity};${options.userId||"Deslogado"};${options.data};${options.ip||"Não Informado"};${options.url||"Não Informado"};${options.penTestSuspcion?"SIM":"NÃO"}`;
    fs.writeFileSync(fileName,data);
    return {
        fileName,
        basePath,
    };
}
function getDateString(d:Date){
  const year=d.getFullYear();
  const month=zerof(d.getMonth()+1);
  const day=zerof(d.getDate());
  const hour=zerof(d.getHours());
  return `${year}_${month}_${day}_${hour}`;
  function zerof(n:number){
       if(n>9)
         return n.toString();
       return `0${n}`; 
  }
}