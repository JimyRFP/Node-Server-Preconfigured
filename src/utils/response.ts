export function JSONResponse(data:any,error?:any){
    return JSON.stringify({
        data,
        hasError:Boolean(error),
        error,
    });
};

export function sendIError(req:any,res:any,error?:any){
     console.log(error);
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