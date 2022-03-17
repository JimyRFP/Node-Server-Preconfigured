export function getSessionValue(req:any,get:string){
    return req.session[get];
}