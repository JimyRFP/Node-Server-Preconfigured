import { getSessionValue } from "../sessions/secureget";
import { SESSION_LOGGED_DATA } from "./config";
import { setSessionValue } from "../server";
import { deleteSessionValue } from "../server";
export function userIsLogged(req:any):boolean{
    let user=getSessionValue(req,SESSION_LOGGED_DATA);
    if(user)
      return true;
    return false;
}
export function setUserLogged(req:any,email:string){
    setSessionValue(req,SESSION_LOGGED_DATA,email);
}
export function logoutUser(req:any){
  deleteSessionValue(req,SESSION_LOGGED_DATA);
}