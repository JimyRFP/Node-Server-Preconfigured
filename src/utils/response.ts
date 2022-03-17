export function JSONResponse(is_ok:boolean,error_code:number=0,error_message:string='',data:any={}){
    const ret_data={
        is_ok:is_ok,
        error_code:error_code,
        error_message:error_message,
        data:data,
    };
    return JSON.stringify(ret_data);
}