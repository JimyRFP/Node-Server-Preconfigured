import { LogSeverity, saveInternalErrorLog } from "../logs/logs";
export function JSONResponse(data:any,error?:any){
    return JSON.stringify({
        data,
        hasError:Boolean(error),
        error,
    });
};
export interface SendIErrorOptions{
   severity?:LogSeverity,
   penTestSuspcion?:boolean;
}

export function sendIError(req:any,res:any,error?:any,options?:SendIErrorOptions){
     saveInternalErrorLog(req,error,options);
     return res.status(500).send(JSONResponse("","I-E"));
}
export function WSResponse(isOK:boolean,message:string='',errorMessage:string="",data:any={}):string{
    return JSON.stringify({
      is_ok:isOK,
      message:message,
      error_message:errorMessage,     
      data:data
    });
 }