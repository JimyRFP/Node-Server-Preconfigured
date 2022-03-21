import { AuthenticateWSResult } from "./types";
export declare function getWSAuthDataByUserId(userId: number): Promise<any>;
export declare function setWSAuthDataNewToken(userId: number, expiration_hours?: number): Promise<any>;
export declare function checkWSAuthToken(userId: number, token: string): Promise<boolean>;
export declare function authenticateWS(userId: number, token: string, connection_token: string): Promise<AuthenticateWSResult>;
export declare function checkConnectionAuth(userId: number, connection_token: string): Promise<boolean>;
