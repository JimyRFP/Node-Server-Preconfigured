import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import axios from 'axios';
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
    addPath?:string;
    filePrefix?:string;
    penTestSuspcion?:boolean;
    req?:Request;
    ip?:string;
    url?:string;
}


export function stringfyError(err:any):string{
   const type=typeof(err);
   if(type!=='object')
      return err.toString();
   let ret=stringfyObject(err,0);
   return ret||"";
   function stringfyObject(obj:any,level:number=0){
        if(!obj)
           return "";
        if(typeof(obj)!=='object')
          return obj.toString();
        if(level==5)
           return "Is Object level max 8";
        let ret:any={};
        for(let key of Object.keys(obj)){
            let value=obj[key];
            //@ts-ignore
            ret[key]=typeof(value)=='object'?stringfyObject(value,level+1).replaceAll('\\',''):value?.toString();
        }
        return JSON.stringify(ret);
   }

}


export function getIpFromRequest(req:Request){
        //@
        let ips = (
            req.headers['cf-connecting-ip'] ||
            req.headers['x-real-ip'] ||
            req.headers['x-forwarded-for'] ||
            req.ip || ''
        );
        if(typeof(ips)=='string'){
            ips=ips.split(',');
        }
        return ips[0].trim();
}
export async function saveInternalErrorLog(req:Request,error:any,options?:{penTestSuspcion?:boolean,severity?:LogSeverity}){
     try{
         const ip=getIpFromRequest(req);
         const url=req.originalUrl;
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
    if(options.addPath){
        basePath=path.join(basePath,options.addPath);
        if(!fs.existsSync(basePath)){
            fs.mkdirSync(basePath);
        }
    }
    if(options.userId){
         basePath=path.join(basePath,options.userId.toString());
    }else{
        basePath=path.join(basePath,"unlogged");
    } 
    if(!fs.existsSync(basePath)){
        fs.mkdirSync(basePath);
    }
    let fileName=path.join(basePath,`${options.filePrefix?options.filePrefix+'_':""}${getDateString(new Date())}.csv`);
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