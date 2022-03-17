export function setSessionValue(req:any,to:string,value:any){
   req.session[to]=value;
}

export function deleteSessionValue(req:any,to:string){
   setSessionValue(req,to,undefined);
}