import { User } from "../server";
import { Request } from "express";
export interface RequestAuthenticated extends Request {
    user: User;
}
export declare function setUserDataMiddleware(req: any, res: any, next: any): Promise<any>;
