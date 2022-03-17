import { getSessionValue } from "../sessions/secureget";
import { SESSION_LOGGED_DATA } from "./config";
export function userIsLogged(req:any):boolean{
    let user=getSessionValue(req,SESSION_LOGGED_DATA);
    if(user)
      return true;
    return false;
}